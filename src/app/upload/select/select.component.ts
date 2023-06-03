import {Component, OnInit} from '@angular/core';
import {APIPaginator} from '@services/api.service';
import {ItemService, APIItem, APIItemsGetResponse} from '@services/item';
import {chunk} from '../../chunk';
import {Observable, forkJoin, of, BehaviorSubject, combineLatest, EMPTY} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {ItemParentService, APIItemParent} from '@services/item-parent';
import {PageEnvService} from '@services/page-env.service';
import {distinctUntilChanged, switchMap, map, catchError, tap, debounceTime} from 'rxjs/operators';
import {ToastsService} from '../../toasts/toasts.service';
import {ItemType} from '@grpc/spec.pb';

@Component({
  selector: 'app-upload-select',
  templateUrl: './select.component.html',
})
export class UploadSelectComponent implements OnInit {
  protected brand: {
    item: APIItem;
    vehicles: APIItemParent[];
    engines: APIItemParent[];
    concepts: APIItemParent[];
  };
  protected brands: APIItem[][];
  protected paginator: APIPaginator;
  protected search = '';
  protected readonly search$ = new BehaviorSubject<string>('');
  protected loading = 0;
  protected conceptsOpen = false;

  constructor(
    private readonly itemService: ItemService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly itemParentService: ItemParentService,
    private readonly pageEnv: PageEnvService,
    private readonly toastService: ToastsService
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
        debounceTime(50)
      ),
      this.route.queryParamMap.pipe(
        map((params) => ({
          brand_id: parseInt(params.get('brand_id'), 10),
          page: parseInt(params.get('page'), 10),
        }))
      ),
    ])
      .pipe(
        map(([search, query]) => ({search, brand_id: query.brand_id, page: query.page})),
        distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
        tap(() => {
          this.loading = 1;
          this.brand = null;
        }),
        switchMap((params) => {
          const brandId = params.brand_id;
          const page = params.page;

          return forkJoin([
            brandId ? this.brandObservable$(brandId) : of(null),
            brandId ? of(null) : this.brandsObservable$(page, params.search),
          ]);
        }),
        tap(() => (this.loading = 0))
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

  private brandsObservable$(page: number, search: string): Observable<APIItemsGetResponse> {
    return this.itemService
      .getItems$({
        type_id: ItemType.ITEM_TYPE_BRAND,
        order: 'name',
        limit: 500,
        fields: 'name_only',
        name: search ? '%' + search + '%' : null,
        page,
      })
      .pipe(
        catchError((err: unknown) => {
          this.toastService.handleError(err);
          return EMPTY;
        })
      );
  }

  private brandObservable$(brandId: number): Observable<{
    item: APIItem;
    vehicles: APIItemParent[];
    engines: APIItemParent[];
    concepts: APIItemParent[];
  }> {
    return this.itemService.getItem$(brandId).pipe(
      catchError(() => {
        this.router.navigate(['/error-404'], {
          skipLocationChange: true,
        });
        return EMPTY;
      }),
      switchMap((item) => this.brandItemsObservable(item)),
      map(([item, vehicles, engines, concepts]) => ({item, vehicles, engines, concepts}))
    );
  }

  private brandItemsObservable(item: APIItem) {
    return forkJoin([
      of(item),
      this.itemParentService
        .getItems$({
          limit: 500,
          fields: 'item.name_html,item.childs_count',
          parent_id: item.id,
          exclude_concept: true,
          order: 'name',
          item_type_id: ItemType.ITEM_TYPE_VEHICLE,
        })
        .pipe(
          map((response) => response.items),
          catchError((err: unknown) => {
            this.toastService.handleError(err);
            return EMPTY;
          })
        ),
      this.itemParentService
        .getItems$({
          limit: 500,
          fields: 'item.name_html,item.childs_count',
          parent_id: item.id,
          exclude_concept: true,
          order: 'name',
          item_type_id: ItemType.ITEM_TYPE_ENGINE,
        })
        .pipe(
          map((response) => response.items),
          catchError((err: unknown) => {
            this.toastService.handleError(err);
            return EMPTY;
          })
        ),
      this.itemParentService
        .getItems$({
          limit: 500,
          fields: 'item.name_html,item.childs_count',
          parent_id: item.id,
          concept: true,
          order: 'name',
        })
        .pipe(
          map((response) => response.items),
          catchError((err: unknown) => {
            this.toastService.handleError(err);
            return EMPTY;
          })
        ),
    ]);
  }
}
