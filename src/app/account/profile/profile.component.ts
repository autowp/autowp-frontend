import {AsyncPipe} from '@angular/common';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Component, ElementRef, inject, OnDestroy, OnInit, viewChild} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {environment} from '@environment/environment';
import {APIImage, APIMeRequest, APIUser, DeleteUserPhotoRequest, UpdateUserRequest, UserFields} from '@grpc/spec.pb';
import {UsersClient} from '@grpc/spec.pbsc';
import {GrpcStatusEvent} from '@ngx-grpc/common';
import {FieldMask} from '@ngx-grpc/well-known-types';
import {AuthService} from '@services/auth.service';
import {LanguageService} from '@services/language';
import {PageEnvService} from '@services/page-env.service';
import {TimezoneService} from '@services/timezone';
import {InvalidParams, InvalidParamsPipe} from '@utils/invalid-params.pipe';
import {MarkdownComponent} from '@utils/markdown/markdown.component';
import Keycloak from 'keycloak-js';
import {EMPTY, of, Subscription} from 'rxjs';
import {catchError, switchMap, tap} from 'rxjs/operators';

import {extractFieldViolations, fieldViolations2InvalidParams} from '../../grpc';
import {ToastsService} from '../../toasts/toasts.service';

@Component({
  imports: [MarkdownComponent, FormsModule, AsyncPipe, InvalidParamsPipe],
  selector: 'app-account-profile',
  templateUrl: './profile.component.html',
})
export class AccountProfileComponent implements OnDestroy, OnInit {
  readonly #http = inject(HttpClient);
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

  private readonly input = viewChild<ElementRef<HTMLInputElement>>('input');

  protected readonly changeProfileUrl =
    environment.keycloak.url.replace(/\/$/g, '') + '/realms/' + environment.keycloak.realm + '/account/#/personal-info';

  protected readonly timezones$ = this.#timezone.timezones$;

  protected readonly languages: {name: string; value: string}[] = environment.languages.map((language) => ({
    name: language.name,
    value: language.code,
  }));

  ngOnInit(): void {
    setTimeout(() => this.#pageEnv.set({pageId: 129}), 0);

    this.#sub = this.#auth.user$
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

  protected sendSettings(id: string) {
    this.settingsInvalidParams = {};

    this.#usersClient
      .updateUser(
        new UpdateUserRequest({
          updateMask: new FieldMask({paths: ['language', 'timezone']}),
          user: new APIUser({
            id,
            language: this.settings.language || undefined,
            timezone: this.settings.timezone || undefined,
          }),
        }),
      )
      .subscribe({
        error: (response: unknown) => {
          if (response instanceof GrpcStatusEvent) {
            const fieldViolations = extractFieldViolations(response);
            this.settingsInvalidParams = fieldViolations2InvalidParams(fieldViolations);
          } else {
            this.#toastService.handleError(response);
          }
        },
        next: () => {
          this.showSavedMessage();
        },
      });
  }

  protected resetPhoto(id: string) {
    this.#usersClient.deleteUserPhoto(new DeleteUserPhotoRequest({id})).subscribe({
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
    if (files.length <= 0 || !this.user) {
      return;
    }

    const file = files[0];

    const formData: FormData = new FormData();
    formData.append('photo', file);

    return this.#http
      .request('POST', '/api/user/' + this.user.id + '/photo', {body: formData})
      .pipe(
        catchError((response: unknown) => {
          const input = this.input();
          if (input) {
            input.nativeElement.value = '';
          }
          if (response instanceof HttpErrorResponse && response.status === 400) {
            this.photoInvalidParams = response.error.invalid_params;
            return EMPTY;
          }

          this.#toastService.handleError(response);
          return EMPTY;
        }),
        tap(() => {
          const input = this.input();
          if (input) {
            input.nativeElement.value = '';
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
