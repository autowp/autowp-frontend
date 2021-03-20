import {Component, Injectable, OnDestroy, OnInit} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {
  APIAccountStartPostResponse,
  APIAccountItemsGetResponse,
  APIAccount
} from '../account.service';
import { PageEnvService } from '../../services/page-env.service';
import {ToastsService} from '../../toasts/toasts.service';
import { APIService } from '../../services/api.service';
import {map, switchMap} from 'rxjs/operators';
import {EMPTY, of, Subscription} from 'rxjs';
import {externalLoginServices, OAuthService, TokenResponse} from '../../services/oauth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-account-accounts',
  templateUrl: './accounts.component.html'
})
@Injectable()
export class AccountAccountsComponent implements OnInit, OnDestroy{
  public service = null;
  public accounts: APIAccount[] = [];
  public connectFailed = false;
  public disconnectFailed = false;
  public services = externalLoginServices;
  private tokenSub: Subscription;

  constructor(
    private api: APIService,
    private translate: TranslateService,
    private pageEnv: PageEnvService,
    private toastService: ToastsService,
    private route: ActivatedRoute,
    private auth: AuthService,
    private oauth: OAuthService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    setTimeout(
      () =>
        this.pageEnv.set({
          layout: {
            needRight: false
          },
          nameTranslated: $localize `My accounts`,
          pageId: 123
        }),
      0
    );

    this.load();

    this.tokenSub = this.route.queryParamMap.pipe(
      map(params => params.get('token')),
      switchMap(token => {
        if (! token) {
          return EMPTY;
        }

        return of(JSON.parse(token) as TokenResponse);
      })
    ).subscribe(token => {
      this.oauth.setToken(token);
      this.auth.loadMe().subscribe({
        next: () => {
          this.router.navigate(['/account/accounts']);
        }
      });
      this.load();
    });
  }

  ngOnDestroy(): void {
    this.tokenSub.unsubscribe();
  }

  public load() {
    this.api.request<APIAccountItemsGetResponse>('GET', 'account').subscribe(
      response => {
        this.accounts = response.items;
      },
      response => {
        this.toastService.response(response);
      }
    );
  }

  public start() {
    if (!this.service) {
      return;
    }

    this.api.request<APIAccountStartPostResponse>('GET', 'oauth/service', {params: {
      service: this.service,
      redirect_uri: 'http://' + window.location.host + '/account/accounts'
    }})
    .subscribe(
      response => {
        window.location.href = response.url;
      },
      response => {
        this.toastService.response(response);
      }
    );
  }

  public remove(account: APIAccount) {
    this.api.request('DELETE', 'account/' + account.id).subscribe(
      () => {
        this.translate
          .get('account/accounts/removed')
          .subscribe((translation: string) => this.toastService.success(translation));

        this.load();
      },
      response => {
        this.disconnectFailed = true;
        this.toastService.response(response);
      }
    );
  }
}
