import {Component, Input} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ToastsService} from '../../toasts/toasts.service';
import {CommentVote, GetCommentVotesRequest} from '@grpc/spec.pb';
import {catchError, debounceTime, distinctUntilChanged, map, switchMap} from 'rxjs/operators';
import {CommentsClient} from '@grpc/spec.pbsc';
import {BehaviorSubject, EMPTY, Observable} from 'rxjs';

@Component({
  selector: 'app-comments-votes',
  templateUrl: './votes.component.html',
})
export class CommentsVotesComponent {
  @Input() set messageID(item: number) {
    this.messageID$.next(item);
  }
  private readonly messageID$ = new BehaviorSubject<number>(null);

  protected readonly votes$: Observable<{
    positive: CommentVote[];
    negative: CommentVote[];
  }> = this.messageID$.pipe(
    distinctUntilChanged(),
    debounceTime(1),
    switchMap((messageID) =>
      this.commentsGrpc.getCommentVotes(
        new GetCommentVotesRequest({
          commentId: '' + messageID,
        })
      )
    ),
    catchError((response: unknown) => {
      this.toastService.handleError(response);
      return EMPTY;
    }),
    map((votes) => ({
      positive: votes.items.filter((v) => v.value === CommentVote.VoteValue.POSITIVE),
      negative: votes.items.filter((v) => v.value === CommentVote.VoteValue.NEGATIVE),
    }))
  );

  constructor(
    protected readonly activeModal: NgbActiveModal,
    private readonly toastService: ToastsService,
    private readonly commentsGrpc: CommentsClient
  ) {}
}
