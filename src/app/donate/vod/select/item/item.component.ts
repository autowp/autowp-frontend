import {
  Component,
  Injectable,
  Input
} from '@angular/core';
import {
  ItemParentService,
  APIItemParent
} from '../../../../services/item-parent';
import {ToastsService} from '../../../../toasts/toasts.service';

@Component({
  selector: 'app-donate-vod-select-item',
  templateUrl: './item.component.html',
  styleUrls: ['./styles.scss']
})
@Injectable()
export class DonateVodSelectItemComponent {
  public childs: APIItemParent[] = [];
  public loading = false;
  @Input() item: APIItemParent;

  constructor(private itemParentService: ItemParentService, private toastService: ToastsService) {}

  public toggleItem() {
    this.item.expanded = !this.item.expanded;

    if (this.item.expanded) {
      this.loading = true;
      this.itemParentService
        .getItems({
          item_type_id: 1,
          parent_id: this.item.item_id,
          fields:
            'item.name_html,item.childs_count,item.is_compiles_item_of_day',
          limit: 500
        })
        .subscribe(
          response => {
            this.loading = false;
            this.childs = response.items;
          },
          response => this.toastService.response(response)
        );
    }

    return false;
  }
}
