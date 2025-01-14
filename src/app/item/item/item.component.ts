import type {APIItem} from '@services/item';

import {AsyncPipe} from '@angular/common';
import {Component, inject, Input} from '@angular/core';
import {RouterLink} from '@angular/router';
import {ACLService, Privilege, Resource} from '@services/acl.service';
import {ItemHeaderComponent} from '@utils/item-header/item-header.component';
import {MarkdownComponent} from '@utils/markdown/markdown.component';

@Component({
  imports: [ItemHeaderComponent, RouterLink, MarkdownComponent, AsyncPipe],
  selector: 'app-item',
  styleUrls: ['./item.component.scss'],
  templateUrl: './item.component.html',
})
export class ItemComponent {
  private readonly acl = inject(ACLService);

  @Input() item?: APIItem;
  @Input() disableTitle: boolean = false;
  @Input() disableDescription: boolean = false;
  @Input() disableDetailsLink: boolean = false;

  protected readonly isModer$ = this.acl.isAllowed$(Resource.GLOBAL, Privilege.MODERATE);

  protected havePhoto(item: APIItem) {
    if (item.preview_pictures) {
      for (const picture of item.preview_pictures.pictures) {
        if (picture?.picture) {
          return true;
        }
      }
    }
    return false;
  }

  protected canHavePhoto(item: APIItem) {
    return [1, 2, 5, 6, 7].indexOf(item.item_type_id) !== -1;
  }

  protected thumbnailColClass() {
    if (this.item && this.item.preview_pictures.pictures.length === 3) {
      return 'col-sm-4';
    }

    return 'col-6 col-lg-3';
  }
}
