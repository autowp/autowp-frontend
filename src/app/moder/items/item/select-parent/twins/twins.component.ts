import {Component, EventEmitter, Input, Output} from '@angular/core';
import {BehaviorSubject, EMPTY, Observable, of} from 'rxjs';
import {APIItem, ItemService} from '@services/item';
import {APIPaginator} from '@services/api.service';
import {catchError, distinctUntilChanged, map, shareReplay, switchMap} from 'rxjs/operators';
import {chunk} from '../../../../../chunk';
import {ActivatedRoute} from '@angular/router';
import {ToastsService} from '../../../../../toasts/toasts.service';
import {ItemType} from '@grpc/spec.pb';

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
                type_id: ItemType.ITEM_TYPE_BRAND,
                limit: 500,
                fields: 'name_html',
                have_childs_with_parent_of_type: 4,
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

  protected readonly twins$: Observable<{paginator: APIPaginator; items: APIItem[]}> = this.brandID$.pipe(
    switchMap((brandID) =>
      brandID
        ? this.page$.pipe(
            switchMap((page) =>
              this.itemService.getItems$({
                type_id: ItemType.ITEM_TYPE_TWINS,
                limit: 100,
                fields: 'name_html',
                have_common_childs_with: brandID,
                page,
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
