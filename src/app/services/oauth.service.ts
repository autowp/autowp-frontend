import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

interface TokenResponse {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  token_type: string;
}

@Injectable()
export class OAuthService {
  constructor(private http: HttpClient) { }

  private setToken(response: TokenResponse) {
    if (localStorage) {
      if (response.access_token) {
        localStorage.setItem('access_token', response.access_token);
      } else {
        localStorage.removeItem('access_token');
      }
      if (response.refresh_token) {
        localStorage.setItem('refresh_token', response.refresh_token);
      } else {
        localStorage.removeItem('refresh_token');
      }
      if (response.expires_in) {
        const validUntil = new Date();
        validUntil.setSeconds(validUntil.getSeconds() + response.expires_in / 0.9);
        localStorage.setItem('valid_until', validUntil.getTime().toString());
      } else {
        localStorage.removeItem('valid_until');
      }
    }
  }

  public login(
    username: string,
    password: string
  ): Observable<boolean> {
    return this.http
      .request<TokenResponse>('GET', '/oauth/token', {
        params: {
          grant_type: 'password',
          username: username,
          password: password
        },
        observe: 'response'
      })
      .pipe(
        map(response => {
          this.setToken(response.body);

          return true;
        }),
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            return of(false);
          }
          return throwError(error);
        })
      );
  }

  public signOut(): Observable<boolean> {
    if (localStorage) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('valid_until');
    }

    return of(true);
  }

  public getAccessToken(): Observable<string|null> {

    if (! localStorage) {
      return of(null);
    }

    const accessToken = localStorage.getItem('access_token');
    const validUntil = new Date(parseInt(localStorage.getItem('valid_until'), 10));

    if (! accessToken) {
      return of(null);
    }

    const isExpires = new Date() > validUntil;
    if (! isExpires) {
      return of(accessToken);
    }

    localStorage.removeItem('access_token');

    const refreshToken = localStorage.getItem('refresh_token');
    if (! refreshToken) {
      return of(null);
    }

    return this.http
      .request<TokenResponse>('GET', '/oauth/token', {
        params: {
          grant_type: 'refresh_token',
          refresh_token: refreshToken
        }
      })
      .pipe(
        catchError((response: HttpErrorResponse) => {
          if (response.status === 401) {
            localStorage.removeItem('refresh_token');
            localStorage.removeItem('valid_until');
            return of(null);
          }
          return throwError(response);
        }),
        map(token => {
          if (!token) {
            return null;
          }
          this.setToken(token);
          return token.access_token;
        })
      );
  }
}
