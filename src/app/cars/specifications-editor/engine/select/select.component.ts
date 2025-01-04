import {AsyncPipe} from '@angular/common';
import {Component, inject} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {
  APIItem,
  GetItemParentsRequest,
  ItemFields,
  ItemListOptions,
  ItemParent,
  ItemParentCacheListOptions,
  ItemParentFields,
  ItemParentListOptions,
  ItemRequest,
  ItemType,
  ListItemsRequest,
  Pages,
  SetItemEngineRequest,
} from '@grpc/spec.pb';
import {ItemsClient} from '@grpc/spec.pbsc';
import {LanguageService} from '@services/language';
import {PageEnvService} from '@services/page-env.service';
import {BehaviorSubject, combineLatest, EMPTY, Observable} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, map, shareReplay, switchMap, tap} from 'rxjs/operators';

import {chunk} from '../../../../chunk';
import {PaginatorComponent} from '../../../../paginator/paginator/paginator.component';
import {ToastsService} from '../../../../toasts/toasts.service';
import {CarsSelectEngineTreeItemComponent} from './tree-item/tree-item.component';

@Component({
  imports: [RouterLink, CarsSelectEngineTreeItemComponent, FormsModule, PaginatorComponent, AsyncPipe],
  selector: 'app-cars-engine-select',
  templateUrl: './select.component.html',
})
export class CarsEngineSelectComponent {
  private readonly itemsClient = inject(ItemsClient);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly pageEnv = inject(PageEnvService);
  private readonly toastService = inject(ToastsService);
  private readonly languageService = inject(LanguageService);

  protected search: string = '';
  private readonly search$ = new BehaviorSubject<string>('');

  protected readonly itemID$ = this.route.queryParamMap.pipe(
    map((params) => params.get('item_id') ?? ''),
    distinctUntilChanged(),
    debounceTime(10),
    shareReplay({bufferSize: 1, refCount: false}),
  );

  protected readonly brandID$ = this.route.queryParamMap.pipe(
    map((params) => params.get('brand_id') ?? ''),
    distinctUntilChanged(),
    debounceTime(10),
  );

  private readonly page$ = this.route.queryParamMap.pipe(
    map((params) => parseInt(params.get('page') ?? '', 10)),
    distinctUntilChanged(),
    debounceTime(10),
  );

  protected readonly item$ = this.itemID$.pipe(
    switchMap((itemID) =>
      this.itemsClient.item(
        new ItemRequest({
          fields: new ItemFields({nameText: true}),
          id: itemID,
          language: this.languageService.language,
        }),
      ),
    ),
    tap((item) => {
      this.pageEnv.set({
        pageId: 102,
        title: $localize`Specs editor of ${item.nameText}`,
      });
    }),
    shareReplay({bufferSize: 1, refCount: false}),
  );

  protected readonly items$: Observable<ItemParent[]> = combineLatest([this.brandID$, this.page$]).pipe(
    switchMap(([brandID, page]) =>
      this.itemsClient.getItemParents(
        new GetItemParentsRequest({
          language: this.languageService.language,
          options: new ItemParentListOptions({
            parentId: brandID,
            item: new ItemListOptions({
              typeId: ItemType.ITEM_TYPE_ENGINE,
            }),
          }),
          limit: 500,
          order: GetItemParentsRequest.Order.AUTO,
          fields: new ItemParentFields({
            item: new ItemFields({
              nameHtml: true,
              childsCount: true,
            }),
          }),
          page,
        }),
      ),
    ),
    catchError((response: unknown) => {
      this.toastService.handleError(response);
      return EMPTY;
    }),
    map((response) => response.items || []),
  );

  protected readonly brands$: Observable<{items: APIItem[][]; paginator?: Pages}> = this.search$.pipe(
    map((str) => str.trim()),
    distinctUntilChanged(),
    debounceTime(50),
    switchMap((search) =>
      this.itemsClient.list(
        new ListItemsRequest({
          fields: new ItemFields({nameOnly: true}),
          language: this.languageService.language,
          limit: 500,
          options: new ItemListOptions({
            descendant: new ItemParentCacheListOptions({
              itemsByItemId: new ItemListOptions({
                typeId: ItemType.ITEM_TYPE_ENGINE,
              }),
            }),
            name: search ? '%' + search + '%' : undefined,
            typeId: ItemType.ITEM_TYPE_BRAND,
          }),
          order: ListItemsRequest.Order.NAME,
        }),
      ),
    ),
    catchError((response: unknown) => {
      this.toastService.handleError(response);
      return EMPTY;
    }),
    map((response) => ({
      items: chunk<APIItem>(response.items ? response.items : [], 6),
      paginator: response.paginator,
    })),
  );

  protected onInput() {
    this.search$.next(this.search);
  }

  protected selectEngine(itemID: string, engineId: string) {
    this.itemsClient
      .setItemEngine(
        new SetItemEngineRequest({
          itemId: itemID,
          engineItemId: engineId,
          engineInherited: false,
        }),
      )
      .pipe(
        catchError((response: unknown) => {
          this.toastService.handleError(response);
          return EMPTY;
        }),
      )
      .subscribe(() => {
        this.router.navigate(['/cars/specifications-editor'], {
          queryParams: {
            item_id: itemID,
            tab: 'engine',
          },
        });
      });
  }
}
