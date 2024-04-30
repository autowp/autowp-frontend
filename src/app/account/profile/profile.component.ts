import {HttpErrorResponse} from '@angular/common/http';
import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {environment} from '@environment/environment';
import {APIUser} from '@grpc/spec.pb';
import {APIImage, APIService} from '@services/api.service';
import {AuthService} from '@services/auth.service';
import {LanguageService} from '@services/language';
import {PageEnvService} from '@services/page-env.service';
import {TimezoneService} from '@services/timezone';
import {APIUser as RESTAPIUser} from '@services/user';
import {InvalidParams} from '@utils/invalid-params.pipe';
import {KeycloakService} from 'keycloak-angular';
import {EMPTY, Subscription, of} from 'rxjs';
import {catchError, switchMap, tap} from 'rxjs/operators';

import {ToastsService} from '../../toasts/toasts.service';

@Component({
  selector: 'app-account-profile',
  templateUrl: './profile.component.html',
})
export class AccountProfileComponent implements OnInit, OnDestroy {
  protected user: APIUser;

  protected readonly settings: {language: null | string; timezone: null | string} = {
    language: null,
    timezone: null,
  };
  protected settingsInvalidParams: InvalidParams = {};
  protected photoInvalidParams: InvalidParams = {};
  protected votesPerDay: number = 0;
  protected votesLeft: number = 0;
  protected photo: APIImage | null;
  private sub: Subscription;

  @ViewChild('input') input;

  protected readonly changeProfileUrl =
    environment.keycloak.url.replace(/\/$/g, '') + '/realms/' + environment.keycloak.realm + '/account/#/personal-info';

  protected readonly timezones$ = this.timezone.getTimezones$();

  protected readonly languages: {name: string; value: string}[] = environment.languages.map((language) => ({
    name: language.name,
    value: language.code,
  }));

  constructor(
    private readonly api: APIService,
    private readonly languageService: LanguageService,
    private readonly keycloak: KeycloakService,
    private readonly auth: AuthService,
    private readonly pageEnv: PageEnvService,
    private readonly timezone: TimezoneService,
    private readonly toastService: ToastsService,
  ) {}

  ngOnInit(): void {
    setTimeout(() => this.pageEnv.set({pageId: 129}), 0);

    this.sub = this.auth
      .getUser$()
      .pipe(
        switchMap((user) => {
          if (!user) {
            this.keycloak.login({
              locale: this.languageService.language,
              redirectUri: window.location.href,
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
          }),
        ),
        catchError((response: unknown) => {
          this.toastService.handleError(response);
          return EMPTY;
        }),
      )
      .subscribe((user) => {
        this.settings.timezone = user.timezone;
        this.settings.language = user.language;
        this.votesPerDay = user.votes_per_day || 0;
        this.votesLeft = user.votes_left || 0;
        this.photo = user.img;
      });
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  private showSavedMessage() {
    this.toastService.success($localize`Data saved`);
  }

  protected sendSettings() {
    this.settingsInvalidParams = {};

    this.api.request<void>('PUT', 'user/me', {body: this.settings}).subscribe({
      error: (response: unknown) => {
        if (response instanceof HttpErrorResponse && response.status === 400) {
          this.settingsInvalidParams = response.error.invalid_params;
        } else {
          this.toastService.handleError(response);
        }
      },
      next: () => {
        this.showSavedMessage();
      },
    });
  }

  /*protected  showFileSelectDialog() {
    this.photoInvalidParams = {};
    this.fileInput.nativeElement.click();
  }*/

  protected resetPhoto() {
    this.api.request('DELETE', 'user/me/photo').subscribe({
      error: (response: unknown) => this.toastService.handleError(response),
      next: () => {
        this.user.avatar = undefined;
        this.photo = null;
      },
    });
  }

  protected onChange(event: Event) {
    const files = [].slice.call((event.target as HTMLInputElement).files);
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
          }),
        ),
        catchError((response: unknown) => {
          this.toastService.handleError(response);
          return EMPTY;
        }),
        tap((response) => {
          this.photo = response.img;
        }),
      )
      .subscribe();
  }
}
