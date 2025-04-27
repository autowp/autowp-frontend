import {AsyncPipe} from '@angular/common';
import {ChangeDetectionStrategy, Component, inject, signal} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {APIMessage, APIUser, MessagingGetMessagesRequest, Pages} from '@grpc/spec.pb';
import {MessagingClient} from '@grpc/spec.pbsc';
import {MessageService} from '@services/message';
import {PageEnvService} from '@services/page-env.service';
import {UserService} from '@services/user';
import {PastTimeIndicatorComponent} from '@utils/past-time-indicator/past-time-indicator.component';
import {UserTextComponent} from '@utils/user-text/user-text.component';
import {BehaviorSubject, combineLatest, EMPTY, Observable} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, map, switchMap, tap} from 'rxjs/operators';

import {MessageDialogService} from '../../message-dialog/message-dialog.service';
import {PaginatorComponent} from '../../paginator/paginator/paginator.component';
import {ToastsService} from '../../toasts/toasts.service';
import {UserComponent} from '../../user/user/user.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [UserComponent, RouterLink, UserTextComponent, PastTimeIndicatorComponent, PaginatorComponent, AsyncPipe],
  selector: 'app-account-messages',
  templateUrl: './messages.component.html',
})
export class AccountMessagesComponent {
  readonly #messageService = inject(MessageService);
  readonly #messageDialogService = inject(MessageDialogService);
  readonly #route = inject(ActivatedRoute);
  readonly #pageEnv = inject(PageEnvService);
  readonly #toastService = inject(ToastsService);
  readonly #messagingClient = inject(MessagingClient);
  readonly #userService = inject(UserService);

  readonly #change$ = new BehaviorSubject<void>(void 0);

  protected readonly pageName = signal('');

  protected readonly folder$: Observable<string> = this.#route.queryParamMap.pipe(
    map((params) => params.get('folder') ?? 'inbox'),
    distinctUntilChanged(),
    debounceTime(30),
  );

  protected readonly page$: Observable<number> = this.#route.queryParamMap.pipe(
    map((params) => parseInt(params.get('page') ?? '', 10)),
    distinctUntilChanged(),
    debounceTime(30),
  );

  protected readonly userId$: Observable<string> = this.#route.queryParamMap.pipe(
    map((params) => params.get('user_id') ?? ''),
    distinctUntilChanged(),
    debounceTime(30),
  );

  protected readonly messages$: Observable<{
    items: {author$: Observable<APIUser | null>; message: APIMessage}[];
    paginator: Pages | undefined;
  }> = combineLatest([this.folder$, this.page$, this.userId$, this.#change$]).pipe(
    switchMap(([folder, page, userId]) => {
      let pageId = 0;

      switch (folder) {
        case 'dialog':
          pageId = 49;
          this.pageName.set($localize`Personal messages`);
          break;
        case 'inbox':
          pageId = 128;
          this.pageName.set($localize`Inbox`);
          break;
        case 'sent':
          pageId = 80;
          this.pageName.set($localize`Sent`);
          break;
        case 'system':
          pageId = 81;
          this.pageName.set($localize`System messages`);
          break;
      }

      this.#pageEnv.set({
        pageId,
        title: this.pageName(),
      });

      return this.#messagingClient.getMessages(
        new MessagingGetMessagesRequest({
          folder,
          page: page || 1,
          userId: userId || undefined,
        }),
      );
    }),
    catchError((err: unknown) => {
      this.#toastService.handleError(err);
      return EMPTY;
    }),
    tap((response) => {
      if (response.items) {
        this.#messageService.seen(response.items);
      }
    }),
    map((response) => ({
      items: (response.items || []).map((msg) => ({
        author$: this.#userService.getUser$(msg.authorId),
        message: msg,
      })),
      paginator: response.paginator,
    })),
  );

  protected deleteMessage(id: string) {
    this.#messageService.deleteMessage$(id).subscribe({
      error: (response: unknown) => this.#toastService.handleError(response),
      next: () => {
        this.#change$.next();
      },
    });

    return false;
  }

  protected clearFolder(folder: string) {
    this.#messageService.clearFolder$(folder).subscribe({
      error: (response: unknown) => this.#toastService.handleError(response),
      next: () => {
        this.#change$.next();
      },
    });
  }

  protected openMessageForm(folder: string, userId: string) {
    this.#messageDialogService.showDialog(userId, () => {
      switch (folder) {
        case 'dialog':
        case 'sent':
          this.#change$.next();
          break;
      }
    });
    return false;
  }
}
