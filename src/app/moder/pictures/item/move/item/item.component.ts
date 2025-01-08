import {AsyncPipe} from '@angular/common';
import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {
  GetItemParentsRequest,
  ItemFields,
  ItemParent,
  ItemParentFields,
  ItemParentListOptions,
  ItemParentType,
  PictureItemType,
} from '@grpc/spec.pb';
import {ItemsClient} from '@grpc/spec.pbsc';
import {LanguageService} from '@services/language';
import {BehaviorSubject, EMPTY, Observable} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';

import {PictureItemMoveSelection} from '../move.component';

interface ListItem {
  expanded: boolean;
  row: ItemParent;
}

@Component({
  imports: [AsyncPipe],
  selector: 'app-moder-picture-move-item',
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
  templateUrl: './item.component.html',
})
export class ModerPictureMoveItemComponent {
  readonly #itemsClient = inject(ItemsClient);
  readonly #languageService = inject(LanguageService);

  @Input() set item(item: ItemParent) {
    this.item$.next({
      expanded: false,
      row: item,
    });
  }
  protected readonly item$ = new BehaviorSubject<ListItem | null>(null);

  @Output() readonly selected = new EventEmitter<PictureItemMoveSelection>();

  protected readonly childs$: Observable<ItemParent[]> = this.item$.pipe(
    switchMap((item) =>
      item
        ? this.#itemsClient.getItemParents(
            new GetItemParentsRequest({
              fields: new ItemParentFields({
                item: new ItemFields({
                  childsCount: true,
                  nameHtml: true,
                }),
              }),
              language: this.#languageService.language,
              limit: 500,
              options: new ItemParentListOptions({
                parentId: item.row.itemId,
              }),
              order: GetItemParentsRequest.Order.AUTO,
            }),
          )
        : EMPTY,
    ),
    map((response) => response.items || []),
  );

  protected readonly PictureItemType = PictureItemType;
  protected readonly ItemParentType = ItemParentType;

  protected toggleItem(item: ListItem) {
    item.expanded = !item.expanded;
    return false;
  }

  protected selectItem(selection: PictureItemMoveSelection) {
    this.selected.emit(selection);
    return false;
  }
}
