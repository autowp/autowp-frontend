import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CommentsType} from '@grpc/spec.pb';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {APIService} from '@services/api.service';
import {AuthService} from '@services/auth.service';
import {PageEnvService} from '@services/page-env.service';
import {BehaviorSubject, EMPTY} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, map, switchMap, tap} from 'rxjs/operators';

import {ToastsService} from '../toasts/toasts.service';
import {VotingVotesComponent} from './votes/votes.component';
import {APIVoting, APIVotingVariant, VotingService} from './voting.service';

@Component({
  selector: 'app-voting',
  templateUrl: './voting.component.html',
})
export class VotingComponent {
  private readonly reload$ = new BehaviorSubject<boolean>(true);
  protected readonly voting$ = this.route.paramMap.pipe(
    map((params) => parseInt(params.get('id'), 10)),
    distinctUntilChanged(),
    debounceTime(10),
    switchMap((id) => this.reload$.pipe(switchMap(() => this.votingService.getVoting$(id)))),
    catchError(() => {
      this.router.navigate(['/error-404'], {
        skipLocationChange: true,
      });
      return EMPTY;
    }),
    tap((voting) => {
      this.pageEnv.set({
        pageId: 157,
        title: voting.name,
      });
    }),
  );
  protected filter = false;
  protected selected: number;
  protected selectedMulti: {[key: number]: number} = {};

  protected readonly CommentsType = CommentsType;

  constructor(
    private readonly api: APIService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly votingService: VotingService,
    protected readonly auth: AuthService,
    private readonly pageEnv: PageEnvService,
    private readonly modalService: NgbModal,
    private readonly toastService: ToastsService,
  ) {}

  protected vote(voting: APIVoting) {
    const ids: number[] = [];

    if (!voting.multivariant) {
      if (this.selected) {
        ids.push(this.selected as number);
      }
    } else {
      for (const key in this.selectedMulti) {
        const value = this.selectedMulti[key];
        if (value) {
          ids.push(parseInt(key, 10));
        }
      }
    }

    this.api
      .request<void>('PATCH', 'voting/' + voting.id, {
        body: {
          vote: ids,
        },
      })
      .subscribe({
        error: (response: unknown) => this.toastService.handleError(response),
        next: () => {
          this.reload$.next(true);
        },
      });

    return false;
  }

  protected isVariantSelected(voting: APIVoting): boolean {
    if (!voting.multivariant) {
      return this.selected > 0;
    }

    let count = 0;
    for (const key in this.selectedMulti) {
      const value = this.selectedMulti[key];
      if (value) {
        count++;
      }
    }
    return count > 0;
  }

  protected showWhoVoted(voting: APIVoting, variant: APIVotingVariant) {
    const modalRef = this.modalService.open(VotingVotesComponent, {
      centered: true,
      size: 'lg',
    });

    modalRef.componentInstance.votingID = voting.id;
    modalRef.componentInstance.variantID = variant.id;

    return false;
  }
}
