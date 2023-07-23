import {Component, EventEmitter, Input, Output} from '@angular/core';
import {APIItemParent, ItemParentService} from '@services/item-parent';

import {PictureItemMoveSelection} from '../move.component';

@Component({
  selector: 'app-moder-picture-move-item',
  styleUrls: ['./styles.scss'],
  templateUrl: './item.component.html',
})
export class ModerPictureMoveItemComponent {
  @Input() item: APIItemParent;
  @Output() selected = new EventEmitter<PictureItemMoveSelection>();

  protected loading = false;
  protected childs: APIItemParent[] = [];

  constructor(private readonly itemParentService: ItemParentService) {}

  protected toggleItem(item: APIItemParent) {
    item.expanded = !item.expanded;

    if (item.expanded) {
      this.loading = true;
      this.itemParentService
        .getItems$({
          fields: 'item.name_html,item.childs_count',
          limit: 500,
          parent_id: item.item_id,
        })
        .subscribe((response) => {
          this.loading = false;
          this.childs = response.items;
        });
    }

    return false;
  }

  protected selectItem(selection: PictureItemMoveSelection) {
    this.selected.emit(selection);
    return false;
  }
}
