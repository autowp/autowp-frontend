import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CommentsVotesComponent} from '../votes/votes.component';
import {AuthService} from '@services/auth.service';
import {ACLService, Privilege, Resource} from '@services/acl.service';
import {APIComment, APICommentsService} from '../../api/comments/comments.service';
import {ToastsService} from '../../toasts/toasts.service';
import {CommentsSetDeletedRequest, CommentsType, CommentsVoteCommentRequest} from '@grpc/spec.pb';
import {CommentsClient} from '@grpc/spec.pbsc';
import {BehaviorSubject, EMPTY} from 'rxjs';
import {catchError, switchMap} from 'rxjs/operators';

export interface APICommentInList extends APIComment {
  showReply?: boolean;
  resolve?: boolean;
}

@Component({
  selector: 'app-comments-list',
  templateUrl: './list.component.html',
})
export class CommentsListComponent {
  @Input() set itemID(itemID: number) {
    this.itemID$.next(itemID);
  }
  protected readonly itemID$ = new BehaviorSubject<number>(null);

  @Input() set typeID(typeID: CommentsType) {
    this.typeID$.next(typeID);
  }
  protected readonly typeID$ = new BehaviorSubject<CommentsType>(null);

  @Input() set messages(messages: APICommentInList[]) {
    this.messages$.next(messages);
  }
  protected readonly messages$ = new BehaviorSubject<APICommentInList[]>([]);

  @Input() set deep(deep: number) {
    this.deep$.next(deep);
  }
  protected readonly deep$ = new BehaviorSubject<number>(null);

  @Output() sent = new EventEmitter<string>();

  protected readonly canRemoveComments$ = this.acl.isAllowed$(Resource.COMMENT, Privilege.REMOVE);
  protected readonly canMoveMessage$ = this.acl.isAllowed$(Resource.FORUMS, Privilege.MODERATE);
  protected readonly isModer$ = this.acl.isAllowed$(Resource.GLOBAL, Privilege.MODERATE);
  protected readonly user$ = this.auth.getUser$();

  constructor(
    private readonly acl: ACLService,
    private readonly commentService: APICommentsService,
    protected readonly auth: AuthService,
    private readonly modalService: NgbModal,
    private readonly toastService: ToastsService,
    private readonly commentsGrpc: CommentsClient
  ) {}

  protected vote(message: APIComment, value: number) {
    this.commentsGrpc
      .voteComment(
        new CommentsVoteCommentRequest({
          commentId: '' + message.id,
          vote: value,
        })
      )
      .pipe(
        catchError((error: unknown) => {
          this.toastService.handleError(error);
          return EMPTY;
        }),
        switchMap(() => {
          message.user_vote = value;

          // ga('send', 'event', 'comment-vote', value > 0 ? 'like' : 'dislike');
          return this.commentService.getComment$(message.id, {fields: 'vote'});
        })
      )
      .subscribe({
        next: (response) => (message.vote = response.vote),
        error: (response: unknown) => this.toastService.handleError(response),
      });

    return false;
  }

  protected setIsDeleted(message: APIComment, value: boolean) {
    this.commentsGrpc
      .setDeleted(
        new CommentsSetDeletedRequest({
          commentId: '' + message.id,
          deleted: value,
        })
      )
      .subscribe({
        next: () => (message.deleted = value),
        error: (response: unknown) => this.toastService.handleError(response),
      });
  }

  protected reply(message: APICommentInList, resolve: boolean) {
    message.showReply = true;
    message.resolve = resolve;
  }

  protected showVotes(message: APIComment) {
    const modalRef = this.modalService.open(CommentsVotesComponent, {
      size: 'lg',
      centered: true,
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
