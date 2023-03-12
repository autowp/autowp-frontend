import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {EMPTY, of} from 'rxjs';
import {PageEnvService} from '@services/page-env.service';
import {catchError, debounceTime, distinctUntilChanged, map, switchMap} from 'rxjs/operators';
import {APIForumTopic, ForumsService} from '../forums.service';
import {ToastsService} from '../../toasts/toasts.service';
import {getForumsThemeTranslation} from '@utils/translations';
import {CommentsClient} from '@grpc/spec.pbsc';
import {CommentsMoveCommentRequest, CommentsType} from '@grpc/spec.pb';

@Component({
  selector: 'app-forums-move-message',
  templateUrl: './move-message.component.html',
})
export class ForumsMoveMessageComponent implements OnInit {
  public messageID$ = this.route.queryParamMap.pipe(
    map((params) => parseInt(params.get('message_id'), 10)),
    distinctUntilChanged(),
    debounceTime(10)
  );

  public themeID$ = this.route.queryParamMap.pipe(
    map((params) => parseInt(params.get('theme_id'), 10)),
    distinctUntilChanged(),
    debounceTime(10)
  );

  public topics$ = this.themeID$.pipe(
    switchMap((themeID) => {
      if (!themeID) {
        return of(null as APIForumTopic[]);
      }
      return this.forumService.getTopics$({theme_id: themeID}).pipe(
        catchError((response: unknown) => {
          this.toastService.handleError(response);
          return EMPTY;
        }),
        map((response) => response.items)
      );
    })
  );

  public themes$ = this.forumService.getThemes$({}).pipe(
    catchError((response: unknown) => {
      this.toastService.handleError(response);
      return EMPTY;
    }),
    map((response) => response.items)
  );

  constructor(
    private forumService: ForumsService,
    private router: Router,
    private route: ActivatedRoute,
    private pageEnv: PageEnvService,
    private toastService: ToastsService,
    private commentsGrpc: CommentsClient
  ) {}

  ngOnInit(): void {
    setTimeout(() => this.pageEnv.set({pageId: 83}), 0);
  }

  public selectTopic(messageID: number, topic: APIForumTopic) {
    this.commentsGrpc
      .moveComment(
        new CommentsMoveCommentRequest({
          commentId: '' + messageID,
          itemId: '' + topic.id,
          typeId: CommentsType.FORUMS_TYPE_ID,
        })
      )
      .pipe(switchMap(() => this.forumService.getMessageStateParams$(messageID)))
      .subscribe({
        next: (params) =>
          this.router.navigate(['/forums/topic', params.topic_id], {
            queryParams: {
              page: params.page,
            },
          }),
        error: (subresponse: unknown) => this.toastService.handleError(subresponse),
      });
  }

  public getForumsThemeTranslation(id: string): string {
    return getForumsThemeTranslation(id);
  }
}
