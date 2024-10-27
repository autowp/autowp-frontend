import {DecimalPipe, DOCUMENT, isPlatformServer} from '@angular/common';
import {HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptorsFromDi} from '@angular/common/http';
import {
  APP_INITIALIZER,
  ApplicationConfig,
  enableProdMode,
  importProvidersFrom,
  inject,
  PLATFORM_ID,
} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule, provideClientHydration} from '@angular/platform-browser';
import {provideAnimations} from '@angular/platform-browser/animations';
import {provideRouter} from '@angular/router';
import {environment} from '@environment/environment';
import {grpc} from '@improbable-eng/grpc-web';
import {NodeHttpTransport} from '@improbable-eng/grpc-web-node-http-transport';
import {NgbCollapseModule, NgbDropdownModule, NgbModule, NgbTooltipModule} from '@ng-bootstrap/ng-bootstrap';
import {GRPC_INTERCEPTORS, GrpcCoreModule} from '@ngx-grpc/core';
import {ImprobableEngGrpcWebClientModule} from '@ngx-grpc/improbable-eng-grpc-web-client';
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
import {Angulartics2Module} from 'angulartics2';
import {KeycloakAngularModule, KeycloakEventType, KeycloakService} from 'keycloak-angular';
import {NgPipesModule} from 'ngx-pipes';

import {routes} from './app.routes';

function initializeKeycloak(keycloak: KeycloakService) {
  const doc = inject(DOCUMENT);
  const platform = inject(PLATFORM_ID);

  if (isPlatformServer(platform)) {
    return () => {
      return null;
    };
  }

  return () => {
    return new Promise((resolve, reject) => {
      keycloak
        .init({
          config: environment.keycloak,
          enableBearerInterceptor: false,
          initOptions: {
            enableLogging: !environment.production,
            onLoad: 'check-sso',
            silentCheckSsoRedirectUri: doc.defaultView?.location.origin + '/assets/silent-check-sso.html',
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
    });
  };
}

if (environment.production) {
  enableProdMode();
}

const xhr = NodeHttpTransport();
// grpc.CrossBrowserHttpTransport({withCredentials: true});
grpc.setDefaultTransport(xhr);

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
      // GrpcWebClientModule.forRoot({
      //   settings: {host: environment.grpcHost},
      // }),
      ImprobableEngGrpcWebClientModule.forChild({
        settings: {
          host: environment.grpcHost,
          // we might want to use different transports as recommended by improbable-eng team
          // because websocket transport acts a bit differently and is intended for client streaming only
          transport: xhr,
          // or simply e.g.
          // transport: ws, // to configure all methods to use websockets
        },
      }),
      Angulartics2Module.forRoot(),
      NgbModule,
    ),
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
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi(), withFetch()),
    provideAnimations(),
    provideClientHydration(),
  ],
};
