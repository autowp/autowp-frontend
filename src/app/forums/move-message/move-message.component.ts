import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {EMPTY, Observable, of} from 'rxjs';
import {PageEnvService} from '@services/page-env.service';
import {catchError, distinctUntilChanged, map, switchMap} from 'rxjs/operators';
import {ToastsService} from '../../toasts/toasts.service';
import {getForumsThemeTranslation} from '@utils/translations';
import {CommentsClient, ForumsClient} from '@grpc/spec.pbsc';
import {
  APIForumsTheme,
  APIForumsTopic,
  APIGetForumsThemesRequest,
  APIGetForumsTopicsRequest,
  CommentsMoveCommentRequest,
  CommentsType,
  GetMessagePageRequest,
} from '@grpc/spec.pb';
import {MESSAGES_PER_PAGE} from '../forums.module';

@Component({
  selector: 'app-forums-move-message',
  templateUrl: './move-message.component.html',
})
export class ForumsMoveMessageComponent implements OnInit {
  protected readonly messageID$ = this.route.queryParamMap.pipe(
    map((params) => parseInt(params.get('message_id'), 10)),
    distinctUntilChanged()
  );

  protected readonly themeID$ = this.route.queryParamMap.pipe(
    map((params) => params.get('theme_id')),
    distinctUntilChanged()
  );

  protected readonly topics$: Observable<APIForumsTopic[]> = this.themeID$.pipe(
    switchMap((themeID) => {
      if (!themeID) {
        return of([] as APIForumsTopic[]);
      }
      return this.grpc.getTopics(new APIGetForumsTopicsRequest({themeId: themeID})).pipe(
        catchError((response: unknown) => {
          this.toastService.handleError(response);
          return EMPTY;
        }),
        map((response) => response.items)
      );
    })
  );

  protected readonly themes$: Observable<APIForumsTheme[]> = this.grpc
    .getThemes(new APIGetForumsThemesRequest({}))
    .pipe(
      catchError((response: unknown) => {
        this.toastService.handleError(response);
        return EMPTY;
      }),
      map((response) => response.items)
    );

  constructor(
    private readonly commentsClient: CommentsClient,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly pageEnv: PageEnvService,
    private readonly toastService: ToastsService,
    private readonly grpc: ForumsClient
  ) {}

  ngOnInit(): void {
    setTimeout(() => this.pageEnv.set({pageId: 83}), 0);
  }

  protected selectTopic(messageId: string, topic: APIForumsTopic) {
    this.commentsClient
      .moveComment(
        new CommentsMoveCommentRequest({
          commentId: messageId,
          itemId: topic.id,
          typeId: CommentsType.FORUMS_TYPE_ID,
        })
      )
      .pipe(
        switchMap(() =>
          this.commentsClient.getMessagePage(new GetMessagePageRequest({messageId, perPage: MESSAGES_PER_PAGE}))
        )
      )
      .subscribe({
        next: (params) =>
          this.router.navigate(['/forums/topic', params.itemId], {
            queryParams: {
              page: params.page,
            },
          }),
        error: (subresponse: unknown) => this.toastService.handleError(subresponse),
      });
  }

  protected getForumsThemeTranslation(id: string): string {
    return getForumsThemeTranslation(id);
  }
}
