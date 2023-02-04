import {Component, Input, Output, EventEmitter} from '@angular/core';
import {ItemParentService, APIItemParent} from '../../../../../services/item-parent';
import {ToastsService} from '../../../../../toasts/toasts.service';

@Component({
  selector: 'app-cars-select-engine-tree-item',
  templateUrl: './tree-item.component.html',
})
export class CarsSelectEngineTreeItemComponent {
  @Input() item: APIItemParent;
  @Output() selected = new EventEmitter<number>();

  public open = false;
  public loading = false;
  public childs: APIItemParent[] = [];

  constructor(private itemParentService: ItemParentService, private toastService: ToastsService) {}

  private loadChildCatalogues() {
    this.loading = true;
    this.itemParentService
      .getItems$({
        limit: 500,
        fields: 'item.name_html,item.childs_count',
        parent_id: this.item.item_id,
        item_type_id: 2,
        order: 'type_auto',
      })
      .subscribe({
        next: (response) => {
          this.childs = response.items;
          this.loading = false;
        },
        error: (response: unknown) => {
          this.toastService.handleError(response);
          this.loading = false;
        },
      });
  }

  public selectEngine(engineId: number) {
    this.selected.emit(engineId);
    return false;
  }

  public toggle(): boolean {
    this.open = !this.open;
    if (this.open) {
      this.loadChildCatalogues();
    }
    return false;
  }
}
