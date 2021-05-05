import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, combineLatest } from 'rxjs';
import { AuthService } from './auth.service';
import { APIPaginator, APIService } from './api.service';
import { APIUser } from './user';
import {switchMap, map, debounceTime, shareReplay, tap, catchError} from 'rxjs/operators';
import {HttpErrorResponse} from '@angular/common/http';
import {ToastsService} from '../toasts/toasts.service';
import {AutowpClient} from '../../../generated/spec.pbsc';
import { Empty } from '@ngx-grpc/well-known-types';
import {APIMessageNewCount, APIMessageSummary} from '../../../generated/spec.pb';

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
  text: string;
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

@Injectable()
export class MessageService {
  private readonly summary$: Observable<APIMessageSummary>;
  private readonly new$: Observable<number>;
  private deleted$ = new BehaviorSubject<void>(null);
  private sent$ = new BehaviorSubject<void>(null);
  private seen$ = new BehaviorSubject<void>(null);

  constructor(private api: APIService, private auth: AuthService, private toasts: ToastsService, private grpc: AutowpClient) {
    this.summary$ = combineLatest([
      this.deleted$,
      this.sent$,
      this.seen$,
      this.auth.getUser()
    ]).pipe(
      map(([, , , user]) => user),
      debounceTime(10),
      switchMap(user => {
        if (!user) {
          return of(null as APIMessageSummary);
        }

        return this.grpc.getMessagesSummary(new Empty());
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
          return of(null as APIMessageNewCount);
        }

        return this.grpc.getMessagesNewCount(new Empty());
      }),
      catchError((response: HttpErrorResponse) => {
        this.toasts.errorResponse(response);
        return of(null as APIMessageNewCount);
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

  public getSummary(): Observable<APIMessageSummary> {
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
