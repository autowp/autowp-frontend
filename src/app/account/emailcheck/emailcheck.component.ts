import { Component, Injectable, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { PageEnvService } from '../../services/page-env.service';
import {distinctUntilChanged, debounceTime, switchMap, map} from 'rxjs/operators';
import { APIService } from '../../services/api.service';

@Component({
  selector: 'app-account-emailcheck',
  templateUrl: './emailcheck.component.html'
})
@Injectable()
export class AccountEmailcheckComponent implements OnInit, OnDestroy {
  private routeSub: Subscription;
  public success = false;
  public failure = false;

  constructor(
    private api: APIService,
    private route: ActivatedRoute,
    private pageEnv: PageEnvService
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
        switchMap(token =>
          this.api.request<void>('POST', 'user/emailcheck', {body: {
            code: token
          }})
        )
      )
      .subscribe(() => (this.success = true), () => (this.failure = true));
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }
}
