import {AsyncPipe} from '@angular/common';
import {ChangeDetectionStrategy, Component, inject, input, output} from '@angular/core';
import {toObservable} from '@angular/core/rxjs-interop';
import {ItemFields, ItemParent, ItemParentsRequest, ItemRequest} from '@grpc/spec.pb';
import {ItemsClient} from '@grpc/spec.pbsc';
import {LanguageService} from '@services/language';
import {EMPTY} from 'rxjs';
import {switchMap} from 'rxjs/operators';

import {ModerItemsItemSelectParentTreeItemComponent} from '../tree-item/tree-item.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ModerItemsItemSelectParentTreeItemComponent, AsyncPipe],
  selector: 'app-moder-items-item-select-parent-tree',
  templateUrl: './tree.component.html',
})
export class ModerItemsItemSelectParentTreeComponent {
  readonly #itemsClient = inject(ItemsClient);
  readonly #languageService = inject(LanguageService);

  readonly itemParent = input.required<ItemParent>();
  protected readonly itemParent$ = toObservable(this.itemParent);

  readonly order = input.required<ItemParentsRequest.Order>();
  readonly disableItemID = input.required<string>();
  readonly selected = output<string>();

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
