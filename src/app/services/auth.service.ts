import {Injectable} from '@angular/core';
import {APIMeRequest, APIUser} from '@grpc/spec.pb';
import {UsersClient} from '@grpc/spec.pbsc';
import {KeycloakService} from 'keycloak-angular';
import {Observable, ReplaySubject, from, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';

@Injectable()
export class AuthService {
  private user$ = new ReplaySubject<APIUser>(1);

  constructor(
    private readonly keycloak: KeycloakService,
    private readonly usersClient: UsersClient,
  ) {
    this.keycloak.getToken().then(
      (accessToken) => {
        if (accessToken) {
          this.loadMe$().subscribe();
        } else {
          this.setUser(null);
        }
      },
      (error) => {
        console.log('ERROR', error);
        this.setUser(null);
      },
    );
  }

  private setUser(value: APIUser) {
    // Sentry.configureScope((scope) => {
    //   scope.setUser(
    //     value
    //       ? {
    //           id: value.id,
    //           username: value.name,
    //         }
    //       : null,
    //   );
    // });

    this.user$.next(value);
  }

  public getUser$(): Observable<APIUser> {
    return this.user$;
  }

  public signOut$(): Observable<void> {
    return from(this.keycloak.logout(window.location.href)).pipe(tap(() => this.setUser(null)));
  }

  public loadMe$(): Observable<APIUser> {
    return this.usersClient.me(new APIMeRequest({})).pipe(
      catchError(() => {
        this.setUser(null);
        return of(null);
      }),
      tap((user) => this.setUser(user)),
    );
  }
}
