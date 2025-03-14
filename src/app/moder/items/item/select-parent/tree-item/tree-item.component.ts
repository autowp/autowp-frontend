import {AsyncPipe} from '@angular/common';
import {Component, EventEmitter, forwardRef, inject, Input, Output} from '@angular/core';
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
import {BehaviorSubject, combineLatest, EMPTY, Observable} from 'rxjs';
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

  @Input() set item(value: APIItem) {
    this.item$.next(value);
  }
  protected readonly item$ = new BehaviorSubject<APIItem | null>(null);

  @Input() set order(value: ItemParentsRequest.Order) {
    this.order$.next(value);
  }
  protected readonly order$ = new BehaviorSubject<ItemParentsRequest.Order>(ItemParentsRequest.Order.AUTO);

  @Input() disableItemID: string = '';
  @Input() typeID: ItemParentType = ItemParentType.ITEM_TYPE_DEFAULT;
  @Output() selected = new EventEmitter<string>();

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
    return item.id === this.disableItemID;
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
