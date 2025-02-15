import {AsyncPipe} from '@angular/common';
import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {ItemFields, ItemParent, ItemParentsRequest, ItemRequest} from '@grpc/spec.pb';
import {ItemsClient} from '@grpc/spec.pbsc';
import {LanguageService} from '@services/language';
import {BehaviorSubject, EMPTY} from 'rxjs';
import {switchMap} from 'rxjs/operators';

import {ModerItemsItemSelectParentTreeItemComponent} from '../tree-item/tree-item.component';

@Component({
  imports: [ModerItemsItemSelectParentTreeItemComponent, AsyncPipe],
  selector: 'app-moder-items-item-select-parent-tree',
  templateUrl: './tree.component.html',
})
export class ModerItemsItemSelectParentTreeComponent {
  readonly #itemsClient = inject(ItemsClient);
  readonly #languageService = inject(LanguageService);

  @Input() set itemParent(value: ItemParent) {
    this.itemParent$.next(value);
  }
  protected readonly itemParent$ = new BehaviorSubject<ItemParent | null>(null);

  @Input() order?: ItemParentsRequest.Order;
  @Input() disableItemID?: string;
  @Output() selected = new EventEmitter<string>();

  protected readonly item$ = this.itemParent$.pipe(
    switchMap((item) =>
      item
        ? this.#itemsClient.item(
            new ItemRequest({
              fields: new ItemFields({childsCount: true, nameHtml: true}),
              id: item.itemId,
              language: this.#languageService.language,
            }),
          )
        : EMPTY,
    ),
  );

  protected onSelect(itemID: string) {
    this.selected.emit(itemID);
    return false;
  }

  protected readonly ItemParentsRequest = ItemParentsRequest;
}
