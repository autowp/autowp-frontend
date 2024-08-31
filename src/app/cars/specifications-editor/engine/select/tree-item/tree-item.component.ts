import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ItemType} from '@grpc/spec.pb';
import {APIItemParent, ItemParentService} from '@services/item-parent';

import {ToastsService} from '../../../../../toasts/toasts.service';

@Component({
  selector: 'app-cars-select-engine-tree-item',
  templateUrl: './tree-item.component.html',
})
export class CarsSelectEngineTreeItemComponent {
  @Input() item?: APIItemParent;
  @Output() selected = new EventEmitter<number>();

  protected open = false;
  protected loading = false;
  protected childs: APIItemParent[] = [];

  constructor(
    private readonly itemParentService: ItemParentService,
    private readonly toastService: ToastsService,
  ) {}

  private loadChildCatalogues() {
    this.loading = true;
    if (this.item) {
      this.itemParentService
        .getItems$({
          fields: 'item.name_html,item.childs_count',
          item_type_id: ItemType.ITEM_TYPE_ENGINE,
          limit: 500,
          order: 'type_auto',
          parent_id: this.item.item_id,
        })
        .subscribe({
          error: (response: unknown) => {
            this.toastService.handleError(response);
            this.loading = false;
          },
          next: (response) => {
            this.childs = response.items;
            this.loading = false;
          },
        });
    }
  }

  protected selectEngine(engineId: number) {
    this.selected.emit(engineId);
    return false;
  }

  protected toggle(): boolean {
    this.open = !this.open;
    if (this.open) {
      this.loadChildCatalogues();
    }
    return false;
  }
}
