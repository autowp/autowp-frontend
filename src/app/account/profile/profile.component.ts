import {Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import {AuthService} from '@services/auth.service';
import {PageEnvService} from '@services/page-env.service';
import {EMPTY, of, Subscription} from 'rxjs';
import {switchMap, catchError, tap} from 'rxjs/operators';
import {TimezoneService} from '@services/timezone';
import {ToastsService} from '../../toasts/toasts.service';
import {APIImage, APIService} from '@services/api.service';
import {HttpErrorResponse} from '@angular/common/http';
import {environment} from '@environment/environment';
import {APIUser} from '@grpc/spec.pb';
import {APIUser as RESTAPIUser} from '@services/user';
import {LanguageService} from '@services/language';
import {KeycloakService} from 'keycloak-angular';
import {InvalidParams} from '@utils/invalid-params.pipe';

@Component({
  selector: 'app-account-profile',
  templateUrl: './profile.component.html',
})
export class AccountProfileComponent implements OnInit, OnDestroy {
  public user: APIUser;

  public settings = {
    timezone: null,
    language: null,
  };
  public settingsInvalidParams: InvalidParams = {};
  public photoInvalidParams: any = {};
  public votesPerDay: number | null = null;
  public votesLeft: number | null = null;
  public photo: APIImage;
  private sub: Subscription;

  @ViewChild('input') input;

  public changeProfileUrl =
    environment.keycloak.url.replace(/\/$/g, '') + '/realms/' + environment.keycloak.realm + '/account/#/personal-info';

  public timezones$ = this.timezone.getTimezones$();

  public languages: {name: string; value: string}[] = environment.languages.map((language) => ({
    name: language.name,
    value: language.code,
  }));

  constructor(
    private api: APIService,
    private languageService: LanguageService,
    private keycloak: KeycloakService,
    private auth: AuthService,
    private pageEnv: PageEnvService,
    private timezone: TimezoneService,
    private toastService: ToastsService
  ) {}

  ngOnInit(): void {
    setTimeout(() => this.pageEnv.set({pageId: 129}), 0);

    this.sub = this.auth
      .getUser$()
      .pipe(
        switchMap((user) => {
          if (!user) {
            this.keycloak.login({
              redirectUri: window.location.href,
              locale: this.languageService.language,
            });
            return EMPTY;
          }

          this.user = user;

          return of(user);
        }),
        switchMap(() =>
          this.api.request<RESTAPIUser>('GET', 'user/me', {
            params: {
              fields: 'name,timezone,language,votes_per_day,votes_left,img',
            },
          })
        ),
        catchError((response: unknown) => {
          this.toastService.handleError(response);
          return EMPTY;
        })
      )
      .subscribe((user) => {
        this.settings.timezone = user.timezone;
        this.settings.language = user.language;
        this.votesPerDay = user.votes_per_day;
        this.votesLeft = user.votes_left;
        this.photo = user.img;
      });
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  private showSavedMessage() {
    this.toastService.success($localize`Data saved`);
  }

  public sendSettings() {
    this.settingsInvalidParams = {};

    this.api.request<void>('PUT', 'user/me', {body: this.settings}).subscribe({
      next: () => {
        this.showSavedMessage();
      },
      error: (response: unknown) => {
        if (response instanceof HttpErrorResponse && response.status === 400) {
          this.settingsInvalidParams = response.error.invalid_params;
        } else {
          this.toastService.handleError(response);
        }
      },
    });
  }

  /*public showFileSelectDialog() {
    this.photoInvalidParams = {};
    this.fileInput.nativeElement.click();
  }*/

  public resetPhoto() {
    this.api.request('DELETE', 'user/me/photo').subscribe({
      next: () => {
        this.user.avatar = null;
        this.photo = null;
      },
      error: (response: unknown) => this.toastService.handleError(response),
    });
  }

  public onChange(event: any) {
    const files = [].slice.call(event.target.files);
    if (files.length <= 0) {
      return;
    }

    const file = files[0];

    const formData: FormData = new FormData();
    formData.append('file', file);

    return this.api
      .request('POST', 'user/me/photo', {body: formData})
      .pipe(
        catchError((response: unknown) => {
          this.input.nativeElement.value = '';
          if (response instanceof HttpErrorResponse && response.status === 400) {
            this.photoInvalidParams = response.error.invalid_params;
            return EMPTY;
          }

          this.toastService.handleError(response);
          return EMPTY;
        }),
        tap(() => {
          this.input.nativeElement.value = '';
        }),
        switchMap(() =>
          this.api.request<RESTAPIUser>('GET', 'user/me', {
            params: {
              fields: 'img',
            },
          })
        ),
        catchError((response: unknown) => {
          this.toastService.handleError(response);
          return EMPTY;
        }),
        tap((response) => {
          this.photo = response.img;
        })
      )
      .subscribe();
  }
}
