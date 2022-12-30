import {Component} from '@angular/core';
import {MessageService} from '../../services/message';
import {AuthService} from '../../services/auth.service';
import {map} from 'rxjs/operators';
import {combineLatest, Observable} from 'rxjs';
import {PictureService} from '../../services/picture';
import {PageEnvService} from '../../services/page-env.service';
import {ForumsService} from '../../forums/forums.service';
import {ToastsService} from '../../toasts/toasts.service';

interface SidebarItem {
  pageId?: number;
  routerLink?: string[];
  icon?: string;
  name: string;
  count?: number;
  newCount?: number;
  routerLinkParams?: any;
  active?: boolean;
}

@Component({
  selector: 'app-account-sidebar',
  templateUrl: './sidebar.component.html',
})
export class AccountSidebarComponent {
  public items$: Observable<SidebarItem[]> = combineLatest([
    this.auth.getUser(),
    this.forumService.getUserSummary(),
    this.messageService.getSummary(),
    this.pictureService.getSummary(),
  ]).pipe(
    map(([user, forumSummary, messageSummary, picturesSummary]) => {
      if (!user) {
        return [] as SidebarItem[];
      }
      const items: SidebarItem[] = [
        {
          pageId: 129,
          routerLink: ['/account/profile'],
          icon: 'bi-person',
          name: $localize`Profile`,
        },
        {
          pageId: 198,
          routerLink: ['/account/contacts'],
          icon: 'bi-person-lines-fill',
          name: $localize`Contacts`,
        },
        {
          pageId: 55,
          routerLink: ['/account/email'],
          icon: 'bi-envelope-open',
          name: $localize`My e-mail`,
        },
        {
          pageId: 133,
          routerLink: ['/account/access'],
          icon: 'bi-lock',
          name: $localize`Access Control`,
        },
        {
          pageId: 123,
          routerLink: ['/account/accounts'],
          icon: 'bi-asterisk',
          name: $localize`My accounts`,
        },
        {
          pageId: 130,
          routerLink: ['/users', user.identity ? user.identity : 'user' + user.id, 'pictures'],
          icon: 'bi-grid-3x2-gap-fill',
          name: $localize`My pictures`,
          count: picturesSummary ? picturesSummary.acceptedCount : null,
        },
        {
          pageId: 94,
          routerLink: ['/account/inbox-pictures'],
          icon: 'bi-grid-3x2-gap-fill',
          name: $localize`Unmoderated`,
          count: picturesSummary ? picturesSummary.inboxCount : null,
        },
        {
          pageId: 57,
          routerLink: ['/forums/subscriptions'],
          icon: 'bi-bookmark',
          name: $localize`Forums subscriptions`,
          count: forumSummary ? forumSummary.subscriptionsCount : null,
        },
        {
          name: $localize`Specifications`,
        },
        {
          pageId: 188,
          routerLink: ['/account/specs-conflicts'],
          icon: 'bi-exclamation-triangle',
          name: $localize`Conflicts`,
        },
        {
          name: $localize`Personal messages`,
        },
        {
          pageId: 128,
          routerLink: ['/account/messages'],
          icon: 'bi-chat-text',
          name: $localize`Inbox`,
          count: messageSummary ? messageSummary.inboxCount : null,
          newCount: messageSummary ? messageSummary.inboxNewCount : null,
        },
        {
          pageId: 80,
          routerLink: ['/account/messages'],
          routerLinkParams: {folder: 'sent'},
          icon: 'bi-chat-text',
          name: $localize`Sent`,
          count: messageSummary ? messageSummary.sentCount : null,
        },
        {
          pageId: 81,
          routerLink: ['/account/messages'],
          routerLinkParams: {folder: 'system'},
          icon: 'bi-chat-text',
          name: $localize`System messages`,
          count: messageSummary ? messageSummary.systemCount : null,
          newCount: messageSummary ? messageSummary.systemNewCount : null,
        },
      ];

      for (const item of items) {
        if (item.pageId) {
          this.pageEnv.isActive(item.pageId).subscribe({
            next: (active) => {
              item.active = active;
            },
            error: (response) => this.toastService.response(response),
          });
        }
      }
      return items;
    })
  );

  constructor(
    private messageService: MessageService,
    private forumService: ForumsService,
    private auth: AuthService,
    private pictureService: PictureService,
    private pageEnv: PageEnvService,
    private toastService: ToastsService
  ) {}
}
