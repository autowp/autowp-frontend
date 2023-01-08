import {Component} from '@angular/core';
import {combineLatest, Observable} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {PageEnvService} from '../../services/page-env.service';
import {AuthService} from '../../services/auth.service';
import {debounceTime, distinctUntilChanged, map, shareReplay, switchMap, tap} from 'rxjs/operators';
import {APIForumTopic, ForumsService} from '../forums.service';
import {ToastsService} from '../../toasts/toasts.service';
import {getForumsThemeTranslation} from '../../utils/translations';
import {CommentsClient} from '@grpc/spec.pbsc';
import {CommentsSubscribeRequest, CommentsType, CommentsUnSubscribeRequest} from '@grpc/spec.pb';

@Component({
  selector: 'app-forums-topic',
  templateUrl: './topic.component.html',
})
export class ForumsTopicComponent {
  public limit = this.forumService.getLimit();
  public user$ = this.auth.getUser();
  public page$ = this.route.queryParamMap.pipe(
    map((params) => parseInt(params.get('page'), 10)),
    distinctUntilChanged(),
    debounceTime(10)
  );

  public topic$: Observable<APIForumTopic> = combineLatest([
    this.route.paramMap.pipe(
      map((params) => parseInt(params.get('topic_id'), 10)),
      distinctUntilChanged(),
      debounceTime(10)
    ),
    this.page$,
  ]).pipe(
    switchMap(([topicID, page]) =>
      this.forumService.getTopic(topicID, {
        fields: 'author,theme,subscription',
        page: page,
      })
    ),
    tap((topic) => {
      this.pageEnv.set({
        title: topic.name,
        pageId: 44,
      });
    }),
    shareReplay(1)
  );

  constructor(
    private forumService: ForumsService,
    private route: ActivatedRoute,
    private pageEnv: PageEnvService,
    public auth: AuthService,
    private toastService: ToastsService,
    private comments: CommentsClient
  ) {}

  public subscribe(topic: APIForumTopic) {
    this.comments
      .subscribe(
        new CommentsSubscribeRequest({
          itemId: '' + topic.id,
          typeId: CommentsType.FORUMS_TYPE_ID,
        })
      )
      .subscribe({
        next: () => {
          topic.subscription = true;
        },
        error: (response) => this.toastService.grpcErrorResponse(response),
      });
  }

  public unsubscribe(topic: APIForumTopic) {
    this.comments
      .unSubscribe(
        new CommentsUnSubscribeRequest({
          itemId: '' + topic.id,
          typeId: CommentsType.FORUMS_TYPE_ID,
        })
      )
      .subscribe({
        next: () => {
          topic.subscription = false;
        },
        error: (response) => this.toastService.grpcErrorResponse(response),
      });
  }

  public getForumsThemeTranslation(id: string): string {
    return getForumsThemeTranslation(id);
  }
}
