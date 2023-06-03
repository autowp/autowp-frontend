import {Component} from '@angular/core';
import {BehaviorSubject, combineLatest, EMPTY} from 'rxjs';
import {Router, ActivatedRoute} from '@angular/router';
import {APIItem, ItemService} from '@services/item';
import {APIService} from '@services/api.service';
import {ItemParentService} from '@services/item-parent';
import {PageEnvService} from '@services/page-env.service';
import {chunk} from '../../../../chunk';
import {catchError, debounceTime, distinctUntilChanged, map, shareReplay, switchMap, tap} from 'rxjs/operators';
import {ToastsService} from '../../../../toasts/toasts.service';
import {ItemType} from '@grpc/spec.pb';

@Component({
  selector: 'app-cars-engine-select',
  templateUrl: './select.component.html',
})
export class CarsEngineSelectComponent {
  protected search: string;
  protected readonly search$ = new BehaviorSubject<string>('');

  protected readonly itemID$ = this.route.queryParamMap.pipe(
    map((params) => parseInt(params.get('item_id'), 10)),
    distinctUntilChanged(),
    debounceTime(10),
    shareReplay(1)
  );

  protected readonly brandID$ = this.route.queryParamMap.pipe(
    map((params) => parseInt(params.get('brand_id'), 10)),
    distinctUntilChanged(),
    debounceTime(10)
  );

  private readonly page$ = this.route.queryParamMap.pipe(
    map((params) => parseInt(params.get('page'), 10)),
    distinctUntilChanged(),
    debounceTime(10)
  );

  protected readonly item$ = this.itemID$.pipe(
    switchMap((itemID) =>
      this.itemService.getItem$(itemID, {
        fields: 'name_html,name_text',
      })
    ),
    tap((item) => {
      this.pageEnv.set({
        title: $localize`Specs editor of ${item.name_text}`,
        pageId: 102,
      });
    }),
    shareReplay(1)
  );

  protected readonly items$ = combineLatest([this.brandID$, this.page$]).pipe(
    switchMap(([brandID, page]) =>
      this.itemParentService.getItems$({
        limit: 500,
        fields: 'item.name_html,item.childs_count',
        parent_id: brandID,
        item_type_id: ItemType.ITEM_TYPE_ENGINE,
        page,
      })
    ),
    catchError((response: unknown) => {
      this.toastService.handleError(response);
      return EMPTY;
    })
  );

  protected readonly brands$ = this.search$.pipe(
    map((str) => str.trim()),
    distinctUntilChanged(),
    debounceTime(50),
    switchMap((search) =>
      this.itemService.getItems$({
        type_id: ItemType.ITEM_TYPE_BRAND,
        order: 'name',
        limit: 500,
        fields: 'name_only',
        have_childs_of_type: ItemType.ITEM_TYPE_ENGINE,
        name: search ? '%' + search + '%' : null,
      })
    ),
    catchError((response: unknown) => {
      this.toastService.handleError(response);
      return EMPTY;
    }),
    map((response) => ({
      items: chunk<APIItem>(response.items, 6),
      paginator: response.paginator,
    }))
  );

  constructor(
    private readonly api: APIService,
    private readonly itemService: ItemService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly itemParentService: ItemParentService,
    private readonly pageEnv: PageEnvService,
    private readonly toastService: ToastsService
  ) {}

  protected onInput() {
    this.search$.next(this.search);
  }

  protected selectEngine(itemID: number, engineId: number) {
    this.api
      .request<void>('PUT', 'item/' + itemID, {
        body: {
          engine_id: engineId,
        },
      })
      .pipe(
        catchError((response: unknown) => {
          this.toastService.handleError(response);
          return EMPTY;
        })
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
