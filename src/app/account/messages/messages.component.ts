import {Component} from '@angular/core';
import {MessageService} from '@services/message';
import {ActivatedRoute} from '@angular/router';
import {BehaviorSubject, EMPTY, Observable, of} from 'rxjs';
import {PageEnvService} from '@services/page-env.service';
import {distinctUntilChanged, debounceTime, switchMap, map, tap, catchError} from 'rxjs/operators';
import {MessageDialogService} from '../../message-dialog/message-dialog.service';
import {ToastsService} from '../../toasts/toasts.service';
import {APIMessage, MessagingGetMessagesRequest, Pages} from '@grpc/spec.pb';
import {MessagingClient} from '@grpc/spec.pbsc';
import {APIUser, UserService} from '@services/user';

@Component({
  selector: 'app-account-messages',
  templateUrl: './messages.component.html',
})
export class AccountMessagesComponent {
  protected folder: string;
  private readonly change$ = new BehaviorSubject<null>(null);

  protected pageName = '';

  protected readonly messages$: Observable<{
    items: {message: APIMessage; author$: Observable<APIUser>}[];
    paginator: Pages;
  }> = this.route.queryParamMap.pipe(
    map((params) => ({
      folder: params.get('folder'),
      user_id: params.get('user_id'),
      page: parseInt(params.get('page'), 10),
    })),
    distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
    debounceTime(30),
    switchMap((params) => {
      this.folder = params.folder || 'inbox';
      let pageId = null;
      let userID: string = null;

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
          userID = params.user_id;
          break;
      }

      this.pageEnv.set({
        title: this.pageName,
        pageId,
      });

      return this.change$.pipe(
        switchMap(() =>
          this.messagingClient
            .getMessages(
              new MessagingGetMessagesRequest({
                folder: this.folder,
                page: params.page || 1,
                userId: userID ? userID : null,
              })
            )
            .pipe(
              catchError((err: unknown) => {
                this.toastService.handleError(err);
                return EMPTY;
              })
            )
        )
      );
    }),
    tap((response) => {
      this.messageService.seen(response.items);
    }),
    map((response) => {
      return {
        items: response.items.map((msg) => ({
          message: msg,
          author$:
            msg.authorId !== '0'
              ? this.userService.getUser$(parseInt(msg.authorId, 10), {fields: 'avatar'})
              : of(null as APIUser),
        })),
        paginator: response.paginator,
      };
    })
  );

  constructor(
    private readonly messageService: MessageService,
    private readonly messageDialogService: MessageDialogService,
    private readonly route: ActivatedRoute,
    private readonly pageEnv: PageEnvService,
    private readonly toastService: ToastsService,
    private readonly messagingClient: MessagingClient,
    private readonly userService: UserService
  ) {}

  protected deleteMessage(id: string) {
    this.messageService.deleteMessage$(id).subscribe({
      next: () => {
        this.change$.next(null);
      },
      error: (response: unknown) => this.toastService.handleError(response),
    });

    return false;
  }

  protected clearFolder(folder: string) {
    this.messageService.clearFolder$(folder).subscribe({
      next: () => {
        this.change$.next(null);
      },
      error: (response: unknown) => this.toastService.handleError(response),
    });
  }

  protected openMessageForm(userId: string) {
    this.messageDialogService.showDialog(userId, () => {
      switch (this.folder) {
        case 'sent':
        case 'dialog':
          this.change$.next(null);
          break;
      }
    });
    return false;
  }
}
