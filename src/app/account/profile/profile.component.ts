import {
  Component,
  Injectable,
  ViewChild,
  ElementRef,
  OnInit,
  OnDestroy
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { APIUser } from '../../services/user';
import { FileUploader, FileItem, ParsedResponseHeaders } from 'ng2-file-upload';
import { PageEnvService } from '../../services/page-env.service';
import {combineLatest, EMPTY, of, Subscription} from 'rxjs';
import {switchMapTo, switchMap, map} from 'rxjs/operators';
import { LanguageService } from '../../services/language';
import { TimezoneService } from '../../services/timezone';
import {ToastsService} from '../../toasts/toasts.service';

@Component({
  selector: 'app-account-profile',
  templateUrl: './profile.component.html'
})
@Injectable()
export class AccountProfileComponent implements OnInit, OnDestroy {
  @ViewChild('fileInput', { static: true }) fileInput: ElementRef;

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
  public photo: any;
  public timezones: string[];
  public languages: { name: string; value: string }[];
  public file: any;
  public uploader: FileUploader = new FileUploader({
    url: '/api/user/me/photo',
    autoUpload: true
  });
  sub: Subscription;

  constructor(
    private translate: TranslateService,
    private http: HttpClient,
    private router: Router,
    private auth: AuthService,
    private pageEnv: PageEnvService,
    private language: LanguageService,
    private timezone: TimezoneService,
    private toastService: ToastsService
  ) {
    this.uploader.onSuccessItem = () => {
      this.http
        .get<APIUser>('/api/user/me', {
          params: {
            fields: 'img'
          }
        })
        .subscribe(
          subresponse => {
            this.photo = subresponse.img;
          },
          subresponse => this.toastService.response(subresponse)
        );
    };

    this.uploader.onErrorItem = (
      item: FileItem,
      response: string,
      status: number,
      headers: ParsedResponseHeaders
    ) => {
      this.photoInvalidParams = JSON.parse(response).invalid_params;
    };

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
  }

  ngOnInit(): void {
    this.languages = [];
    for (const language of this.language.getLanguages()) {
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
            this.router.navigate(['/signin']);
            return EMPTY;
          }

          this.user = user;

          return of(user);
        }),
        switchMapTo(
          combineLatest(
            [
              this.http.get<APIUser>('/api/user/me', {
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

    this.http.put<void>('/api/user/me', this.profile).subscribe(
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

    this.http.put<void>('/api/user/me', this.settings).subscribe(
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

  public showFileSelectDialog() {
    this.photoInvalidParams = {};
    this.fileInput.nativeElement.click();
  }

  public resetPhoto() {
    this.http.delete('/api/user/me/photo').subscribe(
      () => {
        this.user.avatar = null;
        this.photo = null;
      },
      response => this.toastService.response(response)
    );
  }

  public onChange(event: any) {
    console.log([].slice.call(event.target.files));
  }
}
