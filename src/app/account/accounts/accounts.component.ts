import {Component, OnInit} from '@angular/core';
import {APIAccountItemsGetResponse, APIAccount} from '../account.service';
import {PageEnvService} from '@services/page-env.service';
import {ToastsService} from '../../toasts/toasts.service';
import {APIService} from '@services/api.service';
import {catchError, map} from 'rxjs/operators';
import {BehaviorSubject, combineLatest, EMPTY, Observable} from 'rxjs';

@Component({
  selector: 'app-account-accounts',
  templateUrl: './accounts.component.html',
})
export class AccountAccountsComponent implements OnInit {
  private readonly reload$ = new BehaviorSubject<void>(null);
  protected readonly accounts$: Observable<APIAccount[]> = combineLatest([
    this.api.request<APIAccountItemsGetResponse>('GET', 'account'),
    this.reload$,
  ]).pipe(
    catchError((error: unknown) => {
      this.toastService.handleError(error);
      return EMPTY;
    }),
    map(([response]) => response.items)
  );

  protected disconnectFailed = false;

  constructor(
    private readonly api: APIService,
    private readonly pageEnv: PageEnvService,
    private readonly toastService: ToastsService
  ) {}

  ngOnInit(): void {
    setTimeout(() => this.pageEnv.set({pageId: 123}), 0);
  }

  protected remove(account: APIAccount) {
    this.api.request('DELETE', 'account/' + account.id).subscribe({
      next: () => {
        this.toastService.success($localize`Account removed`);

        this.reload$.next();
      },
      error: (response: unknown) => {
        this.disconnectFailed = true;
        this.toastService.handleError(response);
      },
    });
  }
}
