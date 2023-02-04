import {Component} from '@angular/core';
import {combineLatest, Observable} from 'rxjs';
import {AuthService} from '../../../services/auth.service';
import {ACLService, Privilege, Resource} from '../../../services/acl.service';
import {PictureService} from '../../../services/picture';
import {map} from 'rxjs/operators';
import {APICommentsService} from '../../../api/comments/comments.service';

interface MenuItem {
  routerLink: string[];
  queryParams?: {[key: string]: string};
  label: string;
  count?: number;
  icon: string;
}

@Component({
  selector: 'app-moder-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  public items$: Observable<MenuItem[]> = combineLatest([
    this.acl.isAllowed$(Resource.GLOBAL, Privilege.MODERATE),
    this.pictureService.getInboxSize$(),
    this.commentService.getAttentionCommentsCount$(),
  ]).pipe(
    map(([isModer, inboxCount, attentionItemCount]) => {
      if (!isModer) {
        return null;
      }

      return [
        {
          routerLink: ['/moder/pictures'],
          queryParams: {
            order: '1',
            status: 'inbox',
          },
          label: $localize`Inbox`,
          count: inboxCount,
          icon: 'bi bi-grid-3x2-gap-fill',
        },
        {
          routerLink: ['/moder/comments'],
          queryParams: {
            moderator_attention: '1',
          },
          label: $localize`Comments`,
          count: attentionItemCount,
          icon: 'bi bi-chat-fill',
        },
        {
          routerLink: ['/moder/items'],
          label: $localize`Items`,
          icon: 'bi bi-car-front',
        },
      ];
    })
  );

  constructor(
    public auth: AuthService,
    public acl: ACLService,
    private pictureService: PictureService,
    private commentService: APICommentsService
  ) {}
}
