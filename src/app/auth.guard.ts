import {inject} from '@angular/core';
import {CanActivateFn} from '@angular/router';
import {AuthService} from '@services/auth.service';
import {LanguageService} from '@services/language';
import {KeycloakService} from 'keycloak-angular';
import {map} from 'rxjs/operators';

export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const keycloak = inject(KeycloakService);
  const language = inject(LanguageService);

  return auth.getUser$().pipe(
    map((user) => {
      if (!user) {
        keycloak.login({
          locale: language.language,
          redirectUri: window.location.href,
        });
        return false;
      }
      return true;
    }),
  );
};
