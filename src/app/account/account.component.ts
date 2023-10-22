import {Component} from '@angular/core';
import {ForumsClient} from '@grpc/spec.pbsc';
import {Empty} from '@ngx-grpc/well-known-types';
import {AuthService} from '@services/auth.service';
import {MessageService} from '@services/message';
import {PageEnvService} from '@services/page-env.service';
import {PictureService} from '@services/picture';
import {Observable, combineLatest, of} from 'rxjs';
import {map, shareReplay, switchMap} from 'rxjs/operators';

import {ToastsService} from '../toasts/toasts.service';

interface SidebarItem {
  active?: boolean;
  count?: number;
  icon?: string;
  name: string;
  newCount?: number;
  pageId?: number;
  routerLink?: string[];
  routerLinkParams?: {[key: string]: string};
}

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
})
export class AccountComponent {
  protected readonly items$: Observable<SidebarItem[]> = combineLatest([
    this.auth.getUser$(),
    this.auth.getUser$().pipe(
      switchMap((user) => {
        if (!user) {
          return of(null);
        }
        return this.forumsClient.getUserSummary(new Empty());
      }),
      shareReplay(1),
    ),
    this.messageService.getSummary$(),
    this.pictureService.getSummary$(),
  ]).pipe(
    map(([user, forumSummary, messageSummary, picturesSummary]) => {
      if (!user) {
        return [] as SidebarItem[];
      }
      const items: SidebarItem[] = [
        {
          icon: 'bi-person',
          name: $localize`Profile`,
          pageId: 129,
          routerLink: ['/account/profile'],
        },
        {
          icon: 'bi-person-lines-fill',
          name: $localize`Contacts`,
          pageId: 198,
          routerLink: ['/account/contacts'],
        },
        {
          icon: 'bi-envelope-open',
          name: $localize`My e-mail`,
          pageId: 55,
          routerLink: ['/account/email'],
        },
        {
          icon: 'bi-lock',
          name: $localize`Access Control`,
          pageId: 133,
          routerLink: ['/account/access'],
        },
        {
          icon: 'bi-asterisk',
          name: $localize`My accounts`,
          pageId: 123,
          routerLink: ['/account/accounts'],
        },
        {
          count: picturesSummary ? picturesSummary.acceptedCount : null,
          icon: 'bi-grid-3x2-gap-fill',
          name: $localize`My pictures`,
          pageId: 130,
          routerLink: ['/users', user.identity ? user.identity : 'user' + user.id, 'pictures'],
        },
        {
          count: picturesSummary ? picturesSummary.inboxCount : null,
          icon: 'bi-grid-3x2-gap-fill',
          name: $localize`Unmoderated`,
          pageId: 94,
          routerLink: ['/account/inbox-pictures'],
        },
        {
          count: forumSummary ? forumSummary.subscriptionsCount : null,
          icon: 'bi-bookmark',
          name: $localize`Forums subscriptions`,
          pageId: 57,
          routerLink: ['/forums/subscriptions'],
        },
        {
          name: $localize`Specifications`,
        },
        {
          icon: 'bi-exclamation-triangle',
          name: $localize`Conflicts`,
          pageId: 188,
          routerLink: ['/account/specs-conflicts'],
        },
        {
          name: $localize`Personal messages`,
        },
        {
          count: messageSummary ? messageSummary.inboxCount : null,
          icon: 'bi-chat-text',
          name: $localize`Inbox`,
          newCount: messageSummary ? messageSummary.inboxNewCount : null,
          pageId: 128,
          routerLink: ['/account/messages'],
        },
        {
          count: messageSummary ? messageSummary.sentCount : null,
          icon: 'bi-chat-text',
          name: $localize`Sent`,
          pageId: 80,
          routerLink: ['/account/messages'],
          routerLinkParams: {folder: 'sent'},
        },
        {
          count: messageSummary ? messageSummary.systemCount : null,
          icon: 'bi-chat-text',
          name: $localize`System messages`,
          newCount: messageSummary ? messageSummary.systemNewCount : null,
          pageId: 81,
          routerLink: ['/account/messages'],
          routerLinkParams: {folder: 'system'},
        },
      ];

      for (const item of items) {
        if (item.pageId) {
          this.pageEnv.isActive$(item.pageId).subscribe({
            error: (response: unknown) => this.toastService.handleError(response),
            next: (active) => {
              item.active = active;
            },
          });
        }
      }
      return items;
    }),
  );

  constructor(
    private readonly messageService: MessageService,
    private readonly auth: AuthService,
    private readonly pictureService: PictureService,
    private readonly pageEnv: PageEnvService,
    private readonly toastService: ToastsService,
    private readonly forumsClient: ForumsClient,
  ) {}
}
