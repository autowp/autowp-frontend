import {AsyncPipe} from '@angular/common';
import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {
  APIItem,
  GetItemParentsRequest,
  ItemFields,
  ItemListOptions,
  ItemParentCacheListOptions,
  ItemParentListOptions,
  ItemType,
  ListItemsRequest,
  Pages,
} from '@grpc/spec.pb';
import {ItemsClient} from '@grpc/spec.pbsc';
import {LanguageService} from '@services/language';
import {BehaviorSubject, combineLatest, EMPTY, Observable, of} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, map, shareReplay, switchMap} from 'rxjs/operators';

import {chunk} from '../../../../../chunk';
import {PaginatorComponent} from '../../../../../paginator/paginator/paginator.component';
import {ToastsService} from '../../../../../toasts/toasts.service';
import {ModerItemsItemSelectParentTreeComponent} from '../tree/tree.component';

@Component({
  imports: [RouterLink, PaginatorComponent, ModerItemsItemSelectParentTreeComponent, AsyncPipe],
  selector: 'app-moder-items-item-select-parent-catalogue',
  templateUrl: './catalogue.component.html',
})
export class ModerItemsItemSelectParentCatalogueComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly toastService = inject(ToastsService);
  private readonly router = inject(Router);
  private readonly itemsClient = inject(ItemsClient);
  private readonly languageService = inject(LanguageService);

  @Output() selected = new EventEmitter<string>();

  @Input() set itemID(value: string) {
    this.itemID$.next(value);
  }
  protected readonly itemID$ = new BehaviorSubject<null | string>(null);

  @Input() set itemTypeID(value: ItemType) {
    this.itemTypeID$.next(value);
  }
  protected readonly itemTypeID$ = new BehaviorSubject<null | ItemType>(null);

  protected readonly page$ = this.route.queryParamMap.pipe(
    map((params) => parseInt(params.get('page') ?? '', 10)),
    map((page) => (page ? page : 0)),
    distinctUntilChanged(),
    shareReplay({bufferSize: 1, refCount: false}),
  );

  protected readonly search$ = this.route.queryParamMap.pipe(
    map((params) => params.get('search')),
    distinctUntilChanged(),
    debounceTime(10),
  );

  protected readonly brandID$ = this.route.queryParamMap.pipe(
    map((params) => params.get('brand_id') ?? ''),
    map((brandID) => (brandID ? brandID : null)),
    distinctUntilChanged(),
    shareReplay({bufferSize: 1, refCount: false}),
  );

  protected readonly catalogueBrands$: Observable<{brands: APIItem[][]; paginator?: Pages} | null> = this.brandID$.pipe(
    switchMap((brandID) =>
      brandID
        ? of(null)
        : combineLatest([this.itemTypeID$, this.search$, this.page$]).pipe(
            switchMap(([itemTypeID, search, page]) =>
              this.itemsClient.list(
                new ListItemsRequest({
                  fields: new ItemFields({nameHtml: true}),
                  language: this.languageService.language,
                  limit: 500,
                  options: new ItemListOptions({
                    descendant: new ItemParentCacheListOptions({
                      itemParentByItemId: new ItemParentListOptions({
                        parent: new ItemListOptions({
                          typeId: itemTypeID ? itemTypeID : undefined,
                        }),
                      }),
                    }),
                    name: search ? '%' + search + '%' : undefined,
                    typeId: ItemType.ITEM_TYPE_BRAND,
                  }),
                  order: ListItemsRequest.Order.NAME,
                  page,
                }),
              ),
            ),
            catchError((error: unknown) => {
              this.toastService.handleError(error);
              return EMPTY;
            }),
            map((response) => ({
              brands: chunk<APIItem>(response.items ? response.items : [], 6),
              paginator: response.paginator,
            })),
          ),
    ),
  );

  protected readonly catalogueItems$ = combineLatest([this.itemTypeID$, this.brandID$, this.page$]).pipe(
    switchMap(([itemTypeID, brandID, page]) =>
      brandID
        ? this.itemsClient.getItemParents(
            new GetItemParentsRequest({
              language: this.languageService.language,
              options: new ItemParentListOptions({
                parentId: brandID,
                item: new ItemListOptions({
                  typeId: itemTypeID ? itemTypeID : undefined,
                  isGroup: true,
                }),
              }),
              limit: 100,
              page,
              order: GetItemParentsRequest.Order.AUTO,
            }),
          )
        : of(null),
    ),
  );

  protected doSearch(search: string) {
    this.router.navigate([], {
      queryParams: {search},
      queryParamsHandling: 'merge',
    });
  }

  protected onSelect(itemID: string) {
    this.selected.emit(itemID);
    return false;
  }

  protected readonly GetItemParentsRequest = GetItemParentsRequest;
}
