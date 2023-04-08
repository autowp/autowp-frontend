import {Component, EventEmitter, Input, Output} from '@angular/core';
import {BehaviorSubject, combineLatest, EMPTY, of} from 'rxjs';
import {APIItem, ItemService} from '@services/item';
import {catchError, debounceTime, distinctUntilChanged, map, shareReplay, switchMap} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastsService} from '../../../../../toasts/toasts.service';
import {chunk} from '../../../../../chunk';
import {ItemParentService} from '@services/item-parent';
import {ItemType} from '@grpc/spec.pb';

@Component({
  selector: 'app-moder-items-item-select-parent-catalogue',
  templateUrl: './catalogue.component.html',
})
export class ModerItemsItemSelectParentCatalogueComponent {
  @Output() selected = new EventEmitter<APIItem>();

  @Input() set itemID(value: number) {
    this.itemID$.next(value);
  }
  public itemID$ = new BehaviorSubject<number>(null);

  @Input() set itemTypeID(value: number) {
    this.itemTypeID$.next(value);
  }
  public itemTypeID$ = new BehaviorSubject<number>(null);

  public page$ = this.route.queryParamMap.pipe(
    map((params) => parseInt(params.get('page'), 10)),
    map((page) => (page ? page : 0)),
    distinctUntilChanged(),
    shareReplay(1)
  );

  public search$ = this.route.queryParamMap.pipe(
    map((params) => params.get('search')),
    distinctUntilChanged(),
    debounceTime(10)
  );

  public brandID$ = this.route.queryParamMap.pipe(
    map((params) => parseInt(params.get('brand_id'), 10)),
    map((brandID) => (brandID ? brandID : 0)),
    distinctUntilChanged(),
    shareReplay(1)
  );

  public catalogueBrands$ = this.brandID$.pipe(
    switchMap((brandID) =>
      brandID
        ? of(null)
        : combineLatest([this.itemTypeID$, this.search$, this.page$]).pipe(
            switchMap(([itemTypeID, search, page]) =>
              this.itemService.getItems$({
                type_id: ItemType.ITEM_TYPE_BRAND,
                limit: 500,
                fields: 'name_html',
                have_childs_of_type: itemTypeID,
                name: search ? '%' + search + '%' : null,
                page,
              })
            ),
            catchError((error: unknown) => {
              this.toastService.handleError(error);
              return EMPTY;
            }),
            map((response) => ({
              brands: chunk<APIItem>(response.items, 6),
              paginator: response.paginator,
            }))
          )
    )
  );

  public catalogueItems$ = combineLatest([this.itemTypeID$, this.brandID$, this.page$]).pipe(
    switchMap(([itemTypeID, brandID, page]) =>
      brandID
        ? this.itemParentService.getItems$({
            limit: 100,
            fields: 'item.name_html,item.childs_count',
            parent_id: brandID,
            is_group: true,
            item_type_id: itemTypeID,
            page,
          })
        : of(null)
    )
  );

  constructor(
    private itemService: ItemService,
    private route: ActivatedRoute,
    private toastService: ToastsService,
    private router: Router,
    private itemParentService: ItemParentService
  ) {}

  public doSearch(search: string) {
    this.router.navigate([], {
      queryParams: {search},
      queryParamsHandling: 'merge',
    });
  }

  public onSelect(item: APIItem) {
    this.selected.emit(item);
    return false;
  }
}
