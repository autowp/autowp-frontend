import {
  Component,
  OnInit,
  OnDestroy, ViewChild
} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { PageEnvService } from '../../services/page-env.service';
import {combineLatest, EMPTY, of, Subscription} from 'rxjs';
import {switchMapTo, switchMap, catchError, tap} from 'rxjs/operators';
import { TimezoneService } from '../../services/timezone';
import {ToastsService} from '../../toasts/toasts.service';
import {APIImage, APIService} from '../../services/api.service';
import {HttpErrorResponse} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {APIUser} from '../../../../generated/spec.pb';
import { APIUser as RESTAPIUser } from '../../services/user';

@Component({
  selector: 'app-account-profile',
  templateUrl: './profile.component.html'
})
export class AccountProfileComponent implements OnInit, OnDestroy {
  public user: APIUser;

  public settings = {
    timezone: null,
    language: null
  };
  public settingsInvalidParams: any = {};
  public photoInvalidParams: any = {};
  public votesPerDay: number | null = null;
  public votesLeft: number | null = null;
  public photo: APIImage;
  public timezones: string[];
  public languages: { name: string; value: string }[];
  private sub: Subscription;

  @ViewChild('input') input;

  public changeProfileUrl = environment.keycloak.url.replace(/\/$/g, '') + '/realms/' + environment.keycloak.realm + '/account/#/personal-info';

  constructor(
    private api: APIService,
    private router: Router,
    private auth: AuthService,
    private pageEnv: PageEnvService,
    private timezone: TimezoneService,
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
          nameTranslated: $localize `Profile`,
          pageId: 129
        }),
      0
    );

    this.languages = environment.languages.map(language => ({
      name: language.name,
      value: language.code
    }));

    this.sub = this.auth
      .getUser()
      .pipe(
        switchMap(user => {
          if (!user) {
            this.router.navigate(['/login']);
            return EMPTY;
          }

          this.user = user;

          return of(user);
        }),
        switchMapTo(
          combineLatest(
            [
              this.api.request<RESTAPIUser>('GET', 'user/me', {
                params: {
                  fields: 'name,timezone,language,votes_per_day,votes_left,img'
                }
              }),
              this.timezone.getTimezones()
            ]
          )
        ),
      )
      .subscribe(
        ([user, timezones]) => {
          this.settings.timezone = user.timezone;
          this.settings.language = user.language;
          this.votesPerDay = user.votes_per_day;
          this.votesLeft = user.votes_left;
          this.photo = user.img;

          this.timezones = timezones;
        },
        response => this.toastService.response(response)
      );
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  private showSavedMessage() {
    this.toastService.success($localize `Data saved`);
  }

  public sendSettings() {
    this.settingsInvalidParams = {};

    this.api.request<void>('PUT', 'user/me', {body: this.settings}).subscribe(
      () => {
        this.showSavedMessage();
      },
      response => {
        if (response.status === 400) {
          this.settingsInvalidParams = response.error.invalid_params;
        } else {
          this.toastService.response(response);
        }
      }
    );
  }

  /*public showFileSelectDialog() {
    this.photoInvalidParams = {};
    this.fileInput.nativeElement.click();
  }*/

  public resetPhoto() {
    this.api.request('DELETE', 'user/me/photo').subscribe(
      () => {
        this.user.avatar = null;
        this.photo = null;
      },
      response => this.toastService.response(response)
    );
  }

  public onChange(event: any) {
    const files = [].slice.call(event.target.files);
    if (files.length <= 0) {
      return;
    }

    const file = files[0];

    const formData: FormData = new FormData();
    formData.append('file', file);

    return this.api.request('POST', 'user/me/photo', {body: formData}).pipe(
      catchError((response: HttpErrorResponse) => {
        this.input.nativeElement.value = '';
        if (response.status === 400) {
          this.photoInvalidParams = response.error.invalid_params;
          return EMPTY;
        }

        this.toastService.errorResponse(response);
        return EMPTY;
      }),
      tap(() => {
        this.input.nativeElement.value = '';
      }),
      switchMap(() => this.api.request<RESTAPIUser>('GET', 'user/me', {
        params: {
          fields: 'img'
        }
      })),
      catchError((response: HttpErrorResponse) => {
        this.toastService.errorResponse(response);
        return EMPTY;
      }),
      tap(response => {
        this.photo = response.img;
      })
    ).subscribe();
  }
}
