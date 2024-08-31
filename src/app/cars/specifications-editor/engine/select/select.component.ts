import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {APIItem, ItemFields, ItemRequest, ItemType, ListItemsRequest, Pages} from '@grpc/spec.pb';
import {ItemsClient} from '@grpc/spec.pbsc';
import {APIService} from '@services/api.service';
import {APIItemParentGetResponse, ItemParentService} from '@services/item-parent';
import {LanguageService} from '@services/language';
import {PageEnvService} from '@services/page-env.service';
import {BehaviorSubject, combineLatest, EMPTY, Observable} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, map, shareReplay, switchMap, tap} from 'rxjs/operators';

import {chunk} from '../../../../chunk';
import {ToastsService} from '../../../../toasts/toasts.service';

@Component({
  selector: 'app-cars-engine-select',
  templateUrl: './select.component.html',
})
export class CarsEngineSelectComponent {
  protected search: string = '';
  private readonly search$ = new BehaviorSubject<string>('');

  protected readonly itemID$ = this.route.queryParamMap.pipe(
    map((params) => parseInt(params.get('item_id') || '', 10)),
    distinctUntilChanged(),
    debounceTime(10),
    shareReplay(1),
  );

  protected readonly brandID$ = this.route.queryParamMap.pipe(
    map((params) => parseInt(params.get('brand_id') || '', 10)),
    distinctUntilChanged(),
    debounceTime(10),
  );

  private readonly page$ = this.route.queryParamMap.pipe(
    map((params) => parseInt(params.get('page') || '', 10)),
    distinctUntilChanged(),
    debounceTime(10),
  );

  protected readonly item$ = this.itemID$.pipe(
    switchMap((itemID) =>
      this.itemsClient.item(
        new ItemRequest({
          fields: new ItemFields({nameText: true}),
          id: '' + itemID,
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
    shareReplay(1),
  );

  protected readonly items$: Observable<APIItemParentGetResponse> = combineLatest([this.brandID$, this.page$]).pipe(
    switchMap(([brandID, page]) =>
      this.itemParentService.getItems$({
        fields: 'item.name_html,item.childs_count',
        item_type_id: ItemType.ITEM_TYPE_ENGINE,
        limit: 500,
        page,
        parent_id: brandID,
      }),
    ),
    catchError((response: unknown) => {
      this.toastService.handleError(response);
      return EMPTY;
    }),
  );

  protected readonly brands$: Observable<{items: APIItem[][]; paginator?: Pages}> = this.search$.pipe(
    map((str) => str.trim()),
    distinctUntilChanged(),
    debounceTime(50),
    switchMap((search) =>
      this.itemsClient.list(
        new ListItemsRequest({
          descendant: new ListItemsRequest({
            typeId: ItemType.ITEM_TYPE_ENGINE,
          }),
          fields: new ItemFields({nameOnly: true}),
          language: this.languageService.language,
          limit: 500,
          name: search ? '%' + search + '%' : undefined,
          order: ListItemsRequest.Order.NAME,
          typeId: ItemType.ITEM_TYPE_BRAND,
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

  constructor(
    private readonly api: APIService,
    private readonly itemsClient: ItemsClient,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly itemParentService: ItemParentService,
    private readonly pageEnv: PageEnvService,
    private readonly toastService: ToastsService,
    private readonly languageService: LanguageService,
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
