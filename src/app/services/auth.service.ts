import {isPlatformBrowser} from '@angular/common';
import {inject, Injectable, PLATFORM_ID} from '@angular/core';
import {APIMeRequest, APIUser} from '@grpc/spec.pb';
import {UsersClient} from '@grpc/spec.pbsc';
import {KeycloakService} from 'keycloak-angular';
import {EMPTY, from, Observable, of, ReplaySubject} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly keycloak = inject(KeycloakService);
  private readonly usersClient = inject(UsersClient);
  private readonly platform = inject(PLATFORM_ID);

  private user$ = new ReplaySubject<APIUser | null>(1);

  constructor() {
    if (!isPlatformBrowser(this.platform)) {
      this.setUser(null);
      return;
    }

    this.keycloak.getToken().then(
      (accessToken) => {
        if (accessToken) {
          this.loadMe$().subscribe();
        } else {
          this.setUser(null);
        }
      },
      (error) => {
        console.error(error);
        this.setUser(null);
      },
    );
  }

  private setUser(value: APIUser | null) {
    this.user$.next(value);
  }

  public getUser$(): Observable<APIUser | null> {
    return this.user$;
  }

  public signOut$(): Observable<void> {
    if (!isPlatformBrowser(this.platform)) {
      return EMPTY;
    }
    return from(this.keycloak.logout(window.location.href)).pipe(tap(() => this.setUser(null)));
  }

  public loadMe$(): Observable<APIUser | null> {
    return this.usersClient.me(new APIMeRequest({})).pipe(
      catchError(() => {
        this.setUser(null);
        return of(null);
      }),
      tap((user) => this.setUser(user)),
    );
  }
}
