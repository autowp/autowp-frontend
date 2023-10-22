import {Component, EventEmitter, Input, Output} from '@angular/core';
import {
  APICommentsMessage,
  APIUser,
  CommentMessageFields,
  CommentsSetDeletedRequest,
  CommentsType,
  CommentsVoteCommentRequest,
  GetMessageRequest,
  ModeratorAttention,
} from '@grpc/spec.pb';
import {CommentsClient} from '@grpc/spec.pbsc';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ACLService, Privilege, Resource} from '@services/acl.service';
import {AuthService} from '@services/auth.service';
import {UserService} from '@services/user';
import {BehaviorSubject, EMPTY, Observable} from 'rxjs';
import {catchError, map, switchMap} from 'rxjs/operators';

import {ToastsService} from '../../toasts/toasts.service';
import {CommentsVotesComponent} from '../votes/votes.component';

export interface APICommentInList extends APICommentsMessage {
  resolve?: boolean;
  showReply?: boolean;
}

@Component({
  selector: 'app-comments-list',
  templateUrl: './list.component.html',
})
export class CommentsListComponent {
  @Input() set itemID(itemID: string) {
    this.itemID$.next(itemID);
  }
  protected readonly itemID$ = new BehaviorSubject<string>(null);

  @Input() set typeID(typeID: CommentsType) {
    this.typeID$.next(typeID);
  }
  protected readonly typeID$ = new BehaviorSubject<CommentsType>(null);

  @Input() set messages(messages: APICommentInList[]) {
    this.messages$.next(
      messages.map((message) => ({
        canVote$: this.user$.pipe(map((user) => user && user.id !== message.authorId)),
        message,
        user$: this.userService.getUser2$(message.authorId),
      })),
    );
  }
  protected readonly messages$ = new BehaviorSubject<
    {
      canVote$: Observable<boolean>;
      message: APICommentInList;
      user$: Observable<APIUser>;
    }[]
  >([]);

  @Input() set deep(deep: number) {
    this.deep$.next(deep);
  }
  protected readonly deep$ = new BehaviorSubject<number>(null);

  @Output() sent = new EventEmitter<string>();

  protected readonly canRemoveComments$ = this.acl.isAllowed$(Resource.COMMENT, Privilege.REMOVE);
  protected readonly canMoveMessage$ = this.acl.isAllowed$(Resource.FORUMS, Privilege.MODERATE);
  protected readonly isModer$ = this.acl.isAllowed$(Resource.GLOBAL, Privilege.MODERATE);
  protected readonly user$ = this.auth.getUser$();

  protected readonly ModeratorAttention = ModeratorAttention;

  constructor(
    private readonly acl: ACLService,
    protected readonly auth: AuthService,
    private readonly modalService: NgbModal,
    private readonly toastService: ToastsService,
    private readonly commentsGrpc: CommentsClient,
    private readonly userService: UserService,
  ) {}

  protected vote(message: APICommentsMessage, value: number) {
    this.commentsGrpc
      .voteComment(
        new CommentsVoteCommentRequest({
          commentId: message.id,
          vote: value,
        }),
      )
      .pipe(
        catchError((error: unknown) => {
          this.toastService.handleError(error);
          return EMPTY;
        }),
        switchMap(() => {
          message.userVote = value;

          // ga('send', 'event', 'comment-vote', value > 0 ? 'like' : 'dislike');
          return this.commentsGrpc.getMessage(
            new GetMessageRequest({fields: new CommentMessageFields({vote: true}), id: message.id}),
          );
        }),
      )
      .subscribe({
        error: (response: unknown) => this.toastService.handleError(response),
        next: (response) => (message.vote = response.vote),
      });

    return false;
  }

  protected setIsDeleted(message: APICommentsMessage, value: boolean) {
    this.commentsGrpc
      .setDeleted(
        new CommentsSetDeletedRequest({
          commentId: message.id,
          deleted: value,
        }),
      )
      .subscribe({
        error: (response: unknown) => this.toastService.handleError(response),
        next: () => (message.deleted = value),
      });
  }

  protected reply(message: APICommentInList, resolve: boolean) {
    message.showReply = true;
    message.resolve = resolve;
  }

  protected showVotes(message: APICommentsMessage) {
    const modalRef = this.modalService.open(CommentsVotesComponent, {
      centered: true,
      size: 'lg',
    });

    modalRef.componentInstance.messageID = message.id;
    return false;
  }

  protected onSent(id: string) {
    this.sent.emit(id);
  }

  protected onCancel(message: APICommentInList) {
    message.showReply = false;
  }
}
