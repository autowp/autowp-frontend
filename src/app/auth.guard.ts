import {isPlatformBrowser} from '@angular/common';
import {inject, PLATFORM_ID} from '@angular/core';
import {CanActivateFn} from '@angular/router';
import {AuthService} from '@services/auth.service';
import {LanguageService} from '@services/language';
import {KeycloakService} from 'keycloak-angular';
import {map} from 'rxjs/operators';

export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const keycloak = inject(KeycloakService);
  const language = inject(LanguageService);
  const platform = inject(PLATFORM_ID);

  return auth.getUser$().pipe(
    map((user) => {
      if (!user) {
        if (isPlatformBrowser(platform)) {
          keycloak.login({
            locale: language.language,
            redirectUri: window.location.href,
          });
        }
        return false;
      }
      return true;
    }),
  );
};
