import {inject, Injectable} from '@angular/core';
import {
  APIMessage,
  APIMessageSummary,
  MessagingClearFolder,
  MessagingCreateMessage,
  MessagingDeleteMessage,
} from '@grpc/spec.pb';
import {MessagingClient} from '@grpc/spec.pbsc';
import {Empty} from '@ngx-grpc/well-known-types';
import {BehaviorSubject, combineLatest, Observable, of} from 'rxjs';
import {catchError, debounceTime, map, shareReplay, switchMap, tap} from 'rxjs/operators';

import {ToastsService} from '../toasts/toasts.service';
import {AuthService} from './auth.service';

@Injectable()
export class MessageService {
  private readonly auth = inject(AuthService);
  private readonly toasts = inject(ToastsService);
  private readonly messagingClient = inject(MessagingClient);

  private readonly deleted$ = new BehaviorSubject<void>(void 0);
  private readonly sent$ = new BehaviorSubject<void>(void 0);
  private readonly seen$ = new BehaviorSubject<void>(void 0);

  private readonly new$: Observable<null | number> = combineLatest([
    this.auth.getUser$(),
    this.deleted$,
    this.seen$,
  ]).pipe(
    map((data) => data[0]),
    debounceTime(10),
    switchMap((user) => {
      if (!user) {
        return of(null);
      }

      return this.messagingClient.getMessagesNewCount(new Empty());
    }),
    catchError((response: unknown) => {
      this.toasts.handleError(response);
      return of(null);
    }),
    map((response) => (response ? response.count : null)),
  );

  private readonly summary$: Observable<APIMessageSummary | null> = combineLatest([
    this.deleted$,
    this.sent$,
    this.seen$,
    this.auth.getUser$(),
  ]).pipe(
    map(([, , , user]) => user),
    debounceTime(10),
    switchMap((user) => {
      if (!user) {
        return of(null);
      }

      return this.messagingClient.getMessagesSummary(new Empty());
    }),
    shareReplay(1),
  );

  public seen(messages: APIMessage[]) {
    let newFound = false;
    for (const message of messages) {
      if (message.isNew) {
        newFound = true;
      }
    }

    if (newFound) {
      this.seen$.next();
    }
  }

  public clearFolder$(folder: string): Observable<Empty> {
    return this.messagingClient
      .clearFolder(new MessagingClearFolder({folder: folder}))
      .pipe(tap(() => this.deleted$.next()));
  }

  public deleteMessage$(id: string): Observable<Empty> {
    return this.messagingClient
      .deleteMessage(
        new MessagingDeleteMessage({
          messageId: id,
        }),
      )
      .pipe(tap(() => this.deleted$.next()));
  }

  public getSummary$(): Observable<APIMessageSummary | null> {
    return this.summary$;
  }

  public getNew$(): Observable<null | number> {
    return this.new$;
  }

  public send$(userId: string, text: string): Observable<Empty> {
    return this.messagingClient
      .createMessage(
        new MessagingCreateMessage({
          text: text,
          userId: userId,
        }),
      )
      .pipe(tap(() => this.sent$.next()));
  }
}
