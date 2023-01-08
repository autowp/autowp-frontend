import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {Observable, of, forkJoin, EMPTY} from 'rxjs';
import {APIPictureItem, PictureItemService} from '../../../../../services/picture-item';
import {APIItem, ItemService} from '../../../../../services/item';
import {PageEnvService} from '../../../../../services/page-env.service';
import {APIService} from '../../../../../services/api.service';
import {switchMap, catchError, distinctUntilChanged, debounceTime, map, shareReplay} from 'rxjs/operators';
import {InvalidParams} from '../../../../../utils/invalid-params.pipe';
import {APIGetItemVehicleTypesRequest, ItemType} from '../../../../../../../generated/spec.pb';
import {ItemMetaFormResult} from '../../../item-meta-form/item-meta-form.component';
import {ItemsClient} from '../../../../../../../generated/spec.pbsc';

@Component({
  selector: 'app-moder-items-item-pictures-organize',
  templateUrl: './organize.component.html',
})
export class ModerItemsItemPicturesOrganizeComponent implements OnInit {
  public loading = 0;
  public invalidParams: InvalidParams;

  private itemID$ = this.route.paramMap.pipe(
    map((params) => parseInt(params.get('id'), 10)),
    distinctUntilChanged(),
    debounceTime(30),
    shareReplay(1)
  );

  public pictures$: Observable<APIPictureItem[]> = this.itemID$.pipe(
    switchMap((itemID) =>
      this.pictureItemService.getItems({
        item_id: itemID,
        limit: 500,
        fields: 'picture.thumb_medium,picture.name_text',
        order: 'status',
      })
    ),
    map((response) => response.items),
    shareReplay(1)
  );

  public item$ = this.itemID$.pipe(
    switchMap((id) =>
      this.itemService.getItem(id, {
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
      })
    )
  );

  public vehicleTypeIDs$ = this.item$.pipe(
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

  public newItem$ = this.item$.pipe(
    map((item) => {
      const newItem = Object.assign({}, item);
      newItem.is_group = false;
      return newItem;
    })
  );

  constructor(
    private api: APIService,
    private itemService: ItemService,
    private router: Router,
    private route: ActivatedRoute,
    private pictureItemService: PictureItemService,
    private pageEnv: PageEnvService,
    private itemsClient: ItemsClient
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.pageEnv.set({
        layout: {isAdminPage: true},
        pageId: 78,
      });
    }, 0);
  }

  public submit(item: APIItem, event: ItemMetaFormResult, pictures: APIPictureItem[]) {
    this.loading++;

    const data = {
      item_type_id: item.item_type_id,
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

    forkJoin([
      this.api.request<void>('POST', 'item', {
        body: data,
        observe: 'response',
      }),
      item.is_group ? of(null) : this.api.request<void>('PUT', 'item/' + item.id, {body: {is_group: true}}),
    ])
      .pipe(
        catchError((response) => {
          this.invalidParams = response.error.invalid_params;
          this.loading--;
          return EMPTY;
        }),
        switchMap((responses) => this.itemService.getItemByLocation(responses[0].headers.get('Location'), {})),
        switchMap((newItem) => {
          const promises: Observable<any>[] = [
            this.api.request<void>('POST', 'item-parent', {
              body: {
                parent_id: item.id,
                item_id: newItem.id,
              },
            }),
          ];

          if ([ItemType.ITEM_TYPE_VEHICLE, ItemType.ITEM_TYPE_TWINS].includes(newItem.item_type_id)) {
            promises.push(this.itemService.setItemVehicleTypes(newItem.id, event.vehicle_type_id));
          }

          promises.push(
            ...pictures
              .filter((p) => event.pictures.includes(p.picture_id))
              .map((picture) =>
                this.api.request<void>(
                  'PUT',
                  'picture-item/' + picture.picture_id + '/' + picture.item_id + '/' + picture.type,
                  {body: {item_id: newItem.id}}
                )
              )
          );

          return forkJoin(promises).pipe(map(() => newItem));
        })
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
