import { Component} from '@angular/core';
import {BehaviorSubject, EMPTY} from 'rxjs';
import { ActivatedRoute, Router} from '@angular/router';
import {VotingService, APIVotingVariant, APIVoting} from './voting.service';
import { AuthService } from '../services/auth.service';
import { PageEnvService } from '../services/page-env.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { VotingVotesComponent } from './votes/votes.component';
import {ToastsService} from '../toasts/toasts.service';
import { APIService } from '../services/api.service';
import {catchError, debounceTime, distinctUntilChanged, map, switchMap, switchMapTo, tap} from 'rxjs/operators';

@Component({
  selector: 'app-voting',
  templateUrl: './voting.component.html'
})
export class VotingComponent {
  private reload$ = new BehaviorSubject<boolean>(true);
  public voting$ = this.route.paramMap.pipe(
    map(params => parseInt(params.get('id'), 10)),
    distinctUntilChanged(),
    debounceTime(10),
    switchMap(id => this.reload$.pipe(switchMapTo(this.votingService.getVoting(id)))),
    catchError(() => {
      this.router.navigate(['/error-404'], {
        skipLocationChange: true
      });
      return EMPTY;
    }),
    tap(voting => {
      this.pageEnv.set({
        layout: {
          needRight: true
        },
        nameTranslated: voting.name,
        pageId: 157
      });
    })
  );
  public filter = false;
  public selected: {};

  constructor(
    private api: APIService,
    private route: ActivatedRoute,
    private router: Router,
    private votingService: VotingService,
    public auth: AuthService,
    private pageEnv: PageEnvService,
    private modalService: NgbModal,
    private toastService: ToastsService
  ) {}

  public vote(voting: APIVoting) {
    const ids: number[] = [];

    if (!voting.multivariant) {
      if (this.selected) {
        ids.push(this.selected as number);
      }
    } else {
      for (const key in this.selected) {
        if (this.selected.hasOwnProperty(key)) {
          const value = this.selected[key];
          if (value) {
            ids.push(parseInt(key, 10));
          }
        }
      }
    }

    this.api.request<void>('PATCH', 'voting/' + voting.id, {body: {
      vote: ids
    }}).subscribe(
      () => {
        this.reload$.next(true);
      },
      response => this.toastService.response(response)
    );

    return false;
  }

  public isVariantSelected(voting: APIVoting): boolean {
    if (!voting.multivariant) {
      return this.selected > 0;
    }

    let count = 0;
    for (const key in this.selected) {
      if (this.selected.hasOwnProperty(key)) {
        const value = this.selected[key];
        if (value) {
          count++;
        }
      }
    }
    return count > 0;
  }

  public showWhoVoted(voting: APIVoting, variant: APIVotingVariant) {
    const modalRef = this.modalService.open(VotingVotesComponent, {
      size: 'lg',
      centered: true
    });

    modalRef.componentInstance.votingID = voting.id;
    modalRef.componentInstance.variantID = variant.id;

    return false;
  }
}
