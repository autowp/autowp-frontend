import {Component, Input} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {BehaviorSubject, EMPTY, Observable, combineLatest, of} from 'rxjs';
import {catchError, map, switchMap} from 'rxjs/operators';

import {ToastsService} from '../../toasts/toasts.service';
import {APIVotingVariantVote, VotingService} from '../voting.service';

@Component({
  selector: 'app-voting-votes',
  templateUrl: './votes.component.html',
})
export class VotingVotesComponent {
  @Input() set votingID(value: number) {
    this.votingID$.next(value);
  }
  private readonly votingID$ = new BehaviorSubject<null | number>(null);

  @Input() set variantID(value: number) {
    this.variantID$.next(value);
  }
  private readonly variantID$ = new BehaviorSubject<null | number>(null);

  protected readonly votes$: Observable<APIVotingVariantVote[]> = combineLatest([this.votingID$, this.variantID$]).pipe(
    switchMap(([votingID, variantID]) =>
      votingID && variantID ? this.votingService.getVariantVotes$(votingID, variantID, {fields: 'user'}) : of(null),
    ),
    catchError((response: unknown) => {
      this.toastService.handleError(response);
      return EMPTY;
    }),
    map((response) => (response ? response.items : [])),
  );

  constructor(
    protected readonly activeModal: NgbActiveModal,
    private readonly votingService: VotingService,
    private readonly toastService: ToastsService,
  ) {}
}
