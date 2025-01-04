import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {
  GetItemParentsRequest,
  ItemFields,
  ItemListOptions,
  ItemParent,
  ItemParentFields,
  ItemParentListOptions,
  ItemParentType,
  ItemType,
} from '@grpc/spec.pb';

import {ToastsService} from '../../../../../toasts/toasts.service';
import {ItemsClient} from '@grpc/spec.pbsc';
import {LanguageService} from '@services/language';

@Component({
  selector: 'app-cars-select-engine-tree-item',
  standalone: true,
  templateUrl: './tree-item.component.html',
})
export class CarsSelectEngineTreeItemComponent {
  private readonly toastService = inject(ToastsService);
  readonly #itemsClient = inject(ItemsClient);
  readonly #languageService = inject(LanguageService);

  @Input() item?: ItemParent;
  @Output() selected = new EventEmitter<string>();

  protected open = false;
  protected loading = false;
  protected childs: ItemParent[] = [];

  private loadChildCatalogues() {
    this.loading = true;
    if (this.item) {
      this.#itemsClient
        .getItemParents(
          new GetItemParentsRequest({
            language: this.#languageService.language,
            options: new ItemParentListOptions({
              parentId: this.item.itemId,
              item: new ItemListOptions({
                typeId: ItemType.ITEM_TYPE_ENGINE,
              }),
            }),
            limit: 500,
            order: GetItemParentsRequest.Order.AUTO,
            fields: new ItemParentFields({
              item: new ItemFields({
                nameHtml: true,
                childsCount: true,
              }),
            }),
          }),
        )
        .subscribe({
          error: (response: unknown) => {
            this.toastService.handleError(response);
            this.loading = false;
          },
          next: (response) => {
            this.childs = response.items || [];
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

  protected readonly ItemParentType = ItemParentType;
}
