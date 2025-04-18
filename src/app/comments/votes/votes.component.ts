import {AsyncPipe} from '@angular/common';
import {Component, inject, Input} from '@angular/core';
import {CommentVote, GetCommentVotesRequest} from '@grpc/spec.pb';
import {CommentsClient} from '@grpc/spec.pbsc';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {BehaviorSubject, EMPTY, Observable} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, map, switchMap} from 'rxjs/operators';

import {ToastsService} from '../../toasts/toasts.service';
import {UserComponent} from '../../user/user/user.component';

@Component({
  imports: [UserComponent, AsyncPipe],
  selector: 'app-comments-votes',
  templateUrl: './votes.component.html',
})
export class CommentsVotesComponent {
  protected readonly activeModal = inject(NgbActiveModal);
  readonly #toastService = inject(ToastsService);
  readonly #commentsGrpc = inject(CommentsClient);

  @Input() set messageID(item: number) {
    this.#messageID$.next(item);
  }
  readonly #messageID$ = new BehaviorSubject<null | number>(null);

  protected readonly votes$: Observable<{
    negative: CommentVote[];
    positive: CommentVote[];
  }> = this.#messageID$.pipe(
    distinctUntilChanged(),
    debounceTime(1),
    switchMap((messageID) =>
      this.#commentsGrpc.getCommentVotes(
        new GetCommentVotesRequest({
          commentId: '' + messageID,
        }),
      ),
    ),
    catchError((response: unknown) => {
      this.#toastService.handleError(response);
      return EMPTY;
    }),
    map((votes) => ({
      negative: (votes.items ? votes.items : []).filter((v) => v.value === CommentVote.VoteValue.NEGATIVE),
      positive: (votes.items ? votes.items : []).filter((v) => v.value === CommentVote.VoteValue.POSITIVE),
    })),
  );
}
