import {AsyncPipe} from '@angular/common';
import {Component, inject, OnInit} from '@angular/core';
import {APIService} from '@services/api.service';
import {PageEnvService} from '@services/page-env.service';
import {MarkdownComponent} from '@utils/markdown/markdown.component';
import {BehaviorSubject, combineLatest, EMPTY, Observable} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

import {ToastsService} from '../../toasts/toasts.service';
import {APIAccount, APIAccountItemsGetResponse} from '../account.service';

@Component({
  imports: [MarkdownComponent, AsyncPipe],
  selector: 'app-account-accounts',
  standalone: true,
  templateUrl: './accounts.component.html',
})
export class AccountAccountsComponent implements OnInit {
  private readonly api = inject(APIService);
  private readonly pageEnv = inject(PageEnvService);
  private readonly toastService = inject(ToastsService);

  private readonly reload$ = new BehaviorSubject<void>(void 0);
  protected readonly accounts$: Observable<APIAccount[]> = combineLatest([
    this.api.request$<APIAccountItemsGetResponse>('GET', 'account'),
    this.reload$,
  ]).pipe(
    catchError((error: unknown) => {
      this.toastService.handleError(error);
      return EMPTY;
    }),
    map(([response]) => response.items),
  );

  protected disconnectFailed = false;

  ngOnInit(): void {
    setTimeout(() => this.pageEnv.set({pageId: 123}), 0);
  }

  protected remove(account: APIAccount) {
    this.api.request$('DELETE', 'account/' + account.id).subscribe({
      error: (response: unknown) => {
        this.disconnectFailed = true;
        this.toastService.handleError(response);
      },
      next: () => {
        this.toastService.success($localize`Account removed`);

        this.reload$.next();
      },
    });
  }
}
