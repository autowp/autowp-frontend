import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {Observable, forkJoin, of, EMPTY, combineLatest} from 'rxjs';
import {ItemParentService} from '@services/item-parent';
import {allowedItemTypeCombinations, APIItem, ItemService} from '@services/item';
import {PageEnvService} from '@services/page-env.service';
import {APIService} from '@services/api.service';
import {switchMap, catchError, distinctUntilChanged, debounceTime, map, shareReplay} from 'rxjs/operators';
import {ItemMetaFormResult} from '../../../item-meta-form/item-meta-form.component';
import {InvalidParams} from '@utils/invalid-params.pipe';
import {APIGetItemVehicleTypesRequest, ItemType} from '@grpc/spec.pb';
import {ItemsClient} from '@grpc/spec.pbsc';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-moder-items-item-organize',
  templateUrl: './organize.component.html',
})
export class ModerItemsItemOrganizeComponent implements OnInit {
  protected loading = 0;
  protected invalidParams: InvalidParams;

  private readonly itemTypeID$ = this.route.queryParamMap.pipe(
    map((params) => parseInt(params.get('item_type_id'), 10)),
    distinctUntilChanged(),
    debounceTime(30),
    shareReplay(1)
  );

  private readonly itemID$ = this.route.paramMap.pipe(
    map((params) => parseInt(params.get('id'), 10)),
    distinctUntilChanged(),
    debounceTime(30),
    shareReplay(1)
  );

  protected readonly childs$: Observable<APIItem[]> = combineLatest([
    this.itemID$.pipe(
      switchMap((id) =>
        this.itemParentService.getItems$({
          parent_id: id,
          limit: 500,
          fields: 'item.name_html',
          order: 'type_auto',
        })
      )
    ),
    this.itemTypeID$,
  ]).pipe(
    map(([data, itemTypeID]) =>
      data.items.filter((i) => allowedItemTypeCombinations[itemTypeID].includes(i.item.item_type_id)).map((i) => i.item)
    )
  );

  protected readonly item$ = this.itemID$.pipe(
    switchMap((id) =>
      this.itemService.getItem$(id, {
        fields: [
          'name_text',
          'name',
          'is_concept',
          'name_default',
          'subscription',
          'begin_year',
          'begin_month',
          'end_year',
          'end_month',
          'today',
          'begin_model_year',
          'end_model_year',
          'produced',
          'spec_id',
          'full_name',
          'lat',
          'lng',
        ].join(','),
      })
    ),
    shareReplay(1)
  );

  protected readonly newItem$ = combineLatest([this.itemTypeID$, this.item$]).pipe(
    map(([itemTypeID, item]) => {
      const newItem = Object.assign({}, item);
      newItem.item_type_id = itemTypeID;
      return newItem;
    })
  );

  protected readonly vehicleTypeIDs$ = this.item$.pipe(
    switchMap((item) =>
      [ItemType.ITEM_TYPE_VEHICLE, ItemType.ITEM_TYPE_TWINS].includes(item.item_type_id)
        ? this.itemsClient
            .getItemVehicleTypes(
              new APIGetItemVehicleTypesRequest({
                itemId: item.id.toString(),
              })
            )
            .pipe(map((response) => response.items.map((row) => row.vehicleTypeId)))
        : of([] as string[])
    )
  );

  constructor(
    private readonly api: APIService,
    private readonly itemService: ItemService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly itemParentService: ItemParentService,
    private readonly pageEnv: PageEnvService,
    private readonly itemsClient: ItemsClient
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.pageEnv.set({
        layout: {isAdminPage: true},
        pageId: 215,
      });
    }, 0);
  }

  protected submit(item: APIItem, itemTypeID: number, event: ItemMetaFormResult) {
    this.loading++;

    const data = {
      item_type_id: itemTypeID,
      name: event.name,
      full_name: event.full_name,
      catname: event.catname,
      body: event.body,
      spec_id: event.spec_id,
      begin_model_year: event.model_years?.begin_year,
      begin_model_year_fraction: event.model_years?.begin_year_fraction,
      end_model_year: event.model_years?.end_year,
      end_model_year_fraction: event.model_years?.end_year_fraction,
      begin_year: event.begin?.year,
      begin_month: event.begin?.month,
      end_year: event.end?.year,
      end_month: event.end?.month,
      today: event.end?.today,
      produced: event.produced?.count,
      produced_exactly: event.produced?.exactly,
      is_concept: event.is_concept === 'inherited' ? false : event.is_concept,
      is_concept_inherit: event.is_concept === 'inherited',
      is_group: true,
      lat: event.point?.lat,
      lng: event.point?.lng,
    };

    this.api
      .request<void>('POST', 'item', {
        body: data,
        observe: 'response',
      })
      .pipe(
        catchError((response: unknown) => {
          if (response instanceof HttpErrorResponse) {
            this.invalidParams = response.error.invalid_params;
          }
          this.loading--;

          return EMPTY;
        }),
        switchMap((response) => this.itemService.getItemByLocation$(response.headers.get('Location'), {})),
        switchMap((newItem) => {
          const promises: Observable<void>[] = [
            this.api.request<void>('POST', 'item-parent', {
              body: {
                parent_id: item.id,
                item_id: newItem.id,
              },
            }),
          ];

          if ([ItemType.ITEM_TYPE_VEHICLE, ItemType.ITEM_TYPE_TWINS].includes(itemTypeID)) {
            promises.push(this.itemService.setItemVehicleTypes$(newItem.id, event.vehicle_type_id));
          }

          for (const child of event.items) {
            promises.push(
              this.api.request<void>('PUT', 'item-parent/' + child + '/' + item.id, {body: {parent_id: newItem.id}})
            );
          }

          return forkJoin(promises);
        })
      )
      .subscribe({
        next: () => {
          this.loading--;
          if (localStorage) {
            localStorage.setItem('last_item', item.id.toString());
          }
          this.router.navigate(['/moder/items/item', item.id], {
            queryParams: {
              tab: 'catalogue',
            },
          });
        },
        error: (response: unknown) => {
          if (response instanceof HttpErrorResponse) {
            this.invalidParams = response.error.invalid_params;
          }
          this.loading--;
        },
      });
  }
}
