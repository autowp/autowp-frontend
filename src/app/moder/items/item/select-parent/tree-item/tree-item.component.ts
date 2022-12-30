import {Component, Input, EventEmitter, Output} from '@angular/core';
import {APIItem} from '../../../../../services/item';
import {APIItemInSelectParent} from '../select-parent.component';

@Component({
  selector: 'app-moder-items-item-select-parent-tree-item',
  templateUrl: './tree-item.component.html',
})
export class ModerItemsItemSelectParentTreeItemComponent {
  @Input() item: APIItemInSelectParent;
  @Input() disableItemID: number;
  @Input() typeID: number;
  @Output() selected = new EventEmitter<APIItem>();
  @Output() loadChilds = new EventEmitter<APIItem>();

  public isDisabled(item: APIItemInSelectParent): boolean {
    return item.id === this.disableItemID;
  }

  public onSelect(item: APIItem) {
    this.selected.emit(item);
    return false;
  }

  public onLoadChilds(item: APIItem) {
    this.loadChilds.emit(item);
    return false;
  }
}
