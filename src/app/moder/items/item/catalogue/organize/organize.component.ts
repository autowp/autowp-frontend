import {AsyncPipe} from '@angular/common';
import {HttpErrorResponse} from '@angular/common/http';
import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {
  APIItem as GRPCAPIItem,
  APIGetItemVehicleTypesRequest,
  GetItemParentsRequest,
  ItemFields,
  ItemParent,
  ItemParentFields,
  ItemParentListOptions,
  ItemType,
  MoveItemParentRequest,
} from '@grpc/spec.pb';
import {ItemsClient} from '@grpc/spec.pbsc';
import {APIService} from '@services/api.service';
import {allowedItemTypeCombinations, APIItem, ItemService} from '@services/item';
import {PageEnvService} from '@services/page-env.service';
import {InvalidParams} from '@utils/invalid-params.pipe';
import {MarkdownComponent} from '@utils/markdown/markdown.component';
import {combineLatest, EMPTY, forkJoin, Observable, of} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, map, shareReplay, switchMap} from 'rxjs/operators';

import {ItemMetaFormComponent, ItemMetaFormResult} from '../../../item-meta-form/item-meta-form.component';
import {LanguageService} from '@services/language';

@Component({
  imports: [RouterLink, MarkdownComponent, ItemMetaFormComponent, AsyncPipe],
  selector: 'app-moder-items-item-organize',
  templateUrl: './organize.component.html',
})
export class ModerItemsItemOrganizeComponent implements OnInit {
  private readonly api = inject(APIService);
  private readonly itemService = inject(ItemService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly languageService = inject(LanguageService);
  private readonly pageEnv = inject(PageEnvService);
  private readonly itemsClient = inject(ItemsClient);

  protected loading = 0;
  protected invalidParams?: InvalidParams;

  private readonly itemTypeID$: Observable<number> = this.route.queryParamMap.pipe(
    map((params) => parseInt(params.get('item_type_id') ?? '', 10)),
    distinctUntilChanged(),
    debounceTime(30),
    shareReplay({bufferSize: 1, refCount: false}),
  );

  private readonly itemID$ = this.route.paramMap.pipe(
    map((params) => params.get('id') ?? ''),
    distinctUntilChanged(),
    debounceTime(30),
    shareReplay({bufferSize: 1, refCount: false}),
  );

  protected readonly childs$: Observable<GRPCAPIItem[]> = combineLatest([
    this.itemID$.pipe(
      switchMap((id) =>
        this.itemsClient.getItemParents(
          new GetItemParentsRequest({
            language: this.languageService.language,
            options: new ItemParentListOptions({
              parentId: id,
            }),
            limit: 500,
            order: GetItemParentsRequest.Order.AUTO,
            fields: new ItemParentFields({
              item: new ItemFields({
                nameHtml: true,
              }),
            }),
          }),
        ),
      ),
    ),
    this.itemTypeID$,
  ]).pipe(
    map(([data, itemTypeID]) =>
      (data.items || [])
        .map((i) => i.item)
        .filter((i): i is GRPCAPIItem => !!i)
        .filter(
          (item) =>
            item && item?.itemTypeId && allowedItemTypeCombinations[itemTypeID as ItemType].includes(item?.itemTypeId),
        ),
    ),
  );

  protected readonly item$: Observable<APIItem> = this.itemID$.pipe(
    switchMap((id) =>
      this.itemService.getItem$(+id, {
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
      }),
    ),
    shareReplay({bufferSize: 1, refCount: false}),
    switchMap((item) => {
      if (!item) {
        this.router.navigate(['/error-404'], {
          skipLocationChange: true,
        });
        return EMPTY;
      }
      return of(item);
    }),
  );

  protected readonly newItem$: Observable<APIItem> = combineLatest([this.itemTypeID$, this.item$]).pipe(
    map(([itemTypeID, item]) => {
      const newItem = {...item};
      newItem.item_type_id = itemTypeID;
      return newItem;
    }),
  );

  protected readonly vehicleTypeIDs$ = this.item$.pipe(
    switchMap((item) =>
      [ItemType.ITEM_TYPE_TWINS, ItemType.ITEM_TYPE_VEHICLE].includes(item.item_type_id)
        ? this.itemsClient
            .getItemVehicleTypes(
              new APIGetItemVehicleTypesRequest({
                itemId: item.id.toString(),
              }),
            )
            .pipe(map((response) => (response.items ? response.items : []).map((row) => row.vehicleTypeId)))
        : of([] as string[]),
    ),
  );

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
      begin_model_year: event.model_years?.begin_year,
      begin_model_year_fraction: event.model_years?.begin_year_fraction,
      begin_month: event.begin?.month,
      begin_year: event.begin?.year,
      body: event.body,
      catname: event.catname,
      end_model_year: event.model_years?.end_year,
      end_model_year_fraction: event.model_years?.end_year_fraction,
      end_month: event.end?.month,
      end_year: event.end?.year,
      full_name: event.full_name,
      is_concept: event.is_concept === 'inherited' ? false : event.is_concept,
      is_concept_inherit: event.is_concept === 'inherited',
      is_group: true,
      item_type_id: itemTypeID,
      lat: event.point?.lat,
      lng: event.point?.lng,
      name: event.name,
      produced: event.produced?.count,
      produced_exactly: event.produced?.exactly,
      spec_id: event.spec_id,
      today: event.end?.today,
    };

    this.api
      .request$<void>('POST', 'item', {
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
        switchMap((response) => this.itemService.getItemByLocation$(response.headers.get('Location') ?? '', {})),
        switchMap((newItem) => {
          const promises: Observable<void>[] = [
            this.itemsClient
              .createItemParent(
                new ItemParent({
                  itemId: '' + newItem.id,
                  parentId: '' + item.id,
                }),
              )
              .pipe(map(() => void 0)),
          ];

          if ([ItemType.ITEM_TYPE_TWINS, ItemType.ITEM_TYPE_VEHICLE].includes(itemTypeID)) {
            promises.push(this.itemService.setItemVehicleTypes$(newItem.id, event.vehicle_type_id));
          }

          for (const child of event.items) {
            promises.push(
              this.itemsClient
                .moveItemParent(
                  new MoveItemParentRequest({
                    itemId: '' + child,
                    parentId: '' + item.id,
                    destParentId: '' + newItem.id,
                  }),
                )
                .pipe(map(() => void 0)),
            );
          }

          return forkJoin(promises);
        }),
      )
      .subscribe({
        error: (response: unknown) => {
          if (response instanceof HttpErrorResponse) {
            this.invalidParams = response.error.invalid_params;
          }
          this.loading--;
        },
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
      });
  }
}
