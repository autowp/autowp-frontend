import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ItemType} from '@grpc/spec.pb';
import {APIService} from '@services/api.service';
import {APIItem, ItemService} from '@services/item';
import {ItemParentService} from '@services/item-parent';
import {PageEnvService} from '@services/page-env.service';
import {BehaviorSubject, EMPTY, combineLatest} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, map, shareReplay, switchMap, tap} from 'rxjs/operators';

import {chunk} from '../../../../chunk';
import {ToastsService} from '../../../../toasts/toasts.service';

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
        pageId: 102,
        title: $localize`Specs editor of ${item.name_text}`,
      });
    }),
    shareReplay(1)
  );

  protected readonly items$ = combineLatest([this.brandID$, this.page$]).pipe(
    switchMap(([brandID, page]) =>
      this.itemParentService.getItems$({
        fields: 'item.name_html,item.childs_count',
        item_type_id: ItemType.ITEM_TYPE_ENGINE,
        limit: 500,
        page,
        parent_id: brandID,
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
        fields: 'name_only',
        have_childs_of_type: ItemType.ITEM_TYPE_ENGINE,
        limit: 500,
        name: search ? '%' + search + '%' : null,
        order: 'name',
        type_id: ItemType.ITEM_TYPE_BRAND,
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
