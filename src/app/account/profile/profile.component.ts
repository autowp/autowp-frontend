import {AsyncPipe} from '@angular/common';
import {HttpErrorResponse} from '@angular/common/http';
import {Component, ElementRef, inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {environment} from '@environment/environment';
import {APIImage, APIMeRequest, APIUser, UserFields} from '@grpc/spec.pb';
import {UsersClient} from '@grpc/spec.pbsc';
import {APIService} from '@services/api.service';
import {AuthService} from '@services/auth.service';
import {LanguageService} from '@services/language';
import {PageEnvService} from '@services/page-env.service';
import {TimezoneService} from '@services/timezone';
import {InvalidParams, InvalidParamsPipe} from '@utils/invalid-params.pipe';
import {MarkdownComponent} from '@utils/markdown/markdown.component';
import Keycloak from 'keycloak-js';
import {EMPTY, of, Subscription} from 'rxjs';
import {catchError, switchMap, tap} from 'rxjs/operators';

import {ToastsService} from '../../toasts/toasts.service';

@Component({
  imports: [MarkdownComponent, FormsModule, AsyncPipe, InvalidParamsPipe],
  selector: 'app-account-profile',
  templateUrl: './profile.component.html',
})
export class AccountProfileComponent implements OnDestroy, OnInit {
  readonly #api = inject(APIService);
  readonly #languageService = inject(LanguageService);
  readonly #keycloak = inject(Keycloak);
  readonly #auth = inject(AuthService);
  readonly #pageEnv = inject(PageEnvService);
  readonly #timezone = inject(TimezoneService);
  readonly #toastService = inject(ToastsService);
  readonly #usersClient = inject(UsersClient);

  protected user?: APIUser;

  protected readonly settings: {language: null | string; timezone: null | string} = {
    language: null,
    timezone: null,
  };
  protected settingsInvalidParams: InvalidParams = {};
  protected photoInvalidParams: InvalidParams = {};
  protected votesPerDay: number = 0;
  protected votesLeft: number = 0;
  protected photo: APIImage | undefined = undefined;
  #sub?: Subscription;

  @ViewChild('input') input?: ElementRef;

  protected readonly changeProfileUrl =
    environment.keycloak.url.replace(/\/$/g, '') + '/realms/' + environment.keycloak.realm + '/account/#/personal-info';

  protected readonly timezones$ = this.#timezone.getTimezones$();

  protected readonly languages: {name: string; value: string}[] = environment.languages.map((language) => ({
    name: language.name,
    value: language.code,
  }));

  ngOnInit(): void {
    setTimeout(() => this.#pageEnv.set({pageId: 129}), 0);

    this.#sub = this.#auth
      .getUser$()
      .pipe(
        switchMap((user) => {
          if (!user) {
            this.#keycloak.login({
              locale: this.#languageService.language,
              redirectUri: window.location.href,
            });
            return EMPTY;
          }

          this.user = user;

          return of(user);
        }),
        switchMap(() =>
          this.#usersClient.me(
            new APIMeRequest({
              fields: new UserFields({
                img: true,
                language: true,
                timezone: true,
                votesLeft: true,
                votesPerDay: true,
              }),
            }),
          ),
        ),
        catchError((response: unknown) => {
          this.#toastService.handleError(response);
          return EMPTY;
        }),
      )
      .subscribe((user) => {
        this.settings.timezone = user.timezone;
        this.settings.language = user.language;
        this.votesPerDay = +user.votesPerDay || 0;
        this.votesLeft = +user.votesLeft || 0;
        this.photo = user.img;
      });
  }
  ngOnDestroy(): void {
    if (this.#sub) {
      this.#sub.unsubscribe();
    }
  }

  private showSavedMessage() {
    this.#toastService.success($localize`Data saved`);
  }

  protected sendSettings() {
    this.settingsInvalidParams = {};

    this.#api.request$<void>('PUT', 'user/me', {body: this.settings}).subscribe({
      error: (response: unknown) => {
        if (response instanceof HttpErrorResponse && response.status === 400) {
          this.settingsInvalidParams = response.error.invalid_params;
        } else {
          this.#toastService.handleError(response);
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
    this.#api.request$('DELETE', 'user/me/photo').subscribe({
      error: (response: unknown) => this.#toastService.handleError(response),
      next: () => {
        if (this.user) {
          this.user.avatar = undefined;
        }
        this.photo = undefined;
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

    return this.#api
      .request$('POST', 'user/me/photo', {body: formData})
      .pipe(
        catchError((response: unknown) => {
          if (this.input) {
            this.input.nativeElement.value = '';
          }
          if (response instanceof HttpErrorResponse && response.status === 400) {
            this.photoInvalidParams = response.error.invalid_params;
            return EMPTY;
          }

          this.#toastService.handleError(response);
          return EMPTY;
        }),
        tap(() => {
          if (this.input) {
            this.input.nativeElement.value = '';
          }
        }),
        switchMap(() => this.#usersClient.me(new APIMeRequest({fields: new UserFields({img: true})}))),
        catchError((response: unknown) => {
          this.#toastService.handleError(response);
          return EMPTY;
        }),
        tap((response) => {
          this.photo = response.img;
        }),
      )
      .subscribe();
  }
}
