import {AsyncPipe} from '@angular/common';
import {Component, inject, Input} from '@angular/core';
import {APIUser, VotingRequest} from '@grpc/spec.pb';
import {VotingsClient} from '@grpc/spec.pbsc';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {UserService} from '@services/user';
import {BehaviorSubject, combineLatest, EMPTY, Observable, of} from 'rxjs';
import {catchError, map, switchMap} from 'rxjs/operators';

import {ToastsService} from '../../toasts/toasts.service';
import {UserComponent} from '../../user/user/user.component';

@Component({
  imports: [UserComponent, AsyncPipe],
  selector: 'app-voting-votes',
  templateUrl: './votes.component.html',
})
export class VotingVotesComponent {
  protected readonly activeModal = inject(NgbActiveModal);
  readonly #toastService = inject(ToastsService);
  readonly #votingsCleint = inject(VotingsClient);
  readonly #userService = inject(UserService);

  @Input() set votingID(value: number) {
    this.#votingID$.next(value);
  }
  readonly #votingID$ = new BehaviorSubject<null | number>(null);

  @Input() set variantID(value: number) {
    this.#variantID$.next(value);
  }
  readonly #variantID$ = new BehaviorSubject<null | number>(null);

  protected readonly votes$: Observable<Observable<APIUser | null>[]> = combineLatest([
    this.#votingID$,
    this.#variantID$,
  ]).pipe(
    switchMap(([votingID, variantID]) =>
      votingID && variantID ? this.#votingsCleint.getVotingVariantVotes(new VotingRequest({id: variantID})) : of(null),
    ),
    catchError((response: unknown) => {
      this.#toastService.handleError(response);
      return EMPTY;
    }),
    map((response) => (response?.userIds || []).map((id) => this.#userService.getUser$(id))),
  );
}
