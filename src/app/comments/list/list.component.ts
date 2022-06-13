import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CommentsVotesComponent} from '../votes/votes.component';
import {AuthService} from '../../services/auth.service';
import {ACLService, Privilege, Resource} from '../../services/acl.service';
import {APIComment, APICommentsService} from '../../api/comments/comments.service';
import {ToastsService} from '../../toasts/toasts.service';
import {CommentsSetDeletedRequest, CommentsType, CommentsVoteCommentRequest} from '../../../../generated/spec.pb';
import {CommentsClient} from '../../../../generated/spec.pbsc';
import {GrpcStatusEvent} from '@ngx-grpc/common';
import {BehaviorSubject} from 'rxjs';

export interface APICommentInList extends APIComment {
  showReply?: boolean;
  resolve?: boolean;
}

@Component({
  selector: 'app-comments-list',
  templateUrl: './list.component.html'
})
export class CommentsListComponent {

  @Input() set itemID(itemID: number) { this.itemID$.next(itemID); };
  public itemID$ = new BehaviorSubject<number>(null);

  @Input() set typeID(typeID: CommentsType) { this.typeID$.next(typeID); };
  public typeID$ = new BehaviorSubject<CommentsType>(null);

  @Input() set messages(messages: APICommentInList[]) { this.messages$.next(messages); };
  public messages$ = new BehaviorSubject<APICommentInList[]>([]);

  @Input() set deep(deep: number) { this.deep$.next(deep); };
  public deep$ = new BehaviorSubject<number>(null);

  @Output() sent = new EventEmitter<string>();

  public canRemoveComments$ = this.acl.isAllowed(Resource.COMMENT, Privilege.REMOVE);
  public canMoveMessage$ = this.acl.isAllowed(Resource.FORUMS, Privilege.MODERATE);
  public isModer$ = this.acl.isAllowed(Resource.GLOBAL, Privilege.MODERATE);
  public user$ = this.auth.getUser();

  constructor(
    private acl: ACLService,
    private commentService: APICommentsService,
    public auth: AuthService,
    private modalService: NgbModal,
    private toastService: ToastsService,
    private commentsGrpc: CommentsClient,
  ) {}

  public vote(message: APIComment, value: number) {
    this.commentsGrpc.voteComment(new CommentsVoteCommentRequest({
      commentId: ''+message.id,
      vote: value,
    })).subscribe(
      () => {
        message.user_vote = value;

        this.commentService
          .getComment(message.id, { fields: 'vote' })
          .subscribe({
            next: response => (message.vote = response.vote),
            error: response => this.toastService.response(response)
          });

        // ga('send', 'event', 'comment-vote', value > 0 ? 'like' : 'dislike');
      },
      (response: GrpcStatusEvent) => {
        this.toastService.grpcErrorResponse(response);
      }
    );

    return false;
  }

  public setIsDeleted(message: APIComment, value: boolean) {
    this.commentsGrpc.setDeleted(new CommentsSetDeletedRequest({
      commentId: ''+message.id,
      deleted: value,
    }))
      .subscribe({
        next: () => (message.deleted = value),
        error: response => this.toastService.grpcErrorResponse(response)
      });
  }

  public reply(message: APICommentInList, resolve: boolean) {
    message.showReply = true;
    message.resolve = resolve;
  }

  public showVotes(message: APIComment) {
    const modalRef = this.modalService.open(CommentsVotesComponent, {
      size: 'lg',
      centered: true
    });

    modalRef.componentInstance.messageID = message.id;
    return false;
  }

  public onSent(location: string) {
    this.sent.emit(location);
  }

  public onCancel(message: APICommentInList) {
    message.showReply = false;
  }

}
