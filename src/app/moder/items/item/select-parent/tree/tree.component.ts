import { Component, Injectable, Input, EventEmitter, Output } from '@angular/core';
import { APIItemParent } from '../../../../../services/item-parent';
import { APIItem } from '../../../../../services/item';

@Component({
  selector: 'app-moder-items-item-select-parent-tree',
  templateUrl: './tree.component.html'
})
@Injectable()
export class ModerItemsItemSelectParentTreeComponent {
  @Input() item: APIItemParent;
  @Input() disableItemID: number;
  @Output() selected = new EventEmitter<APIItem>();
  @Output() loadChilds = new EventEmitter<APIItem>();

  public onSelect(item: APIItem) {
    this.selected.emit(item);
    return false;
  }

  public onLoadChilds(item: APIItem) {
    this.loadChilds.emit(item);
    return false;
  }
}
