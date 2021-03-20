import {Component, Injectable, OnDestroy, OnInit} from '@angular/core';
import { AuthService } from '../services/auth.service';
import {
  APILoginStartGetResponse,
  APIService
} from '../services/api.service';
import { PageEnvService } from '../services/page-env.service';
import { APIUser } from '../services/user';
import { TranslateService } from '@ngx-translate/core';
import {ActivatedRoute, Router} from '@angular/router';
import {map, switchMap} from 'rxjs/operators';
import {EMPTY, of, Subscription} from 'rxjs';
import {externalLoginServices, OAuthService, TokenResponse} from '../services/oauth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
@Injectable()
export class SignInComponent implements OnInit, OnDestroy {
  public services = externalLoginServices;
  public form = {
    login: '',
    password: ''
  };
  public invalidParams: any = {};
  public user: APIUser;
  private tokenSub: Subscription;
  private userSub: Subscription;

  constructor(
    public auth: AuthService,
    private oauth: OAuthService,
    private api: APIService,
    private pageEnv: PageEnvService,
    private translate: TranslateService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userSub = this.auth.getUser().subscribe((user) => (this.user = user));

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
          this.router.navigate(['/login']);
        }
      });
    });

    setTimeout(
      () =>
        this.pageEnv.set({
          layout: {
            needRight: false
          },
          nameTranslated: $localize `Sign in`,
          pageId: 79
        }),
      0
    );
  }

  ngOnDestroy(): void {
    this.tokenSub.unsubscribe();
    this.userSub.unsubscribe();
  }

  public submit($event) {
    $event.preventDefault();

    this.auth
      .login(this.form.login, this.form.password)
      .subscribe(
        result => {
          if (! result) {
            this.translate.get('login/login-or-password-is-incorrect').subscribe(translation => {
              this.invalidParams = {
                password: {
                  invalid: translation
                }
              };
            });
          }
        },
        error => {
          this.invalidParams = {
            password: {
              error: 'Error'
            }
          };
        }
      );

    return false;
  }

  public start(serviceId: string) {
    this.api
      .request<APILoginStartGetResponse>('GET', 'oauth/service', {
        params: {
          service: serviceId,
          redirect_uri: 'http://' + window.location.host + '/login'
        }
      })
      .subscribe(
        (response) => {
          window.location.href = response.url;
        },
        (response) => {
          console.log(response);
        }
      );

    return false;
  }
}
