import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { PageEnvService } from '../../services/page-env.service';
import {distinctUntilChanged, debounceTime, switchMap, map} from 'rxjs/operators';
import {UsersClient} from '../../../../generated/spec.pbsc';
import {APIEmailChangeConfirmRequest} from '../../../../generated/spec.pb';

@Component({
  selector: 'app-account-emailcheck',
  templateUrl: './emailcheck.component.html'
})
export class AccountEmailcheckComponent implements OnInit, OnDestroy {
  private routeSub: Subscription;
  public success = false;
  public failure = false;

  constructor(
    private route: ActivatedRoute,
    private pageEnv: PageEnvService,
    private grpc: UsersClient
  ) {}

  ngOnInit(): void {
    setTimeout(
      () =>
        this.pageEnv.set({
          layout: {
            needRight: false
          },
          nameTranslated: $localize `Confirm the email address`,
          pageId: 54
        }),
      0
    );
    this.routeSub = this.route.paramMap
      .pipe(
        map(params => params.get('token')),
        distinctUntilChanged(),
        debounceTime(30),
        switchMap(token => this.grpc.emailChangeConfirm(new APIEmailChangeConfirmRequest({code: token})))
      )
      .subscribe(() => (this.success = true), () => (this.failure = true));
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }
}
