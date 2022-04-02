import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpResponse,
  HttpEvent,
  HttpErrorResponse,
  HttpRequest,
  HttpHandler, HttpInterceptor
} from '@angular/common/http';
import {from, Observable, of, throwError} from 'rxjs';
import { environment } from '../../environments/environment';
import {catchError, switchMap, tap} from 'rxjs/operators';
import {ToastsService} from '../toasts/toasts.service';
import {LanguageService} from './language';
import {GrpcHandler, GrpcInterceptor} from '@ngx-grpc/core';
import {GrpcDataEvent, GrpcEvent, GrpcMessage, GrpcRequest} from '@ngx-grpc/common';
import {KeycloakService} from 'keycloak-angular';

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
  first: number;
  current: number;
  last: number;
  next: number;
  previous: number;
  pagesInRange: { [key: number]: number };
  firstPageInRange: number;
  lastPageInRange: number;
  totalItemCount: number;
  // itemCountPerPage: number;
  // currentItemCount: number;
  // firstItemNumber: number;
  // lastItemNumber: number;
}

export interface APILoginStartGetResponse {
  url: string;
}

declare type HttpObserve = 'body' | 'events' | 'response';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private keycloak: KeycloakService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const promise = this.keycloak.getToken()

    promise.then(() => {}, d => console.log(d))

    return from(promise).pipe(
      catchError((e, e2) => {
        console.log('Handled error', e, e2);
        return of('');
      }),
      switchMap(accessToken => {
        if (! accessToken) {
          return next.handle(req);
        }

        const authReq = req.clone({
          headers: req.headers.set('Authorization', 'Bearer ' + accessToken)
        });

        return next.handle(authReq);
      })
    );
  }
}

@Injectable()
export class GrpcLogInterceptor implements GrpcInterceptor {

  private dataStyle = 'color: #5c7ced;';
  private errorStyle = 'color: red;';
  private statusOkStyle = 'color: #0ffcf5;';

  intercept<Q extends GrpcMessage, S extends GrpcMessage>(request: GrpcRequest<Q, S>, next: GrpcHandler): Observable<GrpcEvent<S>> {
    const start = Date.now();

    if (environment.production) {
      return next.handle(request);
    }

    return next.handle(request).pipe(
      tap(event => {
        const style = event instanceof GrpcDataEvent ? this.dataStyle : event.statusCode !== 0 ? this.errorStyle : this.statusOkStyle;
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

@Injectable()
export class GrpcAuthInterceptor implements GrpcInterceptor {

  constructor(private keycloak: KeycloakService) { }

  intercept<Q extends GrpcMessage, S extends GrpcMessage>(request: GrpcRequest<Q, S>, next: GrpcHandler): Observable<GrpcEvent<S>> {

    const promise = this.keycloak.getToken()

    promise.then(() => {}, d => console.log(d))

    return from(promise).pipe(
      catchError((e, e2) => {
        console.log('Handled error', e, e2);
        return of('');
      }),
      switchMap(accessToken => {
        if (! accessToken) {
          return next.handle(request);
        }

        request.requestMetadata.set('Authorization', 'Bearer ' + accessToken)

        return next.handle(request);
      })
    );
  }
}

@Injectable()
export class APIService {
  constructor(
    private http: HttpClient,
    private toasts: ToastsService,
    private language: LanguageService
  ) {}

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
    if (! options) {
      options = {};
    }

    if (! options.headers) {
      options.headers = {};
    }

    if (options.headers instanceof HttpHeaders) {
      options.headers.append('Accept-Language', this.language.language);
    } else {
      options.headers['Accept-Language'] = this.language.language;
    }

    return this.http.request(method, environment.apiUrl + url, options).pipe(
      catchError((response: HttpErrorResponse) => {
        if (response.status === 429) {
          this.toasts.error(response.error);
        }
        return throwError(response);
      })
    );
  }

  public resolveLocation(url: string): string {
    return url.replace(environment.apiUrl, '');
  }
}
