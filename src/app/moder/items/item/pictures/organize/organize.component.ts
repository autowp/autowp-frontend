import {HttpErrorResponse} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {APIGetItemVehicleTypesRequest, ItemType, SetPictureItemItemIDRequest} from '@grpc/spec.pb';
import {ItemsClient, PicturesClient} from '@grpc/spec.pbsc';
import {APIService} from '@services/api.service';
import {APIItem, ItemService} from '@services/item';
import {PageEnvService} from '@services/page-env.service';
import {APIPictureItem, PictureItemService} from '@services/picture-item';
import {InvalidParams} from '@utils/invalid-params.pipe';
import {EMPTY, forkJoin, Observable, of} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, map, shareReplay, switchMap} from 'rxjs/operators';

import {ItemMetaFormResult} from '../../../item-meta-form/item-meta-form.component';

@Component({
  selector: 'app-moder-items-item-pictures-organize',
  templateUrl: './organize.component.html',
})
export class ModerItemsItemPicturesOrganizeComponent implements OnInit {
  protected loading = 0;
  protected invalidParams?: InvalidParams;

  private readonly itemID$ = this.route.paramMap.pipe(
    map((params) => parseInt(params.get('id') || '', 10)),
    distinctUntilChanged(),
    debounceTime(30),
    shareReplay(1),
  );

  protected readonly pictures$: Observable<APIPictureItem[]> = this.itemID$.pipe(
    switchMap((itemID) =>
      this.pictureItemService.getItems$({
        fields: 'picture.thumb_medium,picture.name_text',
        item_id: itemID,
        limit: 500,
        order: 'status',
      }),
    ),
    map((response) => response.items),
    shareReplay(1),
  );

  protected readonly item$: Observable<APIItem> = this.itemID$.pipe(
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
          'catname',
          'lat',
          'lng',
        ].join(','),
      }),
    ),
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

  protected readonly newItem$ = this.item$.pipe(
    map((item) => {
      const newItem = Object.assign({}, item);
      newItem.is_group = false;
      return newItem;
    }),
  );

  constructor(
    private readonly api: APIService,
    private readonly itemService: ItemService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly pictureItemService: PictureItemService,
    private readonly pageEnv: PageEnvService,
    private readonly itemsClient: ItemsClient,
    private readonly picturesClient: PicturesClient,
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.pageEnv.set({
        layout: {isAdminPage: true},
        pageId: 78,
      });
    }, 0);
  }

  protected submit(item: APIItem, event: ItemMetaFormResult, pictures: APIPictureItem[]) {
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
      item_type_id: item.item_type_id,
      lat: event.point?.lat,
      lng: event.point?.lng,
      name: event.name,
      produced: event.produced?.count,
      produced_exactly: event.produced?.exactly,
      spec_id: event.spec_id,
      today: event.end?.today,
    };

    forkJoin([
      this.api.request<void>('POST', 'item', {
        body: data,
        observe: 'response',
      }),
      item.is_group ? of(null) : this.api.request<void>('PUT', 'item/' + item.id, {body: {is_group: true}}),
    ])
      .pipe(
        catchError((response: unknown) => {
          if (response instanceof HttpErrorResponse) {
            this.invalidParams = response.error.invalid_params;
          }
          this.loading--;
          return EMPTY;
        }),
        switchMap((responses) => this.itemService.getItemByLocation$(responses[0].headers.get('Location') || '', {})),
        switchMap((newItem) => {
          const promises: Observable<void>[] = [
            this.api.request<void>('POST', 'item-parent', {
              body: {
                item_id: newItem.id,
                parent_id: item.id,
              },
            }),
          ];

          if ([ItemType.ITEM_TYPE_TWINS, ItemType.ITEM_TYPE_VEHICLE].includes(newItem.item_type_id)) {
            promises.push(this.itemService.setItemVehicleTypes$(newItem.id, event.vehicle_type_id));
          }

          promises.push(
            ...pictures
              .filter((p) => event.pictures.includes(p.picture_id))
              .map((picture) =>
                this.picturesClient
                  .setPictureItemItemID(
                    new SetPictureItemItemIDRequest({
                      itemId: '' + picture.item_id,
                      newItemId: '' + newItem.id,
                      pictureId: '' + picture.picture_id,
                      type: picture.type,
                    }),
                  )
                  .pipe(map(() => void 0)),
              ),
          );

          return forkJoin(promises).pipe(map(() => newItem));
        }),
      )
      .subscribe((item) => {
        this.loading--;
        if (localStorage) {
          localStorage.setItem('last_item', item.id.toString());
        }
        this.router.navigate(['/moder/items/item', item.id], {
          queryParams: {
            tab: 'pictures',
          },
        });
      });
  }
}
