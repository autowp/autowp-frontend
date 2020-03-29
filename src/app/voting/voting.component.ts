import { Component, Injectable, OnInit, OnDestroy } from '@angular/core';
import { Subscription, combineLatest } from 'rxjs';
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
import { ACLService } from '../services/acl.service';
import {ToastsService} from '../toasts/toasts.service';
import {map} from 'rxjs/operators';
import { APIService } from '../services/api.service';

@Component({
  selector: 'app-voting',
  templateUrl: './voting.component.html'
})
@Injectable()
export class VotingComponent implements OnInit, OnDestroy {
  private id: number;
  private routeSub: Subscription;
  public voting: APIVoting;
  public filter = false;
  public selected: {};
  public isModer = false; // TODO: fetch value
  private aclSub: Subscription;

  constructor(
    private api: APIService,
    private route: ActivatedRoute,
    private router: Router,
    private votingService: VotingService,
    public auth: AuthService,
    private pageEnv: PageEnvService,
    private modalService: NgbModal,
    private acl: ACLService,
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
    this.aclSub = this.acl
      .inheritsRole('moder')
      .subscribe(inherits => (this.isModer = inherits));

    this.routeSub = combineLatest([this.route.params, this.route.queryParams]).pipe(
      map(data => ({
        params: data[0],
        query: data[1]
      }))
    ).subscribe(data => {
      this.id = data.params.id;
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
    this.aclSub.unsubscribe();
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
