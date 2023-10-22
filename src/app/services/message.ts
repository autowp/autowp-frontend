import {Injectable} from '@angular/core';
import {
  APIMessage,
  APIMessageNewCount,
  APIMessageSummary,
  MessagingClearFolder,
  MessagingCreateMessage,
  MessagingDeleteMessage,
} from '@grpc/spec.pb';
import {MessagingClient} from '@grpc/spec.pbsc';
import {Empty} from '@ngx-grpc/well-known-types';
import {BehaviorSubject, Observable, combineLatest, of} from 'rxjs';
import {catchError, debounceTime, map, shareReplay, switchMap, tap} from 'rxjs/operators';

import {ToastsService} from '../toasts/toasts.service';
import {AuthService} from './auth.service';

@Injectable()
export class MessageService {
  private readonly summary$: Observable<APIMessageSummary>;
  private readonly new$: Observable<number>;
  private readonly deleted$ = new BehaviorSubject<void>(null);
  private readonly sent$ = new BehaviorSubject<void>(null);
  private readonly seen$ = new BehaviorSubject<void>(null);

  constructor(
    private readonly auth: AuthService,
    private readonly toasts: ToastsService,
    private readonly messagingClient: MessagingClient,
  ) {
    this.summary$ = combineLatest([this.deleted$, this.sent$, this.seen$, this.auth.getUser$()]).pipe(
      map(([, , , user]) => user),
      debounceTime(10),
      switchMap((user) => {
        if (!user) {
          return of(null as APIMessageSummary);
        }

        return this.messagingClient.getMessagesSummary(new Empty());
      }),
      shareReplay(1),
    );

    this.new$ = combineLatest([this.auth.getUser$(), this.deleted$, this.seen$]).pipe(
      map((data) => data[0]),
      debounceTime(10),
      switchMap((user) => {
        if (!user) {
          return of(null as APIMessageNewCount);
        }

        return this.messagingClient.getMessagesNewCount(new Empty());
      }),
      catchError((response: unknown) => {
        this.toasts.handleError(response);
        return of(null as APIMessageNewCount);
      }),
      map((response) => (response ? response.count : null)),
    );
  }

  public seen(messages: APIMessage[]) {
    let newFound = false;
    for (const message of messages) {
      if (message.isNew) {
        newFound = true;
      }
    }

    if (newFound) {
      this.seen$.next(null);
    }
  }

  public clearFolder$(folder: string): Observable<Empty> {
    return this.messagingClient
      .clearFolder(new MessagingClearFolder({folder: folder}))
      .pipe(tap(() => this.deleted$.next(null)));
  }

  public deleteMessage$(id: string): Observable<Empty> {
    return this.messagingClient
      .deleteMessage(
        new MessagingDeleteMessage({
          messageId: id,
        }),
      )
      .pipe(tap(() => this.deleted$.next(null)));
  }

  public getSummary$(): Observable<APIMessageSummary> {
    return this.summary$;
  }

  public getNew$(): Observable<number> {
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
      .pipe(tap(() => this.sent$.next(null)));
  }
}
