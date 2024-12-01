import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {ItemType} from '@grpc/spec.pb';
import {APIItemParent, ItemParentService} from '@services/item-parent';

import {ToastsService} from '../../../../../toasts/toasts.service';

@Component({
  selector: 'app-cars-select-engine-tree-item',
  standalone: true,
  templateUrl: './tree-item.component.html',
})
export class CarsSelectEngineTreeItemComponent {
  private readonly itemParentService = inject(ItemParentService);
  private readonly toastService = inject(ToastsService);

  @Input() item?: APIItemParent;
  @Output() selected = new EventEmitter<string>();

  protected open = false;
  protected loading = false;
  protected childs: APIItemParent[] = [];

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

  protected selectEngine(engineId: string) {
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
