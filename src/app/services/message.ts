import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, combineLatest } from 'rxjs';
import { AuthService } from './auth.service';
import { APIPaginator, APIService } from './api.service';
import { APIUser } from './user';
import {switchMap, map, debounceTime, shareReplay, tap, catchError} from 'rxjs/operators';
import {HttpErrorResponse} from '@angular/common/http';
import {ToastsService} from '../toasts/toasts.service';

export interface APIMessagesGetOptions {
  folder: string;
  page: number;
  fields: string;
  user_id?: number;
}

export interface APIMessage {
  id: number;
  is_new: boolean;
  author: APIUser;
  can_delete: boolean;
  text_html: string;
  can_reply: boolean;
  dialog_with_user_id: number;
  all_messages_link: boolean;
  dialog_count: number;
  date: string;
}

export interface APIMessagesGetResponse {
  items: APIMessage[];
  paginator: APIPaginator;
}

export interface APIMessageSummaryGetResponse {
  inbox: {
    count: number;
    new_count: number;
  };
  sent: {
    count: number;
  };
  system: {
    count: number;
    new_count: number;
  };
}

export interface APIMessageNewGetResponse {
  count: number;
}

@Injectable()
export class MessageService {
  private readonly summary$: Observable<APIMessageSummaryGetResponse>;
  private readonly new$: Observable<number>;
  private deleted$ = new BehaviorSubject<void>(null);
  private sent$ = new BehaviorSubject<void>(null);
  private seen$ = new BehaviorSubject<void>(null);

  constructor(private api: APIService, private auth: AuthService, private toasts: ToastsService) {
    this.summary$ = combineLatest([
      this.deleted$,
      this.sent$,
      this.seen$,
      this.auth.getUser()
    ]).pipe(
      map(data => data[3]),
      debounceTime(10),
      switchMap(user => {
        if (!user) {
          return of(null as APIMessageSummaryGetResponse);
        }

        return this.api.request<APIMessageSummaryGetResponse>('GET', 'message/summary');
      }),
      shareReplay(1)
    );

    this.new$ = combineLatest([
      this.auth.getUser(),
      this.deleted$,
      this.seen$
    ]).pipe(
      map(data => data[0]),
      debounceTime(10),
      switchMap(user => {
        if (!user) {
          return of(null as APIMessageNewGetResponse);
        }

        return this.api.request<APIMessageNewGetResponse>('GET', 'message/new');
      }),
      catchError((response: HttpErrorResponse) => {
        this.toasts.errorResponse(response);
        return of(null);
      }),
      map(response => (response ? response.count : null))
    );
  }

  public seen(messages: APIMessage[]) {
    let newFound = false;
    for (const message of messages) {
      if (message.is_new) {
        newFound = true;
      }
    }

    if (newFound) {
      this.seen$.next(null);
    }
  }

  public clearFolder(folder: string): Observable<void> {
    return this.api
      .request<void>('DELETE', 'message', {
        params: { folder }
      })
      .pipe(tap(() => this.deleted$.next(null)));
  }

  public deleteMessage(id: number): Observable<void> {
    return this.api
      .request<void>('DELETE', 'message/' + id)
      .pipe(tap(() => this.deleted$.next(null)));
  }

  public getSummary(): Observable<APIMessageSummaryGetResponse> {
    return this.summary$;
  }

  public getNew(): Observable<number> {
    return this.new$;
  }

  public send(userId: number, text: string): Observable<void> {
    return this.api
      .request<void>('POST', 'message', {body: {
        user_id: userId,
        text
      }})
      .pipe(tap(() => this.sent$.next(null)));
  }

  public getMessages(
    options: APIMessagesGetOptions
  ): Observable<APIMessagesGetResponse> {
    const params: { [param: string]: string } = {};

    if (options.folder) {
      params.folder = options.folder;
    }

    if (options.fields) {
      params.fields = options.fields;
    }

    if (options.page) {
      params.page = options.page.toString();
    }

    if (options.user_id) {
      params.user_id = options.user_id.toString();
    }

    return this.api.request<APIMessagesGetResponse>('GET', 'message', {
      params
    });
  }
}
