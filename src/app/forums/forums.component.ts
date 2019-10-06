import { Component, Injectable, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APIPaginator } from '../services/api.service';
import { ACLService } from '../services/acl.service';
import {Subscription, combineLatest, Observable} from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { PageEnvService } from '../services/page-env.service';
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  map
} from 'rxjs/operators';
import { APIForumTheme, ForumsService, APIForumTopic } from './forums.service';
import {ToastsService} from '../toasts/toasts.service';

@Component({
  selector: 'app-forums',
  templateUrl: './forums.component.html',
  styles: ['app-forums {display:block}']
})
@Injectable()
export class ForumsComponent implements OnInit, OnDestroy {
  private paramsSub: Subscription;
  public paginator: APIPaginator;
  public forumAdmin = false;
  public theme: APIForumTheme;
  public themes: APIForumTheme[];

  constructor(
    private http: HttpClient,
    private acl: ACLService,
    private route: ActivatedRoute,
    private forumService: ForumsService,
    private pageEnv: PageEnvService,
    private toastService: ToastsService
  ) {}

  ngOnInit(): void {
    this.paramsSub = combineLatest([
      this.route.params,
      this.route.queryParams,
      this.acl.isAllowed('forums', 'moderate')
    ])
      .pipe(
        map(data => ({
          route: data[0],
          query: data[1],
          forumAdmin: data[2]
        })),
        distinctUntilChanged(),
        debounceTime(50),
        switchMap(data => {
          if (!data.route.theme_id) {
            return this.forumService
              .getThemes({
                fields:
                  'last_message.datetime,last_message.user,last_topic,description',
                topics: { page: data.query.page }
              })
              .pipe(
                map(response => ({
                  forumAdmin: data.forumAdmin,
                  theme: null as APIForumTheme,
                  themes: response.items
                }))
              );
          } else {
            return this.forumService
              .getTheme(data.route.theme_id, {
                fields:
                  'themes.last_message.user,themes.last_message.datetime,themes.last_topic,' +
                  'themes.description,topics.author,topics.messages,topics.last_message.datetime,topics.last_message.user',
                topics: { page: data.query.page }
              })
              .pipe(
                map(response => ({
                  forumAdmin: data.forumAdmin,
                  theme: response,
                  themes: response.themes
                }))
              );
          }
        })
      )
      .subscribe(data => {
        this.forumAdmin = data.forumAdmin;
        this.theme = data.theme;
        this.themes = data.themes;

        setTimeout(() => {
          if (this.theme) {
            this.pageEnv.set({
              layout: {
                needRight: false
              },
              name: this.theme.name,
              pageId: 43
            });
          } else {
            this.pageEnv.set({
              layout: {
                needRight: false
              },
              name: 'page/42/name',
              pageId: 42
            });
          }
        }, 0);
      });
  }

  ngOnDestroy(): void {
    this.paramsSub.unsubscribe();
  }

  private setTopicStatus(topic: APIForumTopic, status: string): Observable<void> {
    const o = this.http.put<void>('/api/forum/topic/' + topic.id, {
      status: status
    });
    o.subscribe(
      () => {
        topic.status = status;
      },
      response => this.toastService.response(response)
    );

    return o;
  }

  public openTopic(topic: APIForumTopic) {
    this.setTopicStatus(topic, 'normal');
  }

  public closeTopic(topic: APIForumTopic) {
    this.setTopicStatus(topic, 'closed');
  }

  public deleteTopic(topic: APIForumTopic) {
    this.setTopicStatus(topic, 'deleted').subscribe(
      () => {
        for (let i = this.theme.topics.items.length - 1; i >= 0; i--) {
          if (this.theme.topics.items[i].id === topic.id) {
            this.theme.topics.items.splice(i, 1);
            break;
          }
        }
      }
    );
  }
}
