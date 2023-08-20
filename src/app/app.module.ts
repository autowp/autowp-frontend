import {DecimalPipe} from '@angular/common';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {APP_INITIALIZER, ErrorHandler, NgModule, Provider} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {Router} from '@angular/router';
import {environment} from '@environment/environment';
import {NgbCollapseModule, NgbDropdownModule, NgbModule, NgbTooltipModule} from '@ng-bootstrap/ng-bootstrap';
import {GRPC_INTERCEPTORS, GrpcCoreModule} from '@ngx-grpc/core';
import {GrpcWebClientModule} from '@ngx-grpc/grpc-web-client';
import * as Sentry from '@sentry/angular-ivy';
import {ACLService, APIACL} from '@services/acl.service';
import {APIService, AuthInterceptor, GrpcAuthInterceptor, GrpcLogInterceptor} from '@services/api.service';
import {AuthService} from '@services/auth.service';
import {ContactsService} from '@services/contacts';
import {ContentLanguageService} from '@services/content-language';
import {IpService} from '@services/ip';
import {ItemService} from '@services/item';
import {ItemParentService} from '@services/item-parent';
import {LanguageService} from '@services/language';
import {MessageService} from '@services/message';
import {PageService} from '@services/page';
import {PageEnvService} from '@services/page-env.service';
import {PictureService} from '@services/picture';
import {PictureItemService} from '@services/picture-item';
import {PictureModerVoteService} from '@services/picture-moder-vote';
import {ReCaptchaService} from '@services/recaptcha';
import {SpecService} from '@services/spec';
import {TimezoneService} from '@services/timezone';
import {UserService} from '@services/user';
import {VehicleTypeService} from '@services/vehicle-type';
import {UtilsModule} from '@utils/utils.module';
import {Angulartics2Module} from 'angulartics2';
import {KeycloakAngularModule, KeycloakEventType, KeycloakService} from 'keycloak-angular';
import {NgPipesModule} from 'ngx-pipes';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {VehicleTypesModalComponent} from './components/vehicle-types-modal/vehicle-types-modal.component';
import {GlobalErrorHandler} from './global-error-handler';
import {IndexModule} from './index/index.module';
import {ItemModule} from './item/item.module';
import {LoginComponent} from './login/login.component';
import {MarkdownEditModule} from './markdown-edit/markdown-edit.module';
import {ModerMenuModule} from './moder/menu/menu.module';
import {PageNotFoundComponent} from './not-found.component';
import {PaginatorModule} from './paginator/paginator.module';
import {PictureModerVoteModule} from './picture-moder-vote/picture-moder-vote.module';
import {ThumbnailModule} from './thumbnail/thumbnail.module';
import {ToastsModule} from './toasts/toasts.module';
import {UserModule} from './user/user.module';
import {UsersOnlineComponent} from './users/online/online.component';

function initializeKeycloak(keycloak: KeycloakService) {
  return () => {
    return new Promise((resolve, reject) => {
      try {
        keycloak
          .init({
            config: environment.keycloak,
            enableBearerInterceptor: false,
            initOptions: {
              enableLogging: !environment.production,
              onLoad: 'check-sso',
              silentCheckSsoRedirectUri: window.location.origin + '/assets/silent-check-sso.html',
            },
            loadUserProfileAtStartUp: false,
          })
          .then((res) => {
            keycloak.keycloakEvents$.subscribe({
              next: (e) => {
                if (e.type == KeycloakEventType.OnTokenExpired) {
                  keycloak.updateToken().catch((error) => {
                    console.error('Failed to refresh token', error);
                  });
                }
              },
            });

            resolve(res);
          })
          .catch((error) => {
            reject(error);
          });
      } catch (error) {
        reject(error);
      }
    });
  };
}

const providers: Provider[] = [
  {multi: true, provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor},
  {multi: true, provide: GRPC_INTERCEPTORS, useClass: GrpcLogInterceptor},
  {multi: true, provide: GRPC_INTERCEPTORS, useClass: GrpcAuthInterceptor},
  {
    deps: [KeycloakService],
    multi: true,
    provide: APP_INITIALIZER,
    useFactory: initializeKeycloak,
  },
  APIService,
  APIACL,
  AuthService,
  ACLService,
  PictureService,
  ItemService,
  ReCaptchaService,
  ItemParentService,
  MessageService,
  PageService,
  UserService,
  DecimalPipe,
  PictureModerVoteService,
  VehicleTypeService,
  SpecService,
  PictureItemService,
  ContactsService,
  PageEnvService,
  ContentLanguageService,
  LanguageService,
  TimezoneService,
  IpService,
  {
    provide: ErrorHandler,
    useValue: Sentry.createErrorHandler({
      showDialog: true,
    }),
  },
  {
    deps: [Router],
    provide: Sentry.TraceService,
  },
  {
    deps: [Sentry.TraceService],
    multi: true,
    provide: APP_INITIALIZER,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    useFactory: () => () => {},
  },
];
if (environment.production) {
  providers.push({provide: ErrorHandler, useClass: GlobalErrorHandler});
}

@NgModule({
  bootstrap: [AppComponent],
  declarations: [AppComponent, PageNotFoundComponent, VehicleTypesModalComponent, UsersOnlineComponent, LoginComponent],
  imports: [
    PaginatorModule,
    UserModule,
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    NgPipesModule,
    BrowserAnimationsModule,
    UtilsModule,
    ThumbnailModule,
    MarkdownEditModule,
    PictureModerVoteModule,
    ItemModule,
    KeycloakAngularModule,
    ModerMenuModule,
    NgbTooltipModule,
    NgbCollapseModule,
    NgbDropdownModule,
    IndexModule,
    ToastsModule,
    GrpcCoreModule.forRoot(),
    GrpcWebClientModule.forRoot({
      settings: {host: environment.grpcHost},
    }),
    Angulartics2Module.forRoot(),
    NgbModule,
  ],
  providers: providers,
})
export class AppModule {}
