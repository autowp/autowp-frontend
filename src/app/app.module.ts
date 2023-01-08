import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, ErrorHandler, NgModule, Provider} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {MomentModule} from 'ngx-moment';
import {NgbTooltipModule, NgbCollapseModule, NgbDropdownModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgPipesModule, BytesPipe} from 'ngx-pipes';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppComponent} from './app.component';
import {PageNotFoundComponent} from './not-found.component';
import {AuthGuard} from './auth.guard';
import {APIService, AuthInterceptor, GrpcAuthInterceptor, GrpcLogInterceptor} from './services/api.service';
import {AuthService} from './services/auth.service';
import {ACLService, APIACL} from './services/acl.service';
import {PictureService} from './services/picture';
import {ItemService} from './services/item';
import {ReCaptchaService} from './services/recaptcha';
import {ItemParentService} from './services/item-parent';
import {ItemLanguageService} from './services/item-language';
import {MessageService} from './services/message';
import {PageService} from './services/page';
import {UserService} from './services/user';
import {DecimalPipe} from '@angular/common';
import {VehicleTypeService} from './services/vehicle-type';
import {SpecService} from './services/spec';
import {PictureItemService} from './services/picture-item';
import {ContactsService} from './services/contacts';
import {PageEnvService} from './services/page-env.service';
import {ContentLanguageService} from './services/content-language';
import {LanguageService} from './services/language';
import {VehicleTypesModalComponent} from './components/vehicle-types-modal/vehicle-types-modal.component';
import {TimezoneService} from './services/timezone';
import {UsersOnlineComponent} from './users/online/online.component';
import {AppRoutingModule} from './app-routing.module';
import {IpService} from './services/ip';
import {PaginatorModule} from './paginator/paginator.module';
import {UserModule} from './user/user.module';
import {UtilsModule} from './utils/utils.module';
import {ThumbnailModule} from './thumbnail/thumbnail.module';
import {MarkdownEditModule} from './markdown-edit/markdown-edit.module';
import {ItemModule} from './item/item.module';
import {PictureModerVoteModule} from './picture-moder-vote/picture-moder-vote.module';
import {PictureModerVoteService} from './services/picture-moder-vote';
import {ModerMenuModule} from './moder/menu/menu.module';
import {IndexModule} from './index/index.module';
import {ToastsModule} from './toasts/toasts.module';
import {environment} from '@environment/environment';
import {GlobalErrorHandler} from './global-error-handler';
import {Angulartics2Module} from 'angulartics2';
import {GRPC_INTERCEPTORS, GrpcCoreModule} from '@ngx-grpc/core';
import {GrpcWebClientModule} from '@ngx-grpc/grpc-web-client';
import {KeycloakAngularModule, KeycloakEventType, KeycloakService} from 'keycloak-angular';
import {LoginComponent} from './login/login.component';
// import * as Sentry from "@sentry/angular";
// import {Router} from '@angular/router';

function initializeKeycloak(keycloak: KeycloakService) {
  return () => {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await keycloak.init({
          config: environment.keycloak,
          enableBearerInterceptor: false,
          loadUserProfileAtStartUp: false,
          initOptions: {
            enableLogging: !environment.production,
            onLoad: 'check-sso',
            silentCheckSsoRedirectUri: window.location.origin + '/assets/silent-check-sso.html',
          },
        });

        keycloak.keycloakEvents$.subscribe({
          next: (e) => {
            if (e.type == KeycloakEventType.OnTokenExpired) {
              keycloak.updateToken().then(
                () => {},
                (error) => {
                  console.error('Failed to refresh token', error);
                }
              );
            }
          },
        });

        resolve(res);
      } catch (error) {
        reject(error);
      }
    });
  };
}

let providers: Provider[] = [
  {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
  {provide: GRPC_INTERCEPTORS, useClass: GrpcLogInterceptor, multi: true},
  {provide: GRPC_INTERCEPTORS, useClass: GrpcAuthInterceptor, multi: true},
  {
    provide: APP_INITIALIZER,
    useFactory: initializeKeycloak,
    multi: true,
    deps: [KeycloakService],
  },
  APIService,
  APIACL,
  AuthService,
  AuthGuard,
  ACLService,
  PictureService,
  ItemService,
  ReCaptchaService,
  ItemParentService,
  ItemLanguageService,
  MessageService,
  PageService,
  UserService,
  DecimalPipe,
  BytesPipe,
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
  /*{
    provide: ErrorHandler,
    useValue: Sentry.createErrorHandler({
      showDialog: true,
    }),
  },
  {
    provide: Sentry.TraceService,
    deps: [Router],
  },
  {
    provide: APP_INITIALIZER,
    useFactory: () => () => {},
    deps: [Sentry.TraceService],
    multi: true,
  },*/
];
if (environment.production) {
  providers.push({provide: ErrorHandler, useClass: GlobalErrorHandler});
}

@NgModule({
  declarations: [AppComponent, PageNotFoundComponent, VehicleTypesModalComponent, UsersOnlineComponent, LoginComponent],
  imports: [
    PaginatorModule,
    UserModule,
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    MomentModule,
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
  bootstrap: [AppComponent],
})
export class AppModule {}
