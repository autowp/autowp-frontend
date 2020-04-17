import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpResponse, HttpEvent, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import { environment } from '../../environments/environment';
import {OAuthService} from './oauth.service';
import {catchError, switchMap} from 'rxjs/operators';
import {ToastsService} from '../toasts/toasts.service';

export interface APIItemParentLanguageGetResponse {
  items: APIItemParentLanguage[];
}

export interface APIItemParentLanguage {
  language: string;
  name: string;
}

export interface APIItemVehicleType {
  vehicle_type_id: number;
}

export interface APIItemVehicleTypeGetResponse {
  items: APIItemVehicleType[];
}

export interface APIImage {
  src: string;
  width: number;
  height: number;
}

export interface APIPaginator {
  pageCount: number;
  itemCountPerPage: number;
  first: number;
  current: number;
  last: number;
  next: number;
  previous: number;
  pagesInRange: { [key: number]: number };
  firstPageInRange: number;
  lastPageInRange: number;
  currentItemCount: number;
  totalItemCount: number;
  firstItemNumber: number;
  lastItemNumber: number;
}

export interface APIPerspective {
  id: number;
  name: string;
}

export interface APIPerspectiveGroup {
  id: number;
  name: string;
  perspectives: APIPerspective[];
}

export interface APIPerspectivePage {
  id: number;
  name: string;
  groups: APIPerspectiveGroup[];
}

export interface APIPerspectivePageGetResponse {
  items: APIPerspectivePage[];
}

export interface APILoginStartPostResponse {
  url: string;
}

declare type HttpObserve = 'body' | 'events' | 'response';

@Injectable()
export class APIService {
  constructor(private http: HttpClient, private oauth: OAuthService, private toasts: ToastsService) {}

  /**
   * Constructs a request that interprets the body as a text string and
   * returns a string value.
   *
   * @param method  The HTTP method.
   * @param url     The endpoint URL.
   * @param options The HTTP options to send with the request.
   *
   * @return An `Observable` of the response, with the response body of type string.
   */
  request(method: string, url: string, options: {
      body?: any;
      headers?: HttpHeaders | {
          [header: string]: string | string[];
      };
      observe?: 'body';
      params?: HttpParams | {
          [param: string]: string | string[];
      };
      reportProgress?: boolean;
      responseType: 'text';
      withCredentials?: boolean;
  }): Observable<string>;

  /**
   * Constructs a request which interprets the body as a text string and returns the full event stream.
   *
   * @param method  The HTTP method.
   * @param url     The endpoint URL.
   * @param options The HTTP options to send with the request.
   *
   * @return An `Observable` of all `HttpEvents` for the reques,
   * with the response body of type string.
   */
  request(method: string, url: string, options: {
      body?: any;
      headers?: HttpHeaders | {
          [header: string]: string | string[];
      };
      observe: 'events';
      params?: HttpParams | {
          [param: string]: string | string[];
      };
      reportProgress?: boolean;
      responseType: 'text';
      withCredentials?: boolean;
  }): Observable<HttpEvent<string>>;
  /**
   * Constructs a request which interprets the body as a JSON object and returns the full event stream.
   *
   * @param method  The HTTP method.
   * @param url     The endpoint URL.
   * @param options The HTTP options to send with the  request.
   *
   * @return An `Observable` of all `HttpEvents` for the request,
   *  with the response body of type `Object`.
   */
  request(method: string, url: string, options: {
      body?: any;
      headers?: HttpHeaders | {
          [header: string]: string | string[];
      };
      reportProgress?: boolean;
      observe: 'events';
      params?: HttpParams | {
          [param: string]: string | string[];
      };
      responseType?: 'json';
      withCredentials?: boolean;
  }): Observable<HttpEvent<any>>;
  /**
   * Constructs a request which interprets the body as a JSON object and returns the full event stream.
   *
   * @param method  The HTTP method.
   * @param url     The endpoint URL.
   * @param options The HTTP options to send with the request.
   *
   * @return An `Observable` of all `HttpEvents` for the request,
   * with the response body of type `R`.
   */
  request<R>(method: string, url: string, options: {
      body?: any;
      headers?: HttpHeaders | {
          [header: string]: string | string[];
      };
      reportProgress?: boolean;
      observe: 'events';
      params?: HttpParams | {
          [param: string]: string | string[];
      };
      responseType?: 'json';
      withCredentials?: boolean;
  }): Observable<HttpEvent<R>>;

  /**
   * Constructs a request which interprets the body as a text stream and returns the full `HTTPResponse`.
   *
   * @param method  The HTTP method.
   * @param url     The endpoint URL.
   * @param options The HTTP options to send with the request.
   *
   * @return An `Observable` of the HTTP response, with the response body of type string.
   */
  request(method: string, url: string, options: {
      body?: any;
      headers?: HttpHeaders | {
          [header: string]: string | string[];
      };
      observe: 'response';
      params?: HttpParams | {
          [param: string]: string | string[];
      };
      reportProgress?: boolean;
      responseType: 'text';
      withCredentials?: boolean;
  }): Observable<HttpResponse<string>>;
  /**
   * Constructs a request which interprets the body as a JSON object and returns the full `HTTPResponse`.
   *
   * @param method  The HTTP method.
   * @param url     The endpoint URL.
   * @param options The HTTP options to send with the request.
   *
   * @return An `Observable` of the full `HTTPResponse`,
   * with the response body of type `Object`.
   */
  request(method: string, url: string, options: {
      body?: any;
      headers?: HttpHeaders | {
          [header: string]: string | string[];
      };
      reportProgress?: boolean;
      observe: 'response';
      params?: HttpParams | {
          [param: string]: string | string[];
      };
      responseType?: 'json';
      withCredentials?: boolean;
  }): Observable<HttpResponse<object>>;
  /**
   * Constructs a request which interprets the body as a JSON object and returns
   * the full `HTTPResponse` with the response body in the requested type.
   *
   * @param method  The HTTP method.
   * @param url     The endpoint URL.
   * @param options The HTTP options to send with the request.
   *
   * @return  An `Observable` of the full `HTTPResponse`, with the response body of type `R`.
   */
  request<R>(method: string, url: string, options: {
      body?: any;
      headers?: HttpHeaders | {
          [header: string]: string | string[];
      };
      reportProgress?: boolean;
      observe: 'response';
      params?: HttpParams | {
          [param: string]: string | string[];
      };
      responseType?: 'json';
      withCredentials?: boolean;
  }): Observable<HttpResponse<R>>;
  /**
   * Constructs a request which interprets the body as a JSON object and returns the full
   * `HTTPResponse` as a JSON object.
   *
   * @param method  The HTTP method.
   * @param url     The endpoint URL.
   * @param options The HTTP options to send with the request.
   *
   * @return An `Observable` of the `HTTPResponse`, with the response body of type `Object`.
   */
  request(method: string, url: string, options?: {
      body?: any;
      headers?: HttpHeaders | {
          [header: string]: string | string[];
      };
      observe?: 'body';
      params?: HttpParams | {
          [param: string]: string | string[];
      };
      responseType?: 'json';
      reportProgress?: boolean;
      withCredentials?: boolean;
  }): Observable<object>;
  /**
   * Constructs a request which interprets the body as a JSON object
   * with the response body of the requested type.
   *
   * @param method  The HTTP method.
   * @param url     The endpoint URL.
   * @param options The HTTP options to send with the request.
   *
   * @return An `Observable` of the `HTTPResponse`, with the response body of type `R`.
   */
  request<R>(method: string, url: string, options?: {
      body?: any;
      headers?: HttpHeaders | {
          [header: string]: string | string[];
      };
      observe?: 'body';
      params?: HttpParams | {
          [param: string]: string | string[];
      };
      responseType?: 'json';
      reportProgress?: boolean;
      withCredentials?: boolean;
  }): Observable<R>;
  /**
   * Constructs a request where response type and requested observable are not known statically.
   *
   * @param method  The HTTP method.
   * @param url     The endpoint URL.
   * @param options The HTTP options to send with the request.
   *
   * @return An `Observable` of the reuested response, wuth body of type `any`.
   */
  request(method: string, url: string, options?: {
      body?: any;
      headers?: HttpHeaders | {
          [header: string]: string | string[];
      };
      params?: HttpParams | {
          [param: string]: string | string[];
      };
      observe?: HttpObserve;
      reportProgress?: boolean;
      responseType?: 'json' | 'text';
      withCredentials?: boolean;
  }): Observable<any>;

  public request<R>(
    method: string,
    url: string,
    options?: {
      body?: any;
      headers?: HttpHeaders | {
        [header: string]: string | string[];
      };
      observe?: 'response' | 'body' | 'events';
      params?: HttpParams | {
        [param: string]: string | string[];
      };
      responseType?: 'json' | 'text';
      reportProgress?: boolean;
      withCredentials?: boolean;
    }
  ): Observable<any> {
    return this.oauth.getAccessToken().pipe(
      switchMap(accessToken => {
        if (!options) {
          options = {
            observe: 'body'
          };
        }
        if (!options.headers) {
          options.headers = new HttpHeaders();
        }
        if (accessToken) {
          if (options.headers instanceof HttpHeaders) {
            options.headers = options.headers.set('Authorization', 'Bearer ' + accessToken);
          } else {
            options.headers.Authorization = 'Bearer ' + accessToken;
          }
        }

        return this.http.request(method, environment.apiUrl + url, options).pipe(
          catchError((response: HttpErrorResponse) => {
            if (response.status === 429) {
              this.toasts.error(response.error);
            }
            return throwError(response);
          })
        );
      })
    );
  }

  public resolveLocation(url: string): string {
    return url.replace(environment.apiUrl, '');
  }
}
