import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { APIUser } from './user';
import { switchMap, tap, map, catchError, shareReplay } from 'rxjs/operators';
import {OAuthService} from './oauth.service';
import {APIService} from './api.service';

@Injectable()
export class AuthService {
  private user$ = new BehaviorSubject<APIUser>(null);

  constructor(private api: APIService, private oauth: OAuthService) {
    this.oauth.getAccessToken().subscribe(accessToken => {
      if (accessToken) {
        this.loadMe().subscribe();
      }
    });
  }

  private setUser(value: APIUser) {
    this.user$.next(value);
  }

  public getUser(): Observable<APIUser> {
    return this.user$.pipe(
      shareReplay(1)
    );
  }

  public login(
    username: string,
    password: string
  ): Observable<boolean> {
    return this.oauth.login(username, password).pipe(
      switchMap(result => {
        if (! result) {
          return of(false);
        }
        return this.loadMe().pipe(
          map(() => result)
        );
      })
    );
  }

  public signOut(): Observable<boolean> {
    return this.oauth.signOut().pipe(
      tap(() => this.setUser(null))
    );
  }

  public loadMe(): Observable<APIUser> {
    return this.api.request<APIUser>('GET', 'user/me').pipe(
      catchError(() => of(null)),
      tap(user => this.setUser(user))
    );
  }
}
