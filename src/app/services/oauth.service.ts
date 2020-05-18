import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

export interface TokenResponse {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  token_type: string;
}

type ExternalLoginService = {
  id: string;
  name: string;
  icon: string;
  color: string;
};

export const externalLoginServices: ExternalLoginService[] = [
  {
    id: 'facebook',
    name: 'Facebook',
    icon: 'fa-facebook',
    color: '#3b5998',
  },
  {
    id: 'vk',
    name: 'VK',
    icon: 'fa-vk',
    color: '#43648c',
  },
  {
    id: 'google-plus',
    name: 'Google+',
    icon: 'fa-google',
    color: '#dd4b39',
  },
  /*{
    id: 'twitter',
    name: 'Twitter',
    icon: 'fa-twitter',
    color: '#55acee',
  },
  {
    id: 'github',
    name: 'Github',
    icon: 'fa-github',
    color: '#000000',
  }*/
];

@Injectable()
export class OAuthService {
  constructor(private http: HttpClient) { }

  public setToken(response: TokenResponse) {
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
        validUntil.setSeconds(validUntil.getSeconds() + response.expires_in * 0.9);
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
      .request<TokenResponse>('POST', '/api/oauth/token', {
        body: {
          grant_type: 'password',
          username,
          password
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
      .request<TokenResponse>('POST', '/api/oauth/token', {
        body: {
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
          if (! token) {
            return null;
          }
          this.setToken(token);
          return token.access_token;
        })
      );
  }
}
