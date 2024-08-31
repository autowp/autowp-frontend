import {Component, Input} from '@angular/core';
import {APIUser} from '@grpc/spec.pb';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {UserService} from '@services/user';
import {BehaviorSubject, combineLatest, EMPTY, Observable, of} from 'rxjs';
import {catchError, map, switchMap} from 'rxjs/operators';

import {ToastsService} from '../../toasts/toasts.service';
import {VotingService} from '../voting.service';

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

  protected readonly votes$: Observable<Observable<APIUser | null>[]> = combineLatest([
    this.votingID$,
    this.variantID$,
  ]).pipe(
    switchMap(([votingID, variantID]) =>
      votingID && variantID ? this.votingService.getVariantVotes$(votingID, variantID) : of(null),
    ),
    catchError((response: unknown) => {
      this.toastService.handleError(response);
      return EMPTY;
    }),
    map((response) => (response?.items || []).map((item) => this.userService.getUser$(item.user_id))),
  );

  constructor(
    protected readonly activeModal: NgbActiveModal,
    private readonly votingService: VotingService,
    private readonly toastService: ToastsService,
    private readonly userService: UserService,
  ) {}
}
