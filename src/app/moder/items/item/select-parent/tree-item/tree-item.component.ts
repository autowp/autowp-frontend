import {AsyncPipe} from '@angular/common';
import {Component, forwardRef, inject, input, output} from '@angular/core';
import {toObservable} from '@angular/core/rxjs-interop';
import {
  APIItem,
  ItemListOptions,
  ItemParent,
  ItemParentListOptions,
  ItemParentsRequest,
  ItemParentType,
} from '@grpc/spec.pb';
import {ItemsClient} from '@grpc/spec.pbsc';
import {LanguageService} from '@services/language';
import {combineLatest, EMPTY, Observable} from 'rxjs';
import {catchError, distinctUntilChanged, map, switchMap} from 'rxjs/operators';

import {ToastsService} from '../../../../../toasts/toasts.service';
import {ModerItemsItemSelectParentTreeComponent} from '../tree/tree.component';

@Component({
  imports: [forwardRef(() => ModerItemsItemSelectParentTreeComponent), AsyncPipe],
  selector: 'app-moder-items-item-select-parent-tree-item',
  templateUrl: './tree-item.component.html',
})
export class ModerItemsItemSelectParentTreeItemComponent {
  readonly #toastService = inject(ToastsService);
  readonly #itemsClient = inject(ItemsClient);
  readonly #languageService = inject(LanguageService);

  readonly item = input.required<APIItem>();
  protected readonly item$ = toObservable(this.item);

  readonly order = input.required<ItemParentsRequest.Order>();
  protected readonly order$ = toObservable(this.order);

  readonly disableItemID = input.required<string>();
  readonly typeID = input<ItemParentType>(ItemParentType.ITEM_TYPE_DEFAULT);
  readonly selected = output<string>();

  protected open = false;

  protected readonly childs$: Observable<ItemParent[]> = combineLatest([
    this.item$,
    this.order$.pipe(distinctUntilChanged()),
  ]).pipe(
    switchMap(([item, order]) =>
      item
        ? this.#itemsClient.getItemParents(
            new ItemParentsRequest({
              language: this.#languageService.language,
              options: new ItemParentListOptions({
                item: new ItemListOptions({
                  isGroup: true,
                }),
                parentId: item.id,
              }),
              order,
            }),
          )
        : EMPTY,
    ),
    catchError((error: unknown) => {
      this.#toastService.handleError(error);
      return EMPTY;
    }),
    map((response) => response.items || []),
  );

  protected isDisabled(item: APIItem): boolean {
    return item.id === this.disableItemID();
  }

  protected onSelect(itemID: string) {
    this.selected.emit(itemID);
    return false;
  }

  protected toggle(): boolean {
    this.open = !this.open;
    return false;
  }

  protected readonly ItemParentType = ItemParentType;
  protected readonly ItemParentsRequest = ItemParentsRequest;
}
