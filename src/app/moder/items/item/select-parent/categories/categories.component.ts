import {AsyncPipe} from '@angular/common';
import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {APIItemList, ItemFields, ItemListOptions, ItemType, ListItemsRequest} from '@grpc/spec.pb';
import {ItemsClient} from '@grpc/spec.pbsc';
import {LanguageService} from '@services/language';
import {BehaviorSubject, EMPTY, Observable} from 'rxjs';
import {catchError, distinctUntilChanged, map, shareReplay, switchMap} from 'rxjs/operators';

import {PaginatorComponent} from '../../../../../paginator/paginator/paginator.component';
import {ToastsService} from '../../../../../toasts/toasts.service';
import {ModerItemsItemSelectParentTreeItemComponent} from '../tree-item/tree-item.component';

@Component({
  imports: [ModerItemsItemSelectParentTreeItemComponent, PaginatorComponent, AsyncPipe],
  selector: 'app-moder-items-item-select-parent-categories',
  templateUrl: './categories.component.html',
})
export class ModerItemsItemSelectParentCategoriesComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly toastService = inject(ToastsService);
  private readonly itemsClient = inject(ItemsClient);
  private readonly languageService = inject(LanguageService);

  @Output() selected = new EventEmitter<string>();

  @Input() set itemID(value: string) {
    this.itemID$.next(value);
  }
  protected readonly itemID$ = new BehaviorSubject<null | string>(null);

  protected readonly page$ = this.route.queryParamMap.pipe(
    map((params) => parseInt(params.get('page') ?? '', 10)),
    map((page) => (page ? page : 0)),
    distinctUntilChanged(),
    shareReplay({bufferSize: 1, refCount: false}),
  );

  protected readonly categories$: Observable<APIItemList> = this.page$.pipe(
    switchMap((page) =>
      this.itemsClient.list(
        new ListItemsRequest({
          fields: new ItemFields({childsCount: true, nameHtml: true}),
          language: this.languageService.language,
          limit: 100,
          options: new ItemListOptions({
            noParent: true,
            typeId: ItemType.ITEM_TYPE_CATEGORY,
          }),
          page,
        }),
      ),
    ),
    catchError((error: unknown) => {
      this.toastService.handleError(error);
      return EMPTY;
    }),
  );

  protected onSelect(itemID: string) {
    this.selected.emit(itemID);
    return false;
  }
}
