import { Component, Injectable, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import {
  APILoginServicesGetResponse,
  APILoginStartPostResponse,
  APIService
} from '../services/api.service';
import { PageEnvService } from '../services/page-env.service';
import { APIUser } from '../services/user';
import { TranslateService } from '@ngx-translate/core';

interface SignInService {
  id: string;
  name: string;
  icon: string;
  color: string;
}

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
@Injectable()
export class SignInComponent implements OnInit {
  public services: SignInService[] = [];
  public form = {
    login: '',
    password: ''
  };
  public invalidParams: any = {};
  public user: APIUser;

  constructor(
    public auth: AuthService,
    private api: APIService,
    private pageEnv: PageEnvService,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.auth.getUser().subscribe((user) => (this.user = user));

    setTimeout(
      () =>
        this.pageEnv.set({
          layout: {
            needRight: false
          },
          name: 'page/79/name',
          pageId: 79
        }),
      0
    );

    this.api.request<APILoginServicesGetResponse>('GET', 'login/services').subscribe(
      (response) => {
        for (const key in response.items) {
          if (response.items.hasOwnProperty(key)) {
            const item = response.items[key];
            this.services.push({
              id: key,
              name: item.name,
              icon: item.icon,
              color: item.color
            });
          }
        }
      },
      response => {
        console.log(response);
      }
    );
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
      .request<APILoginStartPostResponse>('GET', 'login/start', {
        params: {
          type: serviceId
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
