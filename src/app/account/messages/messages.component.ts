import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {APIMessage, APIUser, MessagingGetMessagesRequest, Pages} from '@grpc/spec.pb';
import {MessagingClient} from '@grpc/spec.pbsc';
import {MessageService} from '@services/message';
import {PageEnvService} from '@services/page-env.service';
import {UserService} from '@services/user';
import {BehaviorSubject, EMPTY, Observable, of} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, map, switchMap, tap} from 'rxjs/operators';

import {MessageDialogService} from '../../message-dialog/message-dialog.service';
import {ToastsService} from '../../toasts/toasts.service';

@Component({
  selector: 'app-account-messages',
  templateUrl: './messages.component.html',
})
export class AccountMessagesComponent {
  protected folder: string = '';
  private readonly change$ = new BehaviorSubject<void>(void 0);

  protected pageName = '';

  protected readonly messages$: Observable<{
    items: {author$: Observable<APIUser | null>; message: APIMessage}[];
    paginator: Pages | undefined;
  }> = this.route.queryParamMap.pipe(
    map((params) => ({
      folder: params.get('folder'),
      page: parseInt(params.get('page') || '', 10),
      user_id: params.get('user_id'),
    })),
    distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
    debounceTime(30),
    switchMap((params) => {
      this.folder = params.folder || 'inbox';
      let pageId: number = 0;
      let userID: string = '';

      switch (this.folder) {
        case 'inbox':
          pageId = 128;
          this.pageName = $localize`Inbox`;
          break;
        case 'sent':
          pageId = 80;
          this.pageName = $localize`Sent`;
          break;
        case 'system':
          pageId = 81;
          this.pageName = $localize`System messages`;
          break;
        case 'dialog':
          pageId = 49;
          this.pageName = $localize`Personal messages`;
          userID = params.user_id || '';
          break;
      }

      this.pageEnv.set({
        pageId,
        title: this.pageName,
      });

      return this.change$.pipe(
        switchMap(() =>
          this.messagingClient
            .getMessages(
              new MessagingGetMessagesRequest({
                folder: this.folder,
                page: params.page || 1,
                userId: userID ? userID : undefined,
              }),
            )
            .pipe(
              catchError((err: unknown) => {
                this.toastService.handleError(err);
                return EMPTY;
              }),
            ),
        ),
      );
    }),
    tap((response) => {
      if (response.items) {
        this.messageService.seen(response.items);
      }
    }),
    map((response) => {
      return {
        items: (response.items || []).map((msg) => ({
          author$: msg.authorId !== '0' ? this.userService.getUser$(msg.authorId) : of(null),
          message: msg,
        })),
        paginator: response.paginator,
      };
    }),
  );

  constructor(
    private readonly messageService: MessageService,
    private readonly messageDialogService: MessageDialogService,
    private readonly route: ActivatedRoute,
    private readonly pageEnv: PageEnvService,
    private readonly toastService: ToastsService,
    private readonly messagingClient: MessagingClient,
    private readonly userService: UserService,
  ) {}

  protected deleteMessage(id: string) {
    this.messageService.deleteMessage$(id).subscribe({
      error: (response: unknown) => this.toastService.handleError(response),
      next: () => {
        this.change$.next();
      },
    });

    return false;
  }

  protected clearFolder(folder: string) {
    this.messageService.clearFolder$(folder).subscribe({
      error: (response: unknown) => this.toastService.handleError(response),
      next: () => {
        this.change$.next();
      },
    });
  }

  protected openMessageForm(userId: string) {
    this.messageDialogService.showDialog(userId, () => {
      switch (this.folder) {
        case 'sent':
        case 'dialog':
          this.change$.next();
          break;
      }
    });
    return false;
  }
}
