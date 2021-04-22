import { Component, Input } from '@angular/core';
import { APIItemTreeItem } from '../item.component';

@Component({
  selector: 'app-moder-items-item-tree',
  templateUrl: './tree.component.html'
})
export class ModerItemsItemTreeComponent {
  @Input() item: APIItemTreeItem;
}
