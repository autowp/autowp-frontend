import {AsyncPipe} from '@angular/common';
import {Component, inject, OnInit} from '@angular/core';
import {APIAccountsAccount, DeleteUserAccountRequest} from '@grpc/spec.pb';
import {UsersClient} from '@grpc/spec.pbsc';
import {Empty} from '@ngx-grpc/well-known-types';
import {PageEnvService} from '@services/page-env.service';
import {MarkdownComponent} from '@utils/markdown/markdown.component';
import {BehaviorSubject, combineLatest, EMPTY, Observable} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

import {ToastsService} from '../../toasts/toasts.service';

@Component({
  imports: [MarkdownComponent, AsyncPipe],
  selector: 'app-account-accounts',
  templateUrl: './accounts.component.html',
})
export class AccountAccountsComponent implements OnInit {
  private readonly pageEnv = inject(PageEnvService);
  private readonly toastService = inject(ToastsService);
  private readonly usersClient = inject(UsersClient);

  private readonly reload$ = new BehaviorSubject<void>(void 0);
  protected readonly accounts$: Observable<APIAccountsAccount[]> = combineLatest([
    this.usersClient.getAccounts(new Empty()),
    this.reload$,
  ]).pipe(
    catchError((error: unknown) => {
      this.toastService.handleError(error);
      return EMPTY;
    }),
    map(([response]) => response.items || []),
  );

  protected disconnectFailed = false;

  ngOnInit(): void {
    setTimeout(() => this.pageEnv.set({pageId: 123}), 0);
  }

  protected remove(account: APIAccountsAccount) {
    this.usersClient.deleteUserAccount(new DeleteUserAccountRequest({id: account.id})).subscribe({
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
