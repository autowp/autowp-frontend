import {DecimalPipe} from '@angular/common';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {APP_INITIALIZER, ApplicationConfig, enableProdMode, importProvidersFrom} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {provideAnimations} from '@angular/platform-browser/animations';
import {provideRouter, withInMemoryScrolling} from '@angular/router';
import {environment} from '@environment/environment';
import {NgbCollapseModule, NgbDropdownModule, NgbModule, NgbTooltipModule} from '@ng-bootstrap/ng-bootstrap';
import {GRPC_INTERCEPTORS, GrpcCoreModule} from '@ngx-grpc/core';
import {GrpcWebClientModule} from '@ngx-grpc/grpc-web-client';
import {ACLService, APIACL} from '@services/acl.service';
import {APIService, authInterceptor$, GrpcAuthInterceptor, GrpcLogInterceptor} from '@services/api.service';
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
import {Angulartics2Module} from 'angulartics2';
import {KeycloakAngularModule, KeycloakEventType, KeycloakService} from 'keycloak-angular';
import {NgPipesModule} from 'ngx-pipes';

import {routes} from './app.routes';

function bindTokenUpdate(keycloak: KeycloakService): void {
  keycloak.keycloakEvents$.subscribe({
    next: (e) => {
      if (e.type == KeycloakEventType.OnTokenExpired) {
        keycloak.updateToken().catch((error) => {
          console.error('Failed to refresh token', error);
        });
      }
    },
  });
}

function initializeKeycloak(keycloak: KeycloakService) {
  return () => {
    return new Promise((resolve, reject) => {
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
          bindTokenUpdate(keycloak);

          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
}

if (environment.production) {
  enableProdMode();
}

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(
      BrowserModule,
      FormsModule,
      NgPipesModule,
      KeycloakAngularModule,
      NgbTooltipModule,
      NgbCollapseModule,
      NgbDropdownModule,
      GrpcCoreModule.forRoot(),
      GrpcWebClientModule.forRoot({
        settings: {host: environment.grpcHost},
      }),
      Angulartics2Module.forRoot(),
      NgbModule,
    ),
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
    provideRouter(
      routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled',
      }),
    ),
    provideHttpClient(withInterceptors([authInterceptor$])),
    provideAnimations(),
  ],
};
