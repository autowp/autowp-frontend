import {Component, Input, Output, EventEmitter} from '@angular/core';
import {ItemParentService, APIItemParent} from '@services/item-parent';
import {ToastsService} from '../../../../../toasts/toasts.service';
import {ItemType} from '@grpc/spec.pb';

@Component({
  selector: 'app-cars-select-engine-tree-item',
  templateUrl: './tree-item.component.html',
})
export class CarsSelectEngineTreeItemComponent {
  @Input() item: APIItemParent;
  @Output() selected = new EventEmitter<number>();

  protected open = false;
  protected loading = false;
  protected childs: APIItemParent[] = [];

  constructor(private readonly itemParentService: ItemParentService, private readonly toastService: ToastsService) {}

  private loadChildCatalogues() {
    this.loading = true;
    this.itemParentService
      .getItems$({
        limit: 500,
        fields: 'item.name_html,item.childs_count',
        parent_id: this.item.item_id,
        item_type_id: ItemType.ITEM_TYPE_ENGINE,
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
