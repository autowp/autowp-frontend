import {Component, Input, EventEmitter, Output} from '@angular/core';
import {APIItemParent} from '@services/item-parent';
import {BehaviorSubject} from 'rxjs';
import {APIItem} from '@services/item';

@Component({
  selector: 'app-moder-items-item-select-parent-tree',
  templateUrl: './tree.component.html',
})
export class ModerItemsItemSelectParentTreeComponent {
  @Input() set item(value: APIItemParent) {
    this.item$.next(value);
  }
  protected readonly item$ = new BehaviorSubject<APIItemParent>(null);
  @Input() order: string;
  @Input() disableItemID: number;
  @Output() selected = new EventEmitter<APIItem>();

  protected onSelect(item: APIItem) {
    this.selected.emit(item);
    return false;
  }
}
