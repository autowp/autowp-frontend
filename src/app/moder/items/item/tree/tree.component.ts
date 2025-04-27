import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import {RouterLink} from '@angular/router';
import {APITreeItem, ItemParentType} from '@grpc/spec.pb';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  selector: 'app-moder-items-item-tree',
  templateUrl: './tree.component.html',
})
export class ModerItemsItemTreeComponent {
  readonly item = input.required<APITreeItem>();

  protected readonly ItemParentType = ItemParentType;
}
