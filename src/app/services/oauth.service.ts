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
  private accessToken: string;
  private refreshToken: string;
  private validUntil: Date;
  public restored = false;

  constructor(private http: HttpClient) {
    this.restoreFromStorage();
  }

  private setToken(response: TokenResponse) {
    this.accessToken = response.access_token;
    this.refreshToken = response.refresh_token;
    const validUntil = new Date();
    validUntil.setSeconds(validUntil.getSeconds() + response.expires_in / 0.9);
    this.validUntil = validUntil;
    this.saveToStorage();
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
    this.accessToken = null;
    this.refreshToken = null;
    this.validUntil = null;

    this.saveToStorage();

    return of(true);
  }

  public restoreFromStorage() {
    this.accessToken = localStorage.getItem('access_token');
    this.refreshToken = localStorage.getItem('refresh_token');
    this.validUntil = new Date(parseInt(localStorage.getItem('valid_until'), 10));
    this.restored = true;
  }

  private saveToStorage() {
    if (this.accessToken) {
      localStorage.setItem('access_token', this.accessToken);
    } else {
      localStorage.removeItem('access_token');
    }
    if (this.refreshToken) {
      localStorage.setItem('refresh_token', this.refreshToken);
    } else {
      localStorage.removeItem('refresh_token');
    }
    if (this.validUntil) {
      localStorage.setItem('valid_until', this.validUntil.getTime().toString());
    } else {
      localStorage.removeItem('valid_until');
    }
  }

  public getAccessToken(): Observable<string|null> {

    if (! this.restored) {
      this.restoreFromStorage();
    }

    if (! this.accessToken) {
      return of(null);
    }

    const isExpires = new Date() > this.validUntil;

    if (! isExpires) {
      return of(this.accessToken);
    }

    this.accessToken = null;

    if (! this.refreshToken) {
      return of(null);
    }

    return this.http
      .request<TokenResponse>('GET', '/oauth/token', {
        params: {
          grant_type: 'refresh_token',
          refresh_token: this.refreshToken
        },
        observe: 'response'
      })
      .pipe(
        catchError((response: HttpErrorResponse) => {
          if (response.status === 401) {
            this.accessToken = null;
            this.refreshToken = null;
            this.validUntil = null;
            this.saveToStorage();
            return of(null);
          }
          return throwError(response);
        }),
        map(response => {
          if (!response) {
            return null;
          }
          this.setToken(response.body);
          return response.body.access_token;
        })
      );
  }
}
