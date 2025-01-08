import {AsyncPipe} from '@angular/common';
import {Component, inject, Input} from '@angular/core';
import {RouterLink} from '@angular/router';
import {
  GetItemParentsRequest,
  ItemFields,
  ItemParent,
  ItemParentFields,
  ItemParentListOptions,
  ItemParentType,
} from '@grpc/spec.pb';
import {ItemsClient} from '@grpc/spec.pbsc';
import {LanguageService} from '@services/language';
import {BehaviorSubject, EMPTY, Observable} from 'rxjs';
import {catchError, map, switchMap} from 'rxjs/operators';

import {ToastsService} from '../../../toasts/toasts.service';

@Component({
  imports: [RouterLink, AsyncPipe],
  selector: 'app-upload-select-tree-item',
  templateUrl: './tree-item.component.html',
})
export class UploadSelectTreeItemComponent {
  private readonly toastService = inject(ToastsService);
  readonly #itemsClient = inject(ItemsClient);
  readonly #languageService = inject(LanguageService);

  @Input() set item(item: ItemParent) {
    this.item$.next(item);
  }
  protected readonly item$ = new BehaviorSubject<ItemParent | null>(null);

  protected open = false;

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
                parentId: item.itemId,
              }),
              order: GetItemParentsRequest.Order.AUTO,
            }),
          )
        : EMPTY,
    ),
    catchError((response: unknown) => {
      this.toastService.handleError(response);
      return EMPTY;
    }),
    map((response) => response.items || []),
  );
  protected readonly ItemParent = ItemParent;
  protected readonly ItemParentType = ItemParentType;
}
