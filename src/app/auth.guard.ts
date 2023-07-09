import {inject} from '@angular/core';
import {CanActivateFn} from '@angular/router';
import {AuthService} from '@services/auth.service';
import {map} from 'rxjs/operators';
import {LanguageService} from '@services/language';
import {KeycloakService} from 'keycloak-angular';

export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const keycloak = inject(KeycloakService);
  const language = inject(LanguageService);

  return auth.getUser$().pipe(
    map((user) => {
      if (!user) {
        keycloak.login({
          redirectUri: window.location.href,
          locale: language.language,
        });
        return false;
      }
      return true;
    })
  );
};
