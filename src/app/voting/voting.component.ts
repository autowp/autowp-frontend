import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription} from 'rxjs';
import { ActivatedRoute, Router} from '@angular/router';
import {
  VotingService,
  APIVoting,
  APIVotingVariant
} from './voting.service';
import { AuthService } from '../services/auth.service';
import { PageEnvService } from '../services/page-env.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { VotingVotesComponent } from './votes/votes.component';
import {ToastsService} from '../toasts/toasts.service';
import { APIService } from '../services/api.service';

@Component({
  selector: 'app-voting',
  templateUrl: './voting.component.html'
})
export class VotingComponent implements OnInit, OnDestroy {
  private id: number;
  private routeSub: Subscription;
  public voting: APIVoting;
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

  public load(callback?: () => void) {
    this.votingService.getVoting(this.id).subscribe(
      response => {
        this.voting = response;

        if (callback) {
          callback();
        }
      },
      () => {
        this.router.navigate(['/error-404'], {
          skipLocationChange: true
        });
      }
    );
  }

  ngOnInit(): void {
    this.routeSub = this.route.paramMap.subscribe(params => {
      this.id = parseInt(params.get('id'), 10);
      this.load(() => {
        this.pageEnv.set({
          layout: {
            needRight: true
          },
          nameTranslated: this.voting.name,
          pageId: 157
        });
      });
    });
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }

  public vote() {
    const ids: number[] = [];

    if (!this.voting.multivariant) {
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

    this.api
      .request<void>('PATCH', 'voting/' + this.id, {body: {
        vote: ids
      }})
      .subscribe(
        () => {
          this.load();
        },
        response => this.toastService.response(response)
      );

    return false;
  }

  public isVariantSelected(): boolean {
    if (!this.voting.multivariant) {
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

  public showWhoVoted(variant: APIVotingVariant) {
    const modalRef = this.modalService.open(VotingVotesComponent, {
      size: 'lg',
      centered: true
    });

    modalRef.componentInstance.votingID = this.id;
    modalRef.componentInstance.variantID = variant.id;

    return false;
  }
}
