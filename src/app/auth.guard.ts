import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from './services/auth.service';
import {map} from 'rxjs/operators';
import {LanguageService} from './services/language';
import {KeycloakService} from 'keycloak-angular';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private languageService: LanguageService,
    private keycloak: KeycloakService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.getUser$().pipe(
      map((user) => {
        if (!user) {
          this.keycloak.login({
            redirectUri: window.location.href,
            locale: this.languageService.language,
          });
          return false;
        }
        return true;
      })
    );
  }
}
