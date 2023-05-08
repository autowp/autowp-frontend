import {Component, EventEmitter, Input, Output} from '@angular/core';
import {
  APICommentMessage,
  APIForumsTopic,
  APIGetForumsTopicRequest,
  APISetTopicStatusRequest,
  APIUser,
  CommentsType,
  CommentsUnSubscribeRequest,
} from '@grpc/spec.pb';
import {CommentsClient, ForumsClient} from '@grpc/spec.pbsc';
import {BehaviorSubject, Observable, of, throwError} from 'rxjs';
import {ToastsService} from '../../toasts/toasts.service';
import {catchError, map, shareReplay, switchMap} from 'rxjs/operators';
import {UserService} from '@services/user';
import {ACLService, Privilege, Resource} from '@services/acl.service';
import {GrpcStatusEvent} from '@ngx-grpc/common';

interface Topic {
  id: string;
  name: string;
  status: string;
  oldMessages: number;
  newMessages: number;
  createdAt: Date;
  userId: string;
  author$: Observable<APIUser>;
  lastMessage$: Observable<APICommentMessage>;
  lastMessageAuthor$: Observable<APIUser>;
}

@Component({
  selector: 'app-forums-topic-list',
  templateUrl: './topic-list.component.html',
})
export class ForumsTopicListComponent {
  @Input() set topics(value: APIForumsTopic[]) {
    this.topics$.next(value);
  }
  private readonly topics$ = new BehaviorSubject<APIForumsTopic[]>([]);

  @Input() showSubscribe = false;

  @Output() reload = new EventEmitter<void>();

  protected readonly forumAdmin$ = this.acl.isAllowed$(Resource.FORUMS, Privilege.MODERATE);

  protected readonly list$ = this.topics$.pipe(
    map((topics) =>
      topics.map((topic) => {
        const lastMessage$ = this.grpc.getLastMessage(new APIGetForumsTopicRequest({id: topic.id})).pipe(
          catchError((error: unknown) => {
            if (error instanceof GrpcStatusEvent && error.statusCode === 5) {
              return of(null);
            }
            return throwError(() => error);
          }),
          shareReplay(1)
        );
        const lastMessageAuthor$ = lastMessage$.pipe(
          switchMap((msg) => {
            if (!msg) {
              return of(null);
            }
            return this.userService.getUser2$(msg.userId);
          })
        );
        return {
          id: topic.id,
          name: topic.name,
          status: topic.status,
          oldMessages: topic.oldMessages,
          newMessages: topic.newMessages,
          createdAt: topic.createdAt.toDate(),
          userId: topic.userId,
          author$: this.userService.getUser2$(topic.userId),
          lastMessage$,
          lastMessageAuthor$,
        };
      })
    )
  );

  constructor(
    private readonly comments: CommentsClient,
    private readonly toastService: ToastsService,
    private readonly userService: UserService,
    private readonly grpc: ForumsClient,
    private readonly acl: ACLService
  ) {}

  protected unsubscribe(topic: Topic) {
    this.comments
      .unSubscribe(
        new CommentsUnSubscribeRequest({
          itemId: topic.id,
          typeId: CommentsType.FORUMS_TYPE_ID,
        })
      )
      .subscribe({
        next: () => {
          this.reload.emit();
        },
        error: (response: unknown) => this.toastService.handleError(response),
      });
  }

  protected openTopic(topic: Topic) {
    this.grpc.openTopic(new APISetTopicStatusRequest({id: topic.id})).subscribe({
      next: () => {
        topic.status = 'normal';
      },
      error: (response: unknown) => this.toastService.handleError(response),
    });
  }

  protected closeTopic(topic: Topic) {
    this.grpc.closeTopic(new APISetTopicStatusRequest({id: topic.id})).subscribe({
      next: () => {
        topic.status = 'closed';
      },
      error: (response: unknown) => this.toastService.handleError(response),
    });
  }

  protected deleteTopic(topic: Topic) {
    this.grpc.deleteTopic(new APISetTopicStatusRequest({id: topic.id})).subscribe({
      next: () => {
        this.reload.emit();
      },
      error: (response: unknown) => this.toastService.handleError(response),
    });
  }
}
