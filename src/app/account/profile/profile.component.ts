import {
  Component,
  Injectable,
  OnInit,
  OnDestroy, ViewChild
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { APIUser } from '../../services/user';
import { PageEnvService } from '../../services/page-env.service';
import {combineLatest, EMPTY, of, Subscription} from 'rxjs';
import {switchMapTo, switchMap, map, catchError, tap} from 'rxjs/operators';
import { TimezoneService } from '../../services/timezone';
import {ToastsService} from '../../toasts/toasts.service';
import {APIImage, APIService} from '../../services/api.service';
import {HttpErrorResponse} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-account-profile',
  templateUrl: './profile.component.html'
})
@Injectable()
export class AccountProfileComponent implements OnInit, OnDestroy {
  private user: APIUser;
  public profile = {
    name: null
  };
  public profileInvalidParams: any = {};
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

  constructor(
    private translate: TranslateService,
    private api: APIService,
    private router: Router,
    private auth: AuthService,
    private pageEnv: PageEnvService,
    private timezone: TimezoneService,
    private toastService: ToastsService
  ) {
  }

  ngOnInit(): void {

    setTimeout(
      () =>
        this.pageEnv.set({
          layout: {
            needRight: false
          },
          name: 'page/129/name',
          pageId: 129
        }),
      0
    );

    this.languages = [];
    for (const language of environment.languages) {
      this.languages.push({
        name: language.name,
        value: language.code
      });
    }

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
              this.api.request<APIUser>('GET', 'user/me', {
                params: {
                  fields: 'name,timezone,language,votes_per_day,votes_left,img'
                }
              }),
              this.timezone.getTimezones()
            ]
          )
        ),
        map(data => ({ user: data[0], timezones: data[1] }))
      )
      .subscribe(
        data => {
          this.profile.name = data.user.name;
          this.settings.timezone = data.user.timezone;
          this.settings.language = data.user.language;
          this.votesPerDay = data.user.votes_per_day;
          this.votesLeft = data.user.votes_left;
          this.photo = data.user.img;

          this.timezones = data.timezones;
        },
        response => this.toastService.response(response)
      );
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  private showSavedMessage() {
    this.translate
      .get('account/profile/saved')
      .subscribe((translation: string) => this.toastService.success(translation));
  }

  public sendProfile() {
    this.profileInvalidParams = {};

    this.api.request<void>('PUT', 'user/me', {body: this.profile}).subscribe(
      () => {
        this.user.name = this.profile.name;

        this.showSavedMessage();
      },
      response => {
        if (response.status === 400) {
          this.profileInvalidParams = response.error.invalid_params;
        } else {
          this.toastService.response(response);
        }
      }
    );
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
      switchMap(() => this.api.request<APIUser>('GET', 'user/me', {
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
