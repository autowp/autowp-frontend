import {Component} from '@angular/core';
import {APIService} from '../services/api.service';
import {ACLService, Privilege, Resource} from '../services/acl.service';
import {combineLatest, Observable} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {PageEnvService} from '../services/page-env.service';
import {debounceTime, distinctUntilChanged, map, shareReplay, switchMap, tap} from 'rxjs/operators';
import {APIForumTheme, APIForumTopic, ForumsService} from './forums.service';
import {ToastsService} from '../toasts/toasts.service';
import {getForumsThemeDescriptionTranslation, getForumsThemeTranslation} from '../utils/translations';

@Component({
  selector: 'app-forums',
  templateUrl: './forums.component.html',
  styles: ['app-forums {display:block}']
})
export class ForumsComponent {
  public forumAdmin$ = this.acl.isAllowed(Resource.FORUMS, Privilege.MODERATE);

  private page$ = this.route.queryParamMap.pipe(
    map(params => parseInt(params.get('page'), 10)),
    distinctUntilChanged(),
    debounceTime(10)
  );

  private themeID$ = this.route.paramMap.pipe(
    map(params => parseInt(params.get('theme_id'), 10)),
    distinctUntilChanged(),
    debounceTime(10)
  );

  public data$ = combineLatest([this.page$, this.themeID$]).pipe(
    switchMap(([page, themeID]) => {
      if (!themeID) {
        return this.forumService.getThemes({
          fields: 'last_message.user,last_topic,description,themes',
          topics: { page }
        }).pipe(
          map(response => ({
            theme: null as APIForumTheme,
            themes: response.items
          }))
        );
      } else {
        return this.forumService.getTheme(themeID, {
          fields:
            'themes.last_message.user,themes.last_topic,' +
            'themes.description,topics.author,topics.messages,topics.last_message.user',
          topics: { page }
        }).pipe(
          map(response => ({
            theme: response,
            themes: response.themes
          }))
        );
      }
    }),
    tap(data => {
      if (data.theme) {
        this.pageEnv.set({
          nameTranslated: getForumsThemeTranslation(data.theme.name),
          pageId: 43
        });
      } else {
        this.pageEnv.set({pageId: 42});
      }
    }),
    shareReplay(1)
  );

  constructor(
    private api: APIService,
    private acl: ACLService,
    private route: ActivatedRoute,
    private forumService: ForumsService,
    private pageEnv: PageEnvService,
    private toastService: ToastsService,
  ) {}

  private setTopicStatus(topic: APIForumTopic, status: string): Observable<void> {
    const o = this.api.request<void>('PUT', 'forum/topic/' + topic.id, {body: {
      status
    }});
    o.subscribe({
      next: () => {
        topic.status = status;
      },
      error: response => this.toastService.response(response)
    });

    return o;
  }

  public openTopic(topic: APIForumTopic) {
    this.setTopicStatus(topic, 'normal');
  }

  public closeTopic(topic: APIForumTopic) {
    this.setTopicStatus(topic, 'closed');
  }

  public deleteTopic(theme: APIForumTheme, topic: APIForumTopic) {
    this.setTopicStatus(topic, 'deleted').subscribe(
      () => {
        for (let i = theme.topics.items.length - 1; i >= 0; i--) {
          if (theme.topics.items[i].id === topic.id) {
            theme.topics.items.splice(i, 1);
            break;
          }
        }
      }
    );
  }

  public getForumsThemeTranslation(id: string): string {
    return getForumsThemeTranslation(id);
  }

  public getForumsThemeDescriptionTranslation(id: string): string {
    return getForumsThemeDescriptionTranslation(id);
  }
}
