import {Component} from '@angular/core';
import {ACLService, Privilege, Resource} from '@services/acl.service';
import {AuthService} from '@services/auth.service';
import {PictureService} from '@services/picture';
import {Observable, combineLatest} from 'rxjs';
import {map} from 'rxjs/operators';

import {APICommentsService} from '../../../api/comments/comments.service';

interface MenuItem {
  count?: null | number;
  icon: string;
  label: string;
  queryParams?: {[key: string]: string | undefined};
  routerLink: string[];
}

@Component({
  selector: 'app-moder-menu',
  styleUrls: ['./menu.component.scss'],
  templateUrl: './menu.component.html',
})
export class MenuComponent {
  protected readonly items$: Observable<MenuItem[] | null> = combineLatest([
    this.acl.isAllowed$(Resource.GLOBAL, Privilege.MODERATE),
    this.pictureService.getInboxSize$(),
    this.commentService.attentionCommentsCount$,
  ]).pipe(
    map(([isModer, inboxCount, attentionItemCount]) => {
      if (!isModer) {
        return null;
      }

      return [
        {
          count: inboxCount,
          icon: 'bi bi-grid-3x2-gap-fill',
          label: $localize`Inbox`,
          queryParams: {
            order: '1',
            status: 'inbox',
          },
          routerLink: ['/moder/pictures'],
        },
        {
          count: attentionItemCount,
          icon: 'bi bi-chat-fill',
          label: $localize`Comments`,
          queryParams: {
            moderator_attention: '1',
          },
          routerLink: ['/moder/comments'],
        },
        {
          icon: 'bi bi-car-front',
          label: $localize`Items`,
          routerLink: ['/moder/items'],
        },
      ];
    }),
  );

  constructor(
    protected readonly auth: AuthService,
    protected readonly acl: ACLService,
    private readonly pictureService: PictureService,
    private readonly commentService: APICommentsService,
  ) {}
}
