import {Component, OnInit} from '@angular/core';
import {APIAccountItemsGetResponse, APIAccount} from '../account.service';
import {PageEnvService} from '@services/page-env.service';
import {ToastsService} from '../../toasts/toasts.service';
import {APIService} from '@services/api.service';

@Component({
  selector: 'app-account-accounts',
  templateUrl: './accounts.component.html',
})
export class AccountAccountsComponent implements OnInit {
  protected accounts: APIAccount[] = [];
  protected connectFailed = false;
  protected disconnectFailed = false;

  constructor(
    private readonly api: APIService,
    private readonly pageEnv: PageEnvService,
    private readonly toastService: ToastsService
  ) {}

  ngOnInit(): void {
    setTimeout(() => this.pageEnv.set({pageId: 123}), 0);

    this.load();
  }

  private load() {
    this.api.request<APIAccountItemsGetResponse>('GET', 'account').subscribe({
      next: (response) => {
        this.accounts = response.items;
      },
      error: (response: unknown) => {
        this.toastService.handleError(response);
      },
    });
  }

  protected remove(account: APIAccount) {
    this.api.request('DELETE', 'account/' + account.id).subscribe({
      next: () => {
        this.toastService.success($localize`Account removed`);

        this.load();
      },
      error: (response: unknown) => {
        this.disconnectFailed = true;
        this.toastService.handleError(response);
      },
    });
  }
}
