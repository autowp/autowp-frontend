import { Component} from '@angular/core';
import { MessageService } from '../../services/message';
import { AuthService } from '../../services/auth.service';
import {map} from 'rxjs/operators';
import {combineLatest, Observable} from 'rxjs';
import { PictureService } from '../../services/picture';
import { PageEnvService } from '../../services/page-env.service';
import { ForumsService } from '../../forums/forums.service';
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
  templateUrl: './sidebar.component.html'
})
export class AccountSidebarComponent {
  public items$: Observable<SidebarItem[]> = combineLatest(
    [
      this.auth.getUser(),
      this.forumService.getUserSummary(),
      this.messageService.getSummary(),
      this.pictureService.getSummary()
    ]
  ).pipe(
    map(([user, forumSummary, messageSummary, picturesSummary]) => {
      if (!user) {
        return [] as SidebarItem[];
      }
      const items: SidebarItem[] = [
        {
          pageId: 129,
          routerLink: ['/account/profile'],
          icon: 'user',
          name: $localize `Profile`
        },
        {
          pageId: 198,
          routerLink: ['/account/contacts'],
          icon: 'address-book',
          name: $localize `Contacts`
        },
        {
          pageId: 55,
          routerLink: ['/account/email'],
          icon: 'envelope-o',
          name: $localize `My e-mail`
        },
        {
          pageId: 133,
          routerLink: ['/account/access'],
          icon: 'lock',
          name: $localize `Access Control`
        },
        {
          pageId: 123,
          routerLink: ['/account/accounts'],
          icon: 'asterisk',
          name: $localize `My accounts`
        },
        {
          pageId: 130,
          routerLink: [
            '/users',
            user.identity ? user.identity : 'user' + user.id,
            'pictures'
          ],
          icon: 'th',
          name: $localize `My pictures`,
          count: picturesSummary
            ? picturesSummary.acceptedCount
            : null
        },
        {
          pageId: 94,
          routerLink: ['/account/inbox-pictures'],
          icon: 'th',
          name: $localize `Unmoderated`,
          count: picturesSummary
            ? picturesSummary.inboxCount
            : null
        },
        {
          pageId: 57,
          routerLink: ['/forums/subscriptions'],
          icon: 'bookmark',
          name: $localize `Forums subscriptions`,
          count: forumSummary
            ? forumSummary.subscriptionsCount
            : null
        },
        {
          name: $localize `Specifications`
        },
        {
          pageId: 188,
          routerLink: ['/account/specs-conflicts'],
          icon: 'exclamation-triangle',
          name: $localize `Conflicts`
        },
        {
          name: $localize `Personal messages`
        },
        {
          pageId: 128,
          routerLink: ['/account/messages'],
          icon: 'comments-o',
          name: $localize `Inbox`,
          count: messageSummary
            ? messageSummary.inboxCount
            : null,
          newCount: messageSummary
            ? messageSummary.inboxNewCount
            : null
        },
        {
          pageId: 80,
          routerLink: ['/account/messages'],
          routerLinkParams: { folder: 'sent' },
          icon: 'comments-o',
          name: $localize `Sent`,
          count: messageSummary ? messageSummary.sentCount : null
        },
        {
          pageId: 81,
          routerLink: ['/account/messages'],
          routerLinkParams: { folder: 'system' },
          icon: 'comments',
          name: $localize `System messages`,
          count: messageSummary
            ? messageSummary.systemCount
            : null,
          newCount: messageSummary
            ? messageSummary.systemNewCount
            : null
        }
      ];

      for (const item of items) {
        if (item.pageId) {
          this.pageEnv.isActive(item.pageId).subscribe({
            next: active => {
              item.active = active;
            },
            error: response => this.toastService.response(response)
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
