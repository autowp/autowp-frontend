import { Injectable } from '@angular/core';
import {from, Observable, of, ReplaySubject} from 'rxjs';
import { tap, catchError} from 'rxjs/operators';
import {KeycloakService} from 'keycloak-angular';
import {UsersClient} from '../../../generated/spec.pbsc';
import {APIMeRequest, APIUser} from '../../../generated/spec.pb';

@Injectable()
export class AuthService {
  private user$ = new ReplaySubject<APIUser>(1);

  constructor(private keycloak: KeycloakService, private usersClient: UsersClient) {
    this.keycloak.getToken().then(accessToken => {
      if (accessToken) {
        this.loadMe().subscribe();
      } else {
        this.setUser(null);
      }
    }, error => {
      console.log('ERROR', error);
      this.setUser(null);
    });
  }

  private setUser(value: APIUser) {
    this.user$.next(value);
  }

  public getUser(): Observable<APIUser> {
    return this.user$;
  }

  public signOut(): Observable<void> {
    return from(this.keycloak.logout(window.location.href)).pipe(
      tap(() => this.setUser(null))
    );
  }

  public loadMe(): Observable<APIUser> {
    return this.usersClient.me(new APIMeRequest({})).pipe(
      catchError(() => {
        this.setUser(null);
        return of(null);
      }),
      tap(user => this.setUser(user))
    );
  }
}
