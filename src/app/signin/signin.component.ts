import {Component, OnDestroy, OnInit} from '@angular/core';
import { AuthService } from '../services/auth.service';
import {
  APILoginStartGetResponse,
  APIService
} from '../services/api.service';
import { PageEnvService } from '../services/page-env.service';
import {Subscription} from 'rxjs';
import {externalLoginServices} from '../services/oauth.service';
import {APIUser} from '../../../generated/spec.pb';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SignInComponent implements OnInit, OnDestroy {
  public services = externalLoginServices;
  public form = {
    login: '',
    password: ''
  };
  public invalidParams: any = {};
  public user: APIUser;
  private userSub: Subscription;

  constructor(
    public auth: AuthService,
    private api: APIService,
    private pageEnv: PageEnvService,
  ) { }

  ngOnInit(): void {
    this.userSub = this.auth.getUser().subscribe((user) => (this.user = user));

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
    this.userSub.unsubscribe();
  }

  public submit($event) {
    $event.preventDefault();


    return false;
  }

  public start(serviceId: string) {
    this.api
      .request<APILoginStartGetResponse>('GET', 'oauth/service', {
        params: {
          service: serviceId,
          redirect_uri: 'https://' + window.location.host + '/login'
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
