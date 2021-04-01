import { Component, Injectable, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { PageEnvService } from '../../services/page-env.service';
import {distinctUntilChanged, debounceTime, switchMap, map} from 'rxjs/operators';
import { APIForumTheme, APIForumTopic, ForumsService } from '../forums.service';
import {ToastsService} from '../../toasts/toasts.service';
import { APIService } from '../../services/api.service';
import { getForumsThemeTranslation } from '../../utils/translations';

@Component({
  selector: 'app-forums-move-topic',
  templateUrl: './move-topic.component.html'
})
@Injectable()
export class ForumsMoveTopicComponent implements OnInit, OnDestroy {
  private querySub: Subscription;
  public themes: APIForumTheme[] = [];
  public topic: APIForumTopic = null;

  constructor(
    private api: APIService,
    private router: Router,
    private route: ActivatedRoute,
    private forumService: ForumsService,
    private pageEnv: PageEnvService,
    private toastService: ToastsService
  ) {}

  ngOnInit(): void {
    this.pageEnv.set({
      layout: {
        needRight: false
      },
      nameTranslated: $localize `Move`,
      pageId: 83
    });

    this.forumService.getThemes({}).subscribe(
      response => {
        this.themes = response.items;
      },
      response => this.toastService.response(response)
    );

    this.querySub = this.route.queryParamMap
      .pipe(
        map(params => parseInt(params.get('topic_id'), 10)),
        distinctUntilChanged(),
        debounceTime(30),
        switchMap(topicID => this.forumService.getTopic(topicID, {}))
      )
      .subscribe(
        response => {
          this.topic = response;
        },
        () => {
          this.router.navigate(['/error-404'], {
            skipLocationChange: true
          });
        }
      );
  }

  ngOnDestroy(): void {
    this.querySub.unsubscribe();
  }

  public selectTheme(theme: APIForumTheme) {
    this.api
      .request<void>('PUT', 'forum/topic/' + this.topic.id, {body: {
        theme_id: theme.id
      }})
      .subscribe(
        () => {
          this.router.navigate(['/forums/topic', this.topic.id]);
        },
        response => this.toastService.response(response)
      );
  }

  public getForumsThemeTranslation(id: string): string {
    return getForumsThemeTranslation(id);
  }
}
