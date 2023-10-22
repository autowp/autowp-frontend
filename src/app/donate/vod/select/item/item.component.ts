import {Component, Input} from '@angular/core';
import {ItemType} from '@grpc/spec.pb';
import {APIItemParent, ItemParentService} from '@services/item-parent';

import {ToastsService} from '../../../../toasts/toasts.service';

@Component({
  selector: 'app-donate-vod-select-item',
  styleUrls: ['./styles.scss'],
  templateUrl: './item.component.html',
})
export class DonateVodSelectItemComponent {
  protected childs: APIItemParent[] = [];
  protected loading = false;
  @Input() item: APIItemParent;

  constructor(
    private readonly itemParentService: ItemParentService,
    private readonly toastService: ToastsService,
  ) {}

  protected toggleItem() {
    this.item.expanded = !this.item.expanded;

    if (this.item.expanded) {
      this.loading = true;
      this.itemParentService
        .getItems$({
          fields: 'item.name_html,item.childs_count,item.is_compiles_item_of_day',
          item_type_id: ItemType.ITEM_TYPE_VEHICLE,
          limit: 500,
          parent_id: this.item.item_id,
        })
        .subscribe({
          error: (response: unknown) => this.toastService.handleError(response),
          next: (response) => {
            this.loading = false;
            this.childs = response.items;
          },
        });
    }

    return false;
  }
}
