import {Component, Input} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {ToastsService} from '../../toasts/toasts.service';
import {CommentVote, GetCommentVotesRequest} from '../../../../generated/spec.pb';
import {catchError, debounceTime, distinctUntilChanged, map, switchMap} from 'rxjs/operators';
import {CommentsClient} from '../../../../generated/spec.pbsc';
import {BehaviorSubject, EMPTY, Observable} from 'rxjs';

@Component({
  selector: 'app-comments-votes',
  templateUrl: './votes.component.html'
})
export class CommentsVotesComponent {
  @Input() set messageID(item: number) { this.messageID$.next(item); };
  private messageID$ = new BehaviorSubject<number>(null);

  public votes$: Observable<{
    positive: CommentVote[],
    negative: CommentVote[]
  }> = this.messageID$.pipe(
    distinctUntilChanged(),
    debounceTime(1),
    switchMap(messageID => this.commentsGrpc.getCommentVotes(new GetCommentVotesRequest({
      commentId: ''+messageID,
    }))),
    catchError(response => {
      this.toastService.grpcErrorResponse(response);
      return EMPTY;
    }),
    map(votes => ({
      positive: votes.items.filter(v => v.value === CommentVote.VoteValue.POSITIVE),
      negative: votes.items.filter(v => v.value === CommentVote.VoteValue.NEGATIVE)
    }))
  );

  constructor(
    public activeModal: NgbActiveModal,
    private toastService: ToastsService,
    private commentsGrpc: CommentsClient,
  ) {}
}
