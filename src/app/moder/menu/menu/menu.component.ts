import {AsyncPipe, NgClass} from '@angular/common';
import {Component, inject} from '@angular/core';
import {RouterLink} from '@angular/router';
import {NgbDropdown, NgbDropdownMenu, NgbDropdownToggle} from '@ng-bootstrap/ng-bootstrap';
import {AuthService, Role} from '@services/auth.service';
import {PictureService} from '@services/picture';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {APICommentsService} from '../../../api/comments/comments.service';

interface MenuItem {
  count$?: Observable<null | number>;
  icon: string;
  label: string;
  queryParams?: {[key: string]: string | undefined};
  routerLink: string[];
}

@Component({
  imports: [NgbDropdown, NgbDropdownToggle, NgbDropdownMenu, RouterLink, NgClass, AsyncPipe],
  selector: 'app-moder-menu',
  styleUrls: ['./menu.component.scss'],
  templateUrl: './menu.component.html',
})
export class MenuComponent {
  protected readonly auth = inject(AuthService);
  readonly #pictureService = inject(PictureService);
  readonly #commentService = inject(APICommentsService);

  protected readonly items$: Observable<MenuItem[] | null> = this.auth.hasRole$(Role.MODER).pipe(
    map((isModer) => {
      if (!isModer) {
        return null;
      }

      return [
        {
          count$: this.#pictureService.inboxSize$,
          icon: 'bi bi-grid-3x2-gap-fill',
          label: $localize`Inbox`,
          queryParams: {
            order: '1',
            status: 'inbox',
          },
          routerLink: ['/moder/pictures'],
        },
        {
          count$: this.#commentService.attentionCommentsCount$,
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
}
