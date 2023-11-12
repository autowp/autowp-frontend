import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {APIItem as GRPCAPIItem, ItemFields, ItemType, ListItemsRequest, Pages} from '@grpc/spec.pb';
import {ItemsClient} from '@grpc/spec.pbsc';
import {APIItem} from '@services/item';
import {ItemParentService} from '@services/item-parent';
import {LanguageService} from '@services/language';
import {BehaviorSubject, EMPTY, Observable, combineLatest, of} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, map, shareReplay, switchMap} from 'rxjs/operators';

import {chunk} from '../../../../../chunk';
import {ToastsService} from '../../../../../toasts/toasts.service';

@Component({
  selector: 'app-moder-items-item-select-parent-catalogue',
  templateUrl: './catalogue.component.html',
})
export class ModerItemsItemSelectParentCatalogueComponent {
  @Output() selected = new EventEmitter<APIItem>();

  @Input() set itemID(value: number) {
    this.itemID$.next(value);
  }
  protected readonly itemID$ = new BehaviorSubject<number>(null);

  @Input() set itemTypeID(value: number) {
    this.itemTypeID$.next(value);
  }
  protected readonly itemTypeID$ = new BehaviorSubject<number>(null);

  protected readonly page$ = this.route.queryParamMap.pipe(
    map((params) => parseInt(params.get('page'), 10)),
    map((page) => (page ? page : 0)),
    distinctUntilChanged(),
    shareReplay(1),
  );

  protected readonly search$ = this.route.queryParamMap.pipe(
    map((params) => params.get('search')),
    distinctUntilChanged(),
    debounceTime(10),
  );

  protected readonly brandID$ = this.route.queryParamMap.pipe(
    map((params) => parseInt(params.get('brand_id'), 10)),
    map((brandID) => (brandID ? brandID : 0)),
    distinctUntilChanged(),
    shareReplay(1),
  );

  protected readonly catalogueBrands$: Observable<{brands: GRPCAPIItem[][]; paginator: Pages}> = this.brandID$.pipe(
    switchMap((brandID) =>
      brandID
        ? of(null)
        : combineLatest([this.itemTypeID$, this.search$, this.page$]).pipe(
            switchMap(([itemTypeID, search, page]) =>
              this.itemsClient.list(
                new ListItemsRequest({
                  descendant: new ListItemsRequest({
                    typeId: itemTypeID,
                  }),
                  fields: new ItemFields({nameHtml: true}),
                  language: this.languageService.language,
                  limit: 500,
                  name: search ? '%' + search + '%' : null,
                  order: ListItemsRequest.Order.NAME,
                  page,
                  typeId: ItemType.ITEM_TYPE_BRAND,
                }),
              ),
            ),
            catchError((error: unknown) => {
              this.toastService.handleError(error);
              return EMPTY;
            }),
            map((response) => ({
              brands: chunk<GRPCAPIItem>(response.items, 6),
              paginator: response.paginator,
            })),
          ),
    ),
  );

  protected readonly catalogueItems$ = combineLatest([this.itemTypeID$, this.brandID$, this.page$]).pipe(
    switchMap(([itemTypeID, brandID, page]) =>
      brandID
        ? this.itemParentService.getItems$({
            fields: 'item.name_html,item.childs_count',
            is_group: true,
            item_type_id: itemTypeID,
            limit: 100,
            page,
            parent_id: brandID,
          })
        : of(null),
    ),
  );

  constructor(
    private readonly route: ActivatedRoute,
    private readonly toastService: ToastsService,
    private readonly router: Router,
    private readonly itemParentService: ItemParentService,
    private readonly itemsClient: ItemsClient,
    private readonly languageService: LanguageService,
  ) {}

  protected doSearch(search: string) {
    this.router.navigate([], {
      queryParams: {search},
      queryParamsHandling: 'merge',
    });
  }

  protected onSelect(item: APIItem) {
    this.selected.emit(item);
    return false;
  }
}
