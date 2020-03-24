import {
  Component,
  Injectable,
  Input,
  EventEmitter,
  Output,
  OnInit,
  OnDestroy
} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommentsVotesComponent } from '../votes/votes.component';
import { Subscription, combineLatest } from 'rxjs';
import { APIUser } from '../../services/user';
import { AuthService } from '../../services/auth.service';
import { ACLService } from '../../services/acl.service';
import { APIComment, APICommentsService } from '../../api/comments/comments.service';
import {ToastsService} from '../../toasts/toasts.service';

export interface APICommentInList extends APIComment {
  showReply: boolean;
  resolve: boolean;
}

@Component({
  selector: 'app-comments-list',
  templateUrl: './list.component.html'
})
@Injectable()
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
    private toastService: ToastsService
  ) {}

  ngOnInit(): void {

    this.acl.inheritsRole('moder').subscribe(isModer => {this.isModer = isModer; });

    this.sub = combineLatest([
      this.auth.getUser(),
      this.acl.isAllowed('comment', 'remove'),
      this.acl.isAllowed('forums', 'moderate')
    ]).subscribe(data => {
      this.user = data[0];
      this.canRemoveComments = data[1];
      this.canMoveMessage = data[2];
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  public vote(message: APIComment, value: number) {
    this.commentService.vote(message.id, value).subscribe(
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
      response => {
        if (response.status === 400) {
          Object.entries(response.error.invalid_params).forEach(
            ([paramKey, param]) =>
              Object.entries(param).forEach(([messageKey, iMessage]) =>
                this.toastService.show({
                  icon: 'fa fa-exclamation-triangle',
                  message: iMessage,
                  type: 'warning'
                })
              )
          );
        } else {
          this.toastService.response(response);
        }
      }
    );

    return false;
  }

  public setIsDeleted(message: APIComment, value: boolean) {
    this.commentService
      .setIsDeleted(message.id, value)
      .subscribe(
        () => (message.deleted = value),
        response => this.toastService.response(response)
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
