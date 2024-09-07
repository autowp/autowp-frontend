import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {
  APIItem as GRPCAPIItem,
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
import {BehaviorSubject, EMPTY, Observable, of} from 'rxjs';
import {catchError, distinctUntilChanged, map, shareReplay, switchMap} from 'rxjs/operators';

import {chunk} from '../../../../../chunk';
import {ToastsService} from '../../../../../toasts/toasts.service';

@Component({
  selector: 'app-moder-items-item-select-parent-twins',
  templateUrl: './twins.component.html',
})
export class ModerItemsItemSelectParentTwinsComponent {
  @Output() selected = new EventEmitter<string>();

  @Input() set itemID(value: string) {
    this.itemID$.next(value);
  }
  protected readonly itemID$ = new BehaviorSubject<null | string>(null);

  protected readonly brandID$ = this.route.queryParamMap.pipe(
    map((params) => params.get('brand_id')),
    distinctUntilChanged(),
    shareReplay(1),
  );

  protected readonly page$ = this.route.queryParamMap.pipe(
    map((params) => parseInt(params.get('page') || '', 10)),
    map((page) => (page ? page : 0)),
    distinctUntilChanged(),
    shareReplay(1),
  );

  protected readonly twinsBrands$: Observable<{brands: GRPCAPIItem[][]; paginator?: Pages} | null> = this.brandID$.pipe(
    switchMap((brandID) =>
      brandID
        ? of(null)
        : this.page$.pipe(
            switchMap((page) =>
              this.itemsClient.list(
                new ListItemsRequest({
                  fields: new ItemFields({nameHtml: true}),
                  language: this.languageService.language,
                  limit: 500,
                  options: new ItemListOptions({
                    descendant: new ItemParentCacheListOptions({
                      itemParentByItemId: new ItemParentListOptions({
                        parent: new ItemListOptions({
                          typeId: ItemType.ITEM_TYPE_TWINS,
                        }),
                      }),
                    }),
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
              brands: chunk<GRPCAPIItem>(response.items ? response.items : [], 6),
              paginator: response.paginator,
            })),
          ),
    ),
  );

  protected readonly twins$: Observable<{items?: GRPCAPIItem[]; paginator?: Pages} | null> = this.brandID$.pipe(
    switchMap((brandID) =>
      brandID
        ? this.page$.pipe(
            switchMap((page) =>
              this.itemsClient.list(
                new ListItemsRequest({
                  fields: new ItemFields({nameHtml: true}),
                  language: this.languageService.language,
                  limit: 100,
                  options: new ItemListOptions({
                    descendant: new ItemParentCacheListOptions({
                      itemParentByItemId: new ItemParentListOptions({
                        parentId: brandID,
                      }),
                    }),
                    typeId: ItemType.ITEM_TYPE_TWINS,
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
          )
        : of(null),
    ),
  );

  constructor(
    private readonly route: ActivatedRoute,
    private readonly toastService: ToastsService,
    private readonly itemsClient: ItemsClient,
    private readonly languageService: LanguageService,
  ) {}

  protected onSelect(itemID: string) {
    this.selected.emit(itemID);
    return false;
  }
}
