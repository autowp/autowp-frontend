import {AsyncPipe, DatePipe} from '@angular/common';
import {Component, inject} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {CommentsType} from '@grpc/spec.pb';
import {NgbModal, NgbProgressbar} from '@ng-bootstrap/ng-bootstrap';
import {APIService} from '@services/api.service';
import {AuthService} from '@services/auth.service';
import {PageEnvService} from '@services/page-env.service';
import {BehaviorSubject, EMPTY} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, map, switchMap, tap} from 'rxjs/operators';

import {CommentsComponent} from '../comments/comments/comments.component';
import {ToastsService} from '../toasts/toasts.service';
import {VotingVotesComponent} from './votes/votes.component';
import {APIVoting, APIVotingVariant, VotingService} from './voting.service';

@Component({
  imports: [RouterLink, FormsModule, NgbProgressbar, CommentsComponent, AsyncPipe, DatePipe],
  selector: 'app-voting',
  standalone: true,
  templateUrl: './voting.component.html',
})
export class VotingComponent {
  private readonly api = inject(APIService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly votingService = inject(VotingService);
  protected readonly auth = inject(AuthService);
  private readonly pageEnv = inject(PageEnvService);
  private readonly modalService = inject(NgbModal);
  private readonly toastService = inject(ToastsService);

  private readonly reload$ = new BehaviorSubject<void>(void 0);
  protected readonly voting$ = this.route.paramMap.pipe(
    map((params) => parseInt(params.get('id') ?? '', 10)),
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
  protected selected: number = 0;
  protected selectedMulti: {[key: number]: number} = {};

  protected readonly CommentsType = CommentsType;

  protected vote(voting: APIVoting) {
    const ids: number[] = [];

    if (!voting.multivariant) {
      if (this.selected) {
        ids.push(this.selected);
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
      .request$<void>('PATCH', 'voting/' + voting.id, {
        body: {
          vote: ids,
        },
      })
      .subscribe({
        error: (response: unknown) => this.toastService.handleError(response),
        next: () => {
          this.reload$.next();
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
