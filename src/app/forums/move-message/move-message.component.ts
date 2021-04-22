import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {Subscription, of, combineLatest, EMPTY} from 'rxjs';
import { PageEnvService } from '../../services/page-env.service';
import {
  distinctUntilChanged,
  debounceTime,
  switchMap,
  catchError,
  map,
  switchMapTo
} from 'rxjs/operators';
import { APIForumTheme, APIForumTopic, ForumsService } from '../forums.service';
import {ToastsService} from '../../toasts/toasts.service';
import { APIService } from '../../services/api.service';
import { getForumsThemeTranslation } from '../../utils/translations';

@Component({
  selector: 'app-forums-move-message',
  templateUrl: './move-message.component.html'
})
export class ForumsMoveMessageComponent implements OnInit, OnDestroy {
  private querySub: Subscription;
  public messageID: number;
  public themeID: number;
  public themes: APIForumTheme[] = [];
  public topics: APIForumTopic[] = [];

  constructor(
    private api: APIService,
    private forumService: ForumsService,
    private router: Router,
    private route: ActivatedRoute,
    private pageEnv: PageEnvService,
    private toastService: ToastsService
  ) {
    setTimeout(
      () =>
        this.pageEnv.set({
          layout: {
            needRight: false
          },
          nameTranslated: $localize `Move`,
          pageId: 83
        }),
      0
    );
  }

  ngOnInit(): void {
    this.querySub = this.route.queryParamMap
      .pipe(
        map(params => ({
          message_id: parseInt(params.get('message_id'), 10),
          theme_id: parseInt(params.get('theme_id'), 10)
        })),
        distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
        debounceTime(30),
        switchMap(params => {
          this.messageID = params.message_id;
          this.themeID = params.theme_id;

          let topics = of(null as APIForumTopic[]);
          let themes = of(null as APIForumTheme[]);
          if (this.themeID) {
            topics = this.forumService
              .getTopics({ theme_id: this.themeID })
              .pipe(
                catchError(response => {
                  this.toastService.response(response);
                  return EMPTY;
                }),
                map(response => response.items)
              );
          } else {
            themes = this.forumService.getThemes({}).pipe(
              catchError(response => {
                this.toastService.response(response);
                return EMPTY;
              }),
              map(response => response.items)
            );
          }

          return combineLatest([topics, themes]);
        })
      )
      .subscribe(([topics, themes]) => {
        this.topics = topics;
        this.themes = themes;
      });
  }

  ngOnDestroy(): void {
    this.querySub.unsubscribe();
  }

  public selectTopic(topic: APIForumTopic) {
    this.api
      .request<void>('PUT', 'comment/' + this.messageID, {body: {
        item_id: topic.id
      }})
      .pipe(
        switchMapTo(this.forumService.getMessageStateParams(this.messageID))
      )
      .subscribe(
        params =>
          this.router.navigate(['/forums/topic', params.topic_id], {
            queryParams: {
              page: params.page
            }
          }),
        subresponse => this.toastService.response(subresponse)
      );
  }

  public getForumsThemeTranslation(id: string): string {
    return getForumsThemeTranslation(id);
  }
}
