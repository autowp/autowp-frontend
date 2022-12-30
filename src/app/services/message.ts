import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of, combineLatest} from 'rxjs';
import {AuthService} from './auth.service';
import {switchMap, map, debounceTime, shareReplay, tap, catchError} from 'rxjs/operators';
import {HttpErrorResponse} from '@angular/common/http';
import {ToastsService} from '../toasts/toasts.service';
import {MessagingClient} from '../../../generated/spec.pbsc';
import {Empty} from '@ngx-grpc/well-known-types';
import {
  APIMessage,
  APIMessageNewCount,
  APIMessageSummary,
  MessagingClearFolder,
  MessagingCreateMessage,
  MessagingDeleteMessage,
} from '../../../generated/spec.pb';

@Injectable()
export class MessageService {
  private readonly summary$: Observable<APIMessageSummary>;
  private readonly new$: Observable<number>;
  private deleted$ = new BehaviorSubject<void>(null);
  private sent$ = new BehaviorSubject<void>(null);
  private seen$ = new BehaviorSubject<void>(null);

  constructor(private auth: AuthService, private toasts: ToastsService, private messagingClient: MessagingClient) {
    this.summary$ = combineLatest([this.deleted$, this.sent$, this.seen$, this.auth.getUser()]).pipe(
      map(([, , , user]) => user),
      debounceTime(10),
      switchMap((user) => {
        if (!user) {
          return of(null as APIMessageSummary);
        }

        return this.messagingClient.getMessagesSummary(new Empty());
      }),
      shareReplay(1)
    );

    this.new$ = combineLatest([this.auth.getUser(), this.deleted$, this.seen$]).pipe(
      map((data) => data[0]),
      debounceTime(10),
      switchMap((user) => {
        if (!user) {
          return of(null as APIMessageNewCount);
        }

        return this.messagingClient.getMessagesNewCount(new Empty());
      }),
      catchError((response: HttpErrorResponse) => {
        this.toasts.errorResponse(response);
        return of(null as APIMessageNewCount);
      }),
      map((response) => (response ? response.count : null))
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

  public clearFolder(folder: string): Observable<Empty> {
    return this.messagingClient
      .clearFolder(new MessagingClearFolder({folder: folder}))
      .pipe(tap(() => this.deleted$.next(null)));
  }

  public deleteMessage(id: string): Observable<Empty> {
    return this.messagingClient
      .deleteMessage(
        new MessagingDeleteMessage({
          messageId: id,
        })
      )
      .pipe(tap(() => this.deleted$.next(null)));
  }

  public getSummary(): Observable<APIMessageSummary> {
    return this.summary$;
  }

  public getNew(): Observable<number> {
    return this.new$;
  }

  public send(userId: string, text: string): Observable<Empty> {
    return this.messagingClient
      .createMessage(
        new MessagingCreateMessage({
          userId: userId,
          text: text,
        })
      )
      .pipe(tap(() => this.sent$.next(null)));
  }
}
