import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {
  APIItem,
  APIItemList,
  APIItem as GRPCAPIItem,
  ItemFields,
  ItemRequest,
  ItemType,
  ListItemsRequest,
  Pages,
} from '@grpc/spec.pb';
import {ItemsClient} from '@grpc/spec.pbsc';
import {APIItemParent, ItemParentService} from '@services/item-parent';
import {LanguageService} from '@services/language';
import {PageEnvService} from '@services/page-env.service';
import {BehaviorSubject, EMPTY, Observable, combineLatest, forkJoin, of} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, map, switchMap, tap} from 'rxjs/operators';

import {chunk} from '../../chunk';
import {ToastsService} from '../../toasts/toasts.service';

import Order = ListItemsRequest.Order;

@Component({
  selector: 'app-upload-select',
  templateUrl: './select.component.html',
})
export class UploadSelectComponent implements OnInit {
  protected brand: {
    concepts: APIItemParent[];
    engines: APIItemParent[];
    item: GRPCAPIItem;
    vehicles: APIItemParent[];
  };
  protected brands: APIItem[][];
  protected paginator: Pages;
  protected search = '';
  protected readonly search$ = new BehaviorSubject<string>('');
  protected loading = 0;
  protected conceptsOpen = false;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly itemParentService: ItemParentService,
    private readonly pageEnv: PageEnvService,
    private readonly toastService: ToastsService,
    private readonly itemsClient: ItemsClient,
    private readonly languageService: LanguageService,
  ) {}

  protected onSearchInput() {
    this.search$.next(this.search);
  }

  ngOnInit(): void {
    setTimeout(() => this.pageEnv.set({pageId: 30}), 0);

    combineLatest([
      this.search$.pipe(
        map((value) => value.trim()),
        distinctUntilChanged(),
        debounceTime(50),
      ),
      this.route.queryParamMap.pipe(
        map((params) => ({
          brandId: params.get('brand_id'),
          page: parseInt(params.get('page'), 10),
        })),
      ),
    ])
      .pipe(
        map(([search, query]) => ({brandId: query.brandId, page: query.page, search})),
        distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
        tap(() => {
          this.loading = 1;
          this.brand = null;
        }),
        switchMap((params) => {
          const brandId = params.brandId;
          const page = params.page;

          return forkJoin([
            brandId ? this.brandObservable$(brandId) : of(null),
            brandId ? of(null) : this.brandsObservable$(page, params.search),
          ]);
        }),
        tap(() => (this.loading = 0)),
      )
      .subscribe(([brand, brands]) => {
        if (brands) {
          this.brands = chunk(brands.items, 6);
          this.paginator = brands.paginator;
        }
        if (brand) {
          this.brand = brand;
        }
      });
  }

  private brandsObservable$(page: number, search: string): Observable<APIItemList> {
    return this.itemsClient
      .list(
        new ListItemsRequest({
          fields: new ItemFields({
            nameOnly: true,
          }),
          language: this.languageService.language,
          limit: 500,
          name: search ? '%' + search + '%' : null,
          order: Order.NAME,
          page,
          typeId: ItemType.ITEM_TYPE_BRAND,
        }),
      )
      .pipe(
        catchError((err: unknown) => {
          this.toastService.handleError(err);
          return EMPTY;
        }),
      );
  }

  private brandObservable$(brandId: string): Observable<{
    concepts: APIItemParent[];
    engines: APIItemParent[];
    item: GRPCAPIItem;
    vehicles: APIItemParent[];
  }> {
    return this.itemsClient.item(new ItemRequest({id: brandId, language: this.languageService.language})).pipe(
      catchError(() => {
        this.router.navigate(['/error-404'], {
          skipLocationChange: true,
        });
        return EMPTY;
      }),
      switchMap((item) => this.brandItemsObservable(item)),
      map(([item, vehicles, engines, concepts]) => ({concepts, engines, item, vehicles})),
    );
  }

  private brandItemsObservable(item: GRPCAPIItem) {
    return forkJoin([
      of(item),
      this.itemParentService
        .getItems$({
          exclude_concept: true,
          fields: 'item.name_html,item.childs_count',
          item_type_id: ItemType.ITEM_TYPE_VEHICLE,
          limit: 500,
          order: 'name',
          parent_id: +item.id,
        })
        .pipe(
          map((response) => response.items),
          catchError((err: unknown) => {
            this.toastService.handleError(err);
            return EMPTY;
          }),
        ),
      this.itemParentService
        .getItems$({
          exclude_concept: true,
          fields: 'item.name_html,item.childs_count',
          item_type_id: ItemType.ITEM_TYPE_ENGINE,
          limit: 500,
          order: 'name',
          parent_id: +item.id,
        })
        .pipe(
          map((response) => response.items),
          catchError((err: unknown) => {
            this.toastService.handleError(err);
            return EMPTY;
          }),
        ),
      this.itemParentService
        .getItems$({
          concept: true,
          fields: 'item.name_html,item.childs_count',
          limit: 500,
          order: 'name',
          parent_id: +item.id,
        })
        .pipe(
          map((response) => response.items),
          catchError((err: unknown) => {
            this.toastService.handleError(err);
            return EMPTY;
          }),
        ),
    ]);
  }
}
