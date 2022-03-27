import { Component, OnInit, OnDestroy } from '@angular/core';
import { APIPaginator } from '../../services/api.service';
import { MessageService, APIMessage } from '../../services/message';
import { ActivatedRoute } from '@angular/router';
import { Subscription, BehaviorSubject } from 'rxjs';
import { PageEnvService } from '../../services/page-env.service';
import {distinctUntilChanged, debounceTime, switchMap, map} from 'rxjs/operators';
import { MessageDialogService } from '../../message-dialog/message-dialog.service';
import {ToastsService} from '../../toasts/toasts.service';

@Component({
  selector: 'app-account-messages',
  templateUrl: './messages.component.html'
})
export class AccountMessagesComponent implements OnInit, OnDestroy {
  private querySub: Subscription;
  public folder: string;
  public items: APIMessage[] = [];
  public paginator: APIPaginator | null;
  private change$ = new BehaviorSubject<null>(null);

  public pageName = '';

  constructor(
    private messageService: MessageService,
    private messageDialogService: MessageDialogService,
    private route: ActivatedRoute,
    private pageEnv: PageEnvService,
    private toastService: ToastsService
  ) {}

  ngOnInit(): void {
    this.querySub = this.route.queryParamMap
      .pipe(
        map(params => ({
          folder: params.get('folder'),
          user_id: params.get('user_id'),
          page: parseInt(params.get('page'), 10),
        })),
        distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
        debounceTime(30),
        switchMap(params => {
          this.folder = params.folder || 'inbox';
          let pageId = null;
          let userID = null;

          switch (this.folder) {
            case 'inbox':
              pageId = 128;
              this.pageName = $localize `Inbox`;
              break;
            case 'sent':
              pageId = 80;
              this.pageName = $localize `Sent`;
              break;
            case 'system':
              pageId = 81;
              this.pageName = $localize `System messages`;
              break;
            case 'dialog':
              pageId = 49;
              this.pageName = $localize `Personal messages`;
              userID = params.user_id;
              break;
          }

          this.pageEnv.set({
            layout: {
              needRight: false
            },
            nameTranslated: this.pageName,
            pageId
          });

          return this.change$.pipe(
            switchMap(() =>
              this.messageService.getMessages({
                folder: this.folder,
                page: params.page || 1,
                fields: 'author.avatar,author.gravatar',
                user_id: userID ? userID : 0
              })
            )
          );
        })
      )
      .subscribe(
        response => {
          this.items = response.items;
          this.paginator = response.paginator;

          this.messageService.seen(response.items);
        },
        response => this.toastService.response(response)
      );
  }

  ngOnDestroy(): void {
    this.querySub.unsubscribe();
  }

  public deleteMessage(id: number) {
    this.messageService.deleteMessage(id).subscribe(
      () => {
        for (let i = 0; i < this.items.length; i++) {
          if (this.items[i].id === id) {
            this.items.splice(i, 1);
            break;
          }
        }
      },
      response => this.toastService.grpcErrorResponse(response)
    );

    return false;
  }

  public clearFolder(folder: string) {
    this.messageService.clearFolder(folder).subscribe(
      () => {
        if (this.folder === folder) {
          this.items = [];
          this.paginator = null;
        }
      },
      response => this.toastService.grpcErrorResponse(response)
    );
  }

  public openMessageForm(userId: string) {
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
