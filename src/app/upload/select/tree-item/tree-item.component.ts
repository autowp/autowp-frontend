import { Component, Injectable, Input } from '@angular/core';
import {
  APIItemParent,
  ItemParentService
} from '../../../services/item-parent';
import {ToastsService} from '../../../toasts/toasts.service';


@Component({
  selector: 'app-upload-select-tree-item',
  templateUrl: './tree-item.component.html'
})
@Injectable()
export class UploadSelectTreeItemComponent {
  @Input() item: APIItemParent;
  @Input() typeId: number;

  public loading = false;
  public open = false;
  public childs: APIItemParent[] = [];

  constructor(private itemParentService: ItemParentService, private toastService: ToastsService) {}

  public loadChilds() {
    this.loading = true;
    this.itemParentService
      .getItems({
        limit: 500,
        fields: 'item.name_html,item.childs_count',
        parent_id: this.item.item_id,
        order: 'type_auto'
      })
      .subscribe(
        response => {
          this.childs = response.items;
          this.loading = false;
        },
        response => {
          this.toastService.response(response);
          this.loading = false;
        }
      );

    return false;
  }
}
