import {Component} from '@angular/core';
import {combineLatest, Observable, of} from 'rxjs';
import {map, shareReplay, switchMap} from 'rxjs/operators';
import {MessageService} from '@services/message';
import {AuthService} from '@services/auth.service';
import {PictureService} from '@services/picture';
import {PageEnvService} from '@services/page-env.service';
import {ToastsService} from '../toasts/toasts.service';
import {Empty} from '@ngx-grpc/well-known-types';
import {ForumsClient} from '@grpc/spec.pbsc';

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
      shareReplay(1)
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
          this.pageEnv.isActive$(item.pageId).subscribe({
            next: (active) => {
              item.active = active;
            },
            error: (response: unknown) => this.toastService.handleError(response),
          });
        }
      }
      return items;
    })
  );

  constructor(
    private readonly messageService: MessageService,
    private readonly auth: AuthService,
    private readonly pictureService: PictureService,
    private readonly pageEnv: PageEnvService,
    private readonly toastService: ToastsService,
    private readonly forumsClient: ForumsClient
  ) {}
}
