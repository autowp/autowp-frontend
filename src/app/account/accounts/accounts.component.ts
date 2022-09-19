import {Component, OnInit} from '@angular/core';
import {
  APIAccountStartPostResponse,
  APIAccountItemsGetResponse,
  APIAccount
} from '../account.service';
import { PageEnvService } from '../../services/page-env.service';
import {ToastsService} from '../../toasts/toasts.service';
import { APIService } from '../../services/api.service';
import {externalLoginServices} from '../../services/oauth.service';

@Component({
  selector: 'app-account-accounts',
  templateUrl: './accounts.component.html'
})
export class AccountAccountsComponent implements OnInit {
  public service = null;
  public accounts: APIAccount[] = [];
  public connectFailed = false;
  public disconnectFailed = false;
  public services = externalLoginServices;

  constructor(
    private api: APIService,
    private pageEnv: PageEnvService,
    private toastService: ToastsService,
  ) {
  }

  ngOnInit(): void {
    setTimeout(
      () =>
        this.pageEnv.set({
          layout: {
            needRight: false
          },
          pageId: 123
        }),
      0
    );

    this.load();
  }

  public load() {
    this.api.request<APIAccountItemsGetResponse>('GET', 'account').subscribe({
      next: response => {
        this.accounts = response.items;
      },
      error: response => {
        this.toastService.response(response);
      }
    });
  }

  public start() {
    if (!this.service) {
      return;
    }

    this.api.request<APIAccountStartPostResponse>('GET', 'oauth/service', {params: {
      service: this.service,
      redirect_uri: 'https://' + window.location.host + '/account/accounts'
    }})
    .subscribe({
      next: response => {
        window.location.href = response.url;
      },
      error: response => {
        this.toastService.response(response);
      }
    });
  }

  public remove(account: APIAccount) {
    this.api.request('DELETE', 'account/' + account.id).subscribe({
      next: () => {
        this.toastService.success($localize`Account removed`);

        this.load();
      },
      error: response => {
        this.disconnectFailed = true;
        this.toastService.response(response);
      }
    });
  }
}
