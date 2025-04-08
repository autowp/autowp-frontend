import {AsyncPipe} from '@angular/common';
import {Component, inject, Input} from '@angular/core';
import {RouterLink} from '@angular/router';
import {APIItem, ItemType} from '@grpc/spec.pb';
import {AuthService, Role} from '@services/auth.service';
import {ItemHeaderComponent} from '@utils/item-header/item-header.component';
import {MarkdownComponent} from '@utils/markdown/markdown.component';

@Component({
  imports: [ItemHeaderComponent, RouterLink, MarkdownComponent, AsyncPipe],
  selector: 'app-twins-item',
  styleUrls: ['./styles.scss'],
  templateUrl: './item.component.html',
})
export class TwinsItemComponent {
  readonly #auth = inject(AuthService);

  @Input() item: APIItem | null = null;
  @Input() groupId: string = '';

  protected readonly isModer$ = this.#auth.hasRole$(Role.MODER);

  protected havePhoto(item: APIItem) {
    if (item.previewPictures) {
      for (const picture of item.previewPictures.pictures || []) {
        if (picture) {
          return true;
        }
      }
    }
    return false;
  }

  protected canHavePhoto(item: APIItem) {
    return (
      [
        ItemType.ITEM_TYPE_VEHICLE,
        ItemType.ITEM_TYPE_ENGINE,
        ItemType.ITEM_TYPE_BRAND,
        ItemType.ITEM_TYPE_FACTORY,
        ItemType.ITEM_TYPE_MUSEUM,
      ].indexOf(item.itemTypeId) !== -1
    );
  }
}
