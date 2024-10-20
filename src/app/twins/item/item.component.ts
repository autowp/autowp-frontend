import {AsyncPipe} from '@angular/common';
import {Component, inject, Input} from '@angular/core';
import {RouterLink} from '@angular/router';
import {ACLService, Privilege, Resource} from '@services/acl.service';
import {APIItem} from '@services/item';

import {ItemHeaderComponent} from '../../utils/item-header/item-header.component';
import {MarkdownComponent} from '../../utils/markdown/markdown.component';

@Component({
  imports: [ItemHeaderComponent, RouterLink, MarkdownComponent, AsyncPipe],
  selector: 'app-twins-item',
  standalone: true,
  styleUrls: ['./styles.scss'],
  templateUrl: './item.component.html',
})
export class TwinsItemComponent {
  private readonly acl = inject(ACLService);

  @Input() item: APIItem | null = null;
  @Input() group: APIItem | null = null;

  protected readonly isModer$ = this.acl.isAllowed$(Resource.GLOBAL, Privilege.MODERATE);

  protected havePhoto(item: APIItem) {
    if (item.preview_pictures) {
      for (const picture of item.preview_pictures.pictures) {
        if (picture && picture.picture) {
          return true;
        }
      }
    }
    return false;
  }

  protected canHavePhoto(item: APIItem) {
    return [1, 2, 5, 6, 7].indexOf(item.item_type_id) !== -1;
  }
}
