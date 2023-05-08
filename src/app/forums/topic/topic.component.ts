import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {PageEnvService} from '@services/page-env.service';
import {AuthService} from '@services/auth.service';
import {distinctUntilChanged, map, shareReplay, switchMap, tap} from 'rxjs/operators';
import {ForumsService} from '../forums.service';
import {ToastsService} from '../../toasts/toasts.service';
import {getForumsThemeTranslation} from '@utils/translations';
import {CommentsClient, ForumsClient} from '@grpc/spec.pbsc';
import {
  APIForumsTopic,
  APIGetForumsThemeRequest,
  APIGetForumsTopicRequest,
  CommentsSubscribeRequest,
  CommentsType,
  CommentsUnSubscribeRequest,
} from '@grpc/spec.pb';

@Component({
  selector: 'app-forums-topic',
  templateUrl: './topic.component.html',
})
export class ForumsTopicComponent {
  protected readonly limit = this.forumService.getLimit();
  protected readonly user$ = this.auth.getUser$();
  protected readonly page$ = this.route.queryParamMap.pipe(
    map((params) => parseInt(params.get('page'), 10)),
    distinctUntilChanged()
  );

  protected readonly CommentsType = CommentsType;

  protected readonly topic$: Observable<APIForumsTopic> = this.route.paramMap.pipe(
    map((params) => params.get('topic_id')),
    distinctUntilChanged(),
    switchMap((topicID) => this.grpc.getTopic(new APIGetForumsTopicRequest({id: topicID}))),
    tap((topic) => {
      this.pageEnv.set({
        title: topic.name,
        pageId: 44,
      });
    }),
    shareReplay(1)
  );

  protected readonly theme$ = this.topic$.pipe(
    switchMap((topic) => this.grpc.getTheme(new APIGetForumsThemeRequest({id: topic.themeId})))
  );

  constructor(
    private readonly forumService: ForumsService,
    private readonly route: ActivatedRoute,
    private readonly pageEnv: PageEnvService,
    protected readonly auth: AuthService,
    private readonly toastService: ToastsService,
    private readonly comments: CommentsClient,
    private readonly grpc: ForumsClient
  ) {}

  protected subscribe(topic: APIForumsTopic) {
    this.comments
      .subscribe(
        new CommentsSubscribeRequest({
          itemId: topic.id,
          typeId: CommentsType.FORUMS_TYPE_ID,
        })
      )
      .subscribe({
        next: () => {
          topic.subscription = true;
        },
        error: (response: unknown) => this.toastService.handleError(response),
      });
  }

  protected unsubscribe(topic: APIForumsTopic) {
    this.comments
      .unSubscribe(
        new CommentsUnSubscribeRequest({
          itemId: topic.id,
          typeId: CommentsType.FORUMS_TYPE_ID,
        })
      )
      .subscribe({
        next: () => {
          topic.subscription = false;
        },
        error: (response: unknown) => this.toastService.handleError(response),
      });
  }

  protected getForumsThemeTranslation(id: string): string {
    return getForumsThemeTranslation(id);
  }
}
