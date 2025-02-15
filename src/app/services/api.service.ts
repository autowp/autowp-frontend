import {
  HttpClient,
  HttpErrorResponse,
  HttpEvent,
  HttpHandlerFn,
  HttpHeaders,
  HttpParams,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {environment} from '@environment/environment';
import {GrpcDataEvent, GrpcEvent, GrpcMessage, GrpcRequest} from '@ngx-grpc/common';
import {GrpcHandler, GrpcInterceptor} from '@ngx-grpc/core';
import Keycloak from 'keycloak-js';
import {Observable, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';

import {ToastsService} from '../toasts/toasts.service';
import {LanguageService} from './language';

declare type HttpObserve = 'body' | 'events' | 'response';

export interface APIImage {
  height: number;
  src: string;
  width: number;
}

export interface APIPaginator {
  current: number;
  first: number;
  firstPageInRange: number;
  last: number;
  lastPageInRange: number;
  next: number;
  pageCount: number;
  pagesInRange: {[key: number]: number};
  previous: number;
  totalItemCount: number;
  // itemCountPerPage: number;
  // currentItemCount: number;
  // firstItemNumber: number;
  // lastItemNumber: number;
}

export function authInterceptor$(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const keycloak = inject(Keycloak);

  const token = keycloak.token;

  if (!token) {
    return next(req);
  }

  const authReq = req.clone({
    headers: req.headers.set('Authorization', 'Bearer ' + token),
  });

  return next(authReq);
}

@Injectable({
  providedIn: 'root',
})
export class GrpcLogInterceptor implements GrpcInterceptor {
  private dataStyle = 'color: #5c7ced;';
  private errorStyle = 'color: red;';
  private statusOkStyle = 'color: #0ffcf5;';

  intercept<Q extends GrpcMessage, S extends GrpcMessage>(
    request: GrpcRequest<Q, S>,
    next: GrpcHandler,
  ): Observable<GrpcEvent<S>> {
    const start = Date.now();

    if (environment.production) {
      return next.handle(request);
    }

    return next.handle(request).pipe(
      tap((event) => {
        let style = this.dataStyle;
        if (!(event instanceof GrpcDataEvent)) {
          style = event.statusCode !== 0 ? this.errorStyle : this.statusOkStyle;
        }

        console.groupCollapsed(`%c${Date.now() - start}ms -> ${request.path}`, style);
        console.log('%csc', style, request.client.getSettings());
        console.log('%c>>', style, request.requestData);
        console.log('%c**', style, request.requestMetadata.toObject());
        console.log('%c<<', style, event instanceof GrpcDataEvent ? event.data.toObject() : event);
        console.groupEnd();
      }),
    );
  }
}

@Injectable({
  providedIn: 'root',
})
export class GrpcAuthInterceptor implements GrpcInterceptor {
  private readonly keycloak = inject(Keycloak);

  intercept<Q extends GrpcMessage, S extends GrpcMessage>(
    request: GrpcRequest<Q, S>,
    next: GrpcHandler,
  ): Observable<GrpcEvent<S>> {
    const token = this.keycloak.token;

    if (!token) {
      return next.handle(request);
    }

    request.requestMetadata.set('Authorization', 'Bearer ' + token);

    return next.handle(request);
  }
}

@Injectable({
  providedIn: 'root',
})
export class APIService {
  private readonly http = inject(HttpClient);
  private readonly toasts = inject(ToastsService);
  private readonly language = inject(LanguageService);

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
  request$(
    method: string,
    url: string,
    options: {
      body?: unknown;
      headers?:
        | HttpHeaders
        | {
            [header: string]: string | string[];
          };
      observe?: 'body';
      params?:
        | HttpParams
        | {
            [param: string]: string | string[];
          };
      reportProgress?: boolean;
      responseType: 'text';
      withCredentials?: boolean;
    },
  ): Observable<string>;

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
  request$(
    method: string,
    url: string,
    options: {
      body?: unknown;
      headers?:
        | HttpHeaders
        | {
            [header: string]: string | string[];
          };
      observe: 'events';
      params?:
        | HttpParams
        | {
            [param: string]: string | string[];
          };
      reportProgress?: boolean;
      responseType: 'text';
      withCredentials?: boolean;
    },
  ): Observable<HttpEvent<string>>;
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
  request$(
    method: string,
    url: string,
    options: {
      body?: unknown;
      headers?:
        | HttpHeaders
        | {
            [header: string]: string | string[];
          };
      observe: 'events';
      params?:
        | HttpParams
        | {
            [param: string]: string | string[];
          };
      reportProgress?: boolean;
      responseType?: 'json';
      withCredentials?: boolean;
    },
  ): Observable<HttpEvent<unknown>>;
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
  request$<R>(
    method: string,
    url: string,
    options: {
      body?: unknown;
      headers?:
        | HttpHeaders
        | {
            [header: string]: string | string[];
          };
      observe: 'events';
      params?:
        | HttpParams
        | {
            [param: string]: string | string[];
          };
      reportProgress?: boolean;
      responseType?: 'json';
      withCredentials?: boolean;
    },
  ): Observable<HttpEvent<R>>;

  /**
   * Constructs a request which interprets the body as a text stream and returns the full `HTTPResponse`.
   *
   * @param method  The HTTP method.
   * @param url     The endpoint URL.
   * @param options The HTTP options to send with the request.
   *
   * @return An `Observable` of the HTTP response, with the response body of type string.
   */
  request$(
    method: string,
    url: string,
    options: {
      body?: unknown;
      headers?:
        | HttpHeaders
        | {
            [header: string]: string | string[];
          };
      observe: 'response';
      params?:
        | HttpParams
        | {
            [param: string]: string | string[];
          };
      reportProgress?: boolean;
      responseType: 'text';
      withCredentials?: boolean;
    },
  ): Observable<HttpResponse<string>>;
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
  request$(
    method: string,
    url: string,
    options: {
      body?: unknown;
      headers?:
        | HttpHeaders
        | {
            [header: string]: string | string[];
          };
      observe: 'response';
      params?:
        | HttpParams
        | {
            [param: string]: string | string[];
          };
      reportProgress?: boolean;
      responseType?: 'json';
      withCredentials?: boolean;
    },
  ): Observable<HttpResponse<object>>;
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
  request$<R>(
    method: string,
    url: string,
    options: {
      body?: unknown;
      headers?:
        | HttpHeaders
        | {
            [header: string]: string | string[];
          };
      observe: 'response';
      params?:
        | HttpParams
        | {
            [param: string]: string | string[];
          };
      reportProgress?: boolean;
      responseType?: 'json';
      withCredentials?: boolean;
    },
  ): Observable<HttpResponse<R>>;
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
  request$(
    method: string,
    url: string,
    options?: {
      body?: unknown;
      headers?:
        | HttpHeaders
        | {
            [header: string]: string | string[];
          };
      observe?: 'body';
      params?:
        | HttpParams
        | {
            [param: string]: string | string[];
          };
      reportProgress?: boolean;
      responseType?: 'json';
      withCredentials?: boolean;
    },
  ): Observable<object>;
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
  request$<R>(
    method: string,
    url: string,
    options?: {
      body?: unknown;
      headers?:
        | HttpHeaders
        | {
            [header: string]: string | string[];
          };
      observe?: 'body';
      params?:
        | HttpParams
        | {
            [param: string]: string | string[];
          };
      reportProgress?: boolean;
      responseType?: 'json';
      withCredentials?: boolean;
    },
  ): Observable<R>;
  /**
   * Constructs a request where response type and requested observable are not known statically.
   *
   * @param method  The HTTP method.
   * @param url     The endpoint URL.
   * @param options The HTTP options to send with the request.
   *
   * @return An `Observable` of the requested response, with body of type `any`.
   */
  request$(
    method: string,
    url: string,
    options?: {
      body?: unknown;
      headers?:
        | HttpHeaders
        | {
            [header: string]: string | string[];
          };
      observe?: HttpObserve;
      params?:
        | HttpParams
        | {
            [param: string]: string | string[];
          };
      reportProgress?: boolean;
      responseType?: 'json' | 'text';
      withCredentials?: boolean;
    },
  ): Observable<unknown>;

  public request$(
    method: string,
    url: string,
    options?: {
      body?: unknown;
      headers?:
        | HttpHeaders
        | {
            [header: string]: string | string[];
          };
      observe?: 'body' | 'events' | 'response';
      params?:
        | HttpParams
        | {
            [param: string]: string | string[];
          };
      reportProgress?: boolean;
      responseType?: 'json' | 'text';
      withCredentials?: boolean;
    },
  ): Observable<unknown> {
    if (!options) {
      options = {};
    }

    if (!options.headers) {
      options.headers = {};
    }

    if (options.headers instanceof HttpHeaders) {
      options.headers.append('Accept-Language', this.language.language);
    } else {
      options.headers['Accept-Language'] = this.language.language;
    }

    return this.http.request(method, environment.apiUrl + url, options).pipe(
      catchError((response: unknown) => {
        if (response instanceof HttpErrorResponse && response.status === 429) {
          this.toasts.handleError(response);
        }
        return throwError(() => response);
      }),
    );
  }
}
