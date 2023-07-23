import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ItemType} from '@grpc/spec.pb';
import {APIPaginator} from '@services/api.service';
import {APIItem, ItemService} from '@services/item';
import {BehaviorSubject, EMPTY, Observable, of} from 'rxjs';
import {catchError, distinctUntilChanged, map, shareReplay, switchMap} from 'rxjs/operators';

import {chunk} from '../../../../../chunk';
import {ToastsService} from '../../../../../toasts/toasts.service';

@Component({
  selector: 'app-moder-items-item-select-parent-twins',
  templateUrl: './twins.component.html',
})
export class ModerItemsItemSelectParentTwinsComponent {
  @Output() selected = new EventEmitter<APIItem>();

  @Input() set itemID(value: number) {
    this.itemID$.next(value);
  }
  protected readonly itemID$ = new BehaviorSubject<number>(null);

  protected readonly brandID$ = this.route.queryParamMap.pipe(
    map((params) => parseInt(params.get('brand_id'), 10)),
    map((brandID) => (brandID ? brandID : 0)),
    distinctUntilChanged(),
    shareReplay(1)
  );

  protected readonly page$ = this.route.queryParamMap.pipe(
    map((params) => parseInt(params.get('page'), 10)),
    map((page) => (page ? page : 0)),
    distinctUntilChanged(),
    shareReplay(1)
  );

  protected readonly twinsBrands$: Observable<{brands: APIItem[][]; paginator: APIPaginator}> = this.brandID$.pipe(
    switchMap((brandID) =>
      brandID
        ? of(null)
        : this.page$.pipe(
            switchMap((page) =>
              this.itemService.getItems$({
                fields: 'name_html',
                have_childs_with_parent_of_type: 4,
                limit: 500,
                page,
                type_id: ItemType.ITEM_TYPE_BRAND,
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

  protected readonly twins$: Observable<{items: APIItem[]; paginator: APIPaginator}> = this.brandID$.pipe(
    switchMap((brandID) =>
      brandID
        ? this.page$.pipe(
            switchMap((page) =>
              this.itemService.getItems$({
                fields: 'name_html',
                have_common_childs_with: brandID,
                limit: 100,
                page,
                type_id: ItemType.ITEM_TYPE_TWINS,
              })
            ),
            catchError((error: unknown) => {
              this.toastService.handleError(error);
              return EMPTY;
            })
          )
        : of(null)
    )
  );

  constructor(
    private readonly itemService: ItemService,
    private readonly route: ActivatedRoute,
    private readonly toastService: ToastsService
  ) {}

  protected onSelect(item: APIItem) {
    this.selected.emit(item);
    return false;
  }
}
