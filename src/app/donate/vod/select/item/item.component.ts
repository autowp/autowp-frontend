import {AsyncPipe} from '@angular/common';
import {Component, inject, Input} from '@angular/core';
import {RouterLink} from '@angular/router';
import {
  APIItem,
  ItemFields,
  ItemListOptions,
  ItemParent,
  ItemParentListOptions,
  ItemParentsRequest,
  ItemParentType,
  ItemRequest,
  ItemType,
} from '@grpc/spec.pb';
import {ItemsClient} from '@grpc/spec.pbsc';
import {LanguageService} from '@services/language';
import {BehaviorSubject, EMPTY, Observable} from 'rxjs';
import {catchError, map, shareReplay, switchMap} from 'rxjs/operators';

import {ToastsService} from '../../../../toasts/toasts.service';

@Component({
  imports: [RouterLink, AsyncPipe],
  selector: 'app-donate-vod-select-item',
  styleUrls: ['./styles.scss'],
  templateUrl: './item.component.html',
})
export class DonateVodSelectItemComponent {
  readonly #toastService = inject(ToastsService);
  readonly #itemsClient = inject(ItemsClient);
  readonly #languageService = inject(LanguageService);

  @Input() set itemParent(itemParent: ItemParent) {
    this.itemParent$.next(itemParent);
  }
  protected readonly itemParent$ = new BehaviorSubject<ItemParent | null>(null);
  protected expanded = false;

  protected readonly item$: Observable<APIItem> = this.itemParent$.pipe(
    switchMap((itemParent) =>
      itemParent
        ? this.#itemsClient.item(
            new ItemRequest({
              fields: new ItemFields({
                childsCount: true,
                isCompilesItemOfDay: true,
                nameHtml: true,
              }),
              id: itemParent.itemId,
              language: this.#languageService.language,
            }),
          )
        : EMPTY,
    ),
  );

  protected readonly childs$: Observable<ItemParent[]> = this.itemParent$.pipe(
    switchMap((itemParent) =>
      itemParent
        ? this.#itemsClient.getItemParents(
            new ItemParentsRequest({
              language: this.#languageService.language,
              options: new ItemParentListOptions({
                item: new ItemListOptions({
                  typeId: ItemType.ITEM_TYPE_VEHICLE,
                }),
                parentId: itemParent.itemId,
              }),
              order: ItemParentsRequest.Order.AUTO,
            }),
          )
        : EMPTY,
    ),
    catchError((e: unknown) => {
      this.#toastService.handleError(e);
      return EMPTY;
    }),
    map((items) => items.items || []),
    shareReplay({bufferSize: 1, refCount: false}),
  );

  protected toggleItem() {
    this.expanded = !this.expanded;

    return false;
  }

  protected readonly ItemParentType = ItemParentType;
}
