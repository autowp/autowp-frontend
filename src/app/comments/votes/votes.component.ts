import {Component, Input} from '@angular/core';
import {CommentVote, GetCommentVotesRequest} from '@grpc/spec.pb';
import {CommentsClient} from '@grpc/spec.pbsc';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {BehaviorSubject, EMPTY, Observable} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, map, switchMap} from 'rxjs/operators';

import {ToastsService} from '../../toasts/toasts.service';

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
    negative: CommentVote[];
    positive: CommentVote[];
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
      negative: votes.items.filter((v) => v.value === CommentVote.VoteValue.NEGATIVE),
      positive: votes.items.filter((v) => v.value === CommentVote.VoteValue.POSITIVE),
    }))
  );

  constructor(
    protected readonly activeModal: NgbActiveModal,
    private readonly toastService: ToastsService,
    private readonly commentsGrpc: CommentsClient
  ) {}
}
