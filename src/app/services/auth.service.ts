import {inject, Injectable} from '@angular/core';
import {APIMeRequest, APIUser} from '@grpc/spec.pb';
import {UsersClient} from '@grpc/spec.pbsc';
import {from, Observable, of, ReplaySubject} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import Keycloak from 'keycloak-js';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly keycloak = inject(Keycloak);
  private readonly usersClient = inject(UsersClient);

  private readonly user$ = new ReplaySubject<APIUser | null>(1);

  constructor() {
    this.init();
  }

  public init() {
    if (this.keycloak.token) {
      this.loadMe$().subscribe();
    } else {
      this.setUser(null);
    }
  }

  private setUser(value: APIUser | null) {
    this.user$.next(value);
  }

  public getUser$(): Observable<APIUser | null> {
    return this.user$;
  }

  public signOut$(): Observable<void> {
    return from(this.keycloak.logout({redirectUri: window.location.href})).pipe(tap(() => this.setUser(null)));
  }

  private loadMe$(): Observable<APIUser | null> {
    return this.usersClient.me(new APIMeRequest({})).pipe(
      catchError(() => {
        this.setUser(null);
        return of(null);
      }),
      tap((user) => this.setUser(user)),
    );
  }
}
