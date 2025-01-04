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
import {BehaviorSubject, EMPTY, Observable} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';

import {PictureItemMoveSelection} from '../move.component';
import {ItemsClient} from '@grpc/spec.pbsc';
import {LanguageService} from '@services/language';

interface ListItem {
  row: ItemParent;
  expanded: boolean;
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
      row: item,
      expanded: false,
    });
  }
  protected readonly item$ = new BehaviorSubject<ListItem | null>(null);

  @Output() readonly selected = new EventEmitter<PictureItemMoveSelection>();

  protected readonly childs$: Observable<ItemParent[]> = this.item$.pipe(
    switchMap((item) =>
      item
        ? this.#itemsClient.getItemParents(
            new GetItemParentsRequest({
              language: this.#languageService.language,
              options: new ItemParentListOptions({
                parentId: item.row.itemId,
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
