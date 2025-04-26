import {AsyncPipe} from '@angular/common';
import {Component, inject, input} from '@angular/core';
import {toObservable} from '@angular/core/rxjs-interop';
import {APIUser, VotingRequest} from '@grpc/spec.pb';
import {VotingsClient} from '@grpc/spec.pbsc';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {UserService} from '@services/user';
import {combineLatest, EMPTY, Observable, of} from 'rxjs';
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
  readonly #votingsClient = inject(VotingsClient);
  readonly #userService = inject(UserService);

  readonly votingID = input.required<number>();
  readonly variantID = input.required<number>();

  protected readonly votes$: Observable<Observable<APIUser | null>[]> = combineLatest([
    toObservable(this.votingID),
    toObservable(this.variantID),
  ]).pipe(
    switchMap(([votingID, variantID]) =>
      votingID && variantID ? this.#votingsClient.getVotingVariantVotes(new VotingRequest({id: variantID})) : of(null),
    ),
    catchError((response: unknown) => {
      this.#toastService.handleError(response);
      return EMPTY;
    }),
    map((response) => (response?.userIds || []).map((id) => this.#userService.getUser$(id))),
  );
}
