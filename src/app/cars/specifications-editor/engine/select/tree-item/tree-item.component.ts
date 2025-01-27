import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {
  ItemFields,
  ItemListOptions,
  ItemParent,
  ItemParentFields,
  ItemParentListOptions,
  ItemParentsRequest,
  ItemParentType,
  ItemType,
} from '@grpc/spec.pb';
import {ItemsClient} from '@grpc/spec.pbsc';
import {LanguageService} from '@services/language';

import {ToastsService} from '../../../../../toasts/toasts.service';

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
          new ItemParentsRequest({
            fields: new ItemParentFields({
              item: new ItemFields({
                childsCount: true,
                nameHtml: true,
              }),
            }),
            language: this.#languageService.language,
            limit: 500,
            options: new ItemParentListOptions({
              item: new ItemListOptions({
                typeId: ItemType.ITEM_TYPE_ENGINE,
              }),
              parentId: this.item.itemId,
            }),
            order: ItemParentsRequest.Order.AUTO,
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
