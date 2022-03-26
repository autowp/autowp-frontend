import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CommentsVotesComponent} from '../votes/votes.component';
import {combineLatest, Subscription} from 'rxjs';
import {AuthService} from '../../services/auth.service';
import {ACLService, Privilege, Resource} from '../../services/acl.service';
import {APIComment, APICommentsService} from '../../api/comments/comments.service';
import {ToastsService} from '../../toasts/toasts.service';
import {APIUser, CommentsSetDeletedRequest, CommentsVoteCommentRequest} from '../../../../generated/spec.pb';
import {CommentsClient} from '../../../../generated/spec.pbsc';
import {GrpcStatusEvent} from '@ngx-grpc/common';

export interface APICommentInList extends APIComment {
  showReply?: boolean;
  resolve?: boolean;
}

@Component({
  selector: 'app-comments-list',
  templateUrl: './list.component.html'
})
export class CommentsListComponent implements OnInit, OnDestroy {
  public canRemoveComments = false;
  public canMoveMessage = false;

  @Input() itemID: number;
  @Input() typeID: number;
  @Input() messages: APICommentInList[];
  @Input() deep: number;
  @Output() sent = new EventEmitter<string>();

  public isModer: boolean;
  private sub: Subscription;
  public user: APIUser;

  constructor(
    private acl: ACLService,
    private commentService: APICommentsService,
    public auth: AuthService,
    private modalService: NgbModal,
    private toastService: ToastsService,
    private commentsGrpc: CommentsClient,
  ) {}

  ngOnInit(): void {
    this.sub = combineLatest([
      this.auth.getUser(),
      this.acl.isAllowed(Resource.COMMENT, Privilege.REMOVE),
      this.acl.isAllowed(Resource.FORUMS, Privilege.MODERATE),
      this.acl.isAllowed(Resource.GLOBAL, Privilege.MODERATE)
    ]).subscribe(([user, canRemoveComments, canMoveMessage, isModer]) => {
      this.user = user;
      this.canRemoveComments = canRemoveComments;
      this.canMoveMessage = canMoveMessage;
      this.isModer = isModer;
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  public vote(message: APIComment, value: number) {
    this.commentsGrpc.voteComment(new CommentsVoteCommentRequest({
      commentId: ''+message.id,
      vote: value,
    })).subscribe(
      () => {
        message.user_vote = value;

        this.commentService
          .getComment(message.id, { fields: 'vote' })
          .subscribe(
            response => (message.vote = response.vote),
            response => this.toastService.response(response)
          );

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
      .subscribe(
        () => (message.deleted = value),
        response => this.toastService.grpcErrorResponse(response)
      );
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
