import {Component, Input} from '@angular/core';
import {RouterLink} from '@angular/router';

import type {APIItemTreeItem} from '../item.component';

@Component({
  imports: [RouterLink],
  selector: 'app-moder-items-item-tree',
  standalone: true,
  templateUrl: './tree.component.html',
})
export class ModerItemsItemTreeComponent {
  @Input() item?: APIItemTreeItem;
}
