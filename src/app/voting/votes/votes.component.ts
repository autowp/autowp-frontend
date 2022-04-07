import {
  Component,
  Input
} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {APIVotingVariantVote, VotingService} from '../voting.service';
import {ToastsService} from '../../toasts/toasts.service';
import {BehaviorSubject, combineLatest, EMPTY, Observable} from 'rxjs';
import {catchError, map, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-voting-votes',
  templateUrl: './votes.component.html'
})
export class VotingVotesComponent {
  @Input('votingID') set votingID(value: number) { this.votingID$.next(value); };
  private votingID$ = new BehaviorSubject<number>(null);

  @Input('variantID') set variantID(value: number) { this.variantID$.next(value); };
  private variantID$ = new BehaviorSubject<number>(null);

  public votes$: Observable<APIVotingVariantVote[]> = combineLatest([this.votingID$, this.variantID$]).pipe(
    switchMap(([votingID, variantID]) => this.votingService
      .getVariantVotes(votingID, variantID, {
        fields: 'user'
      })
    ),
    catchError(response => {
      this.toastService.response(response);
      return EMPTY;
    }),
    map(response => response.items)
  );

  constructor(
    public activeModal: NgbActiveModal,
    private votingService: VotingService,
    private toastService: ToastsService
  ) {}
}
