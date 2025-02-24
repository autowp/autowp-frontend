import {AsyncPipe} from '@angular/common';
import {HttpErrorResponse} from '@angular/common/http';
import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {
  APIGetItemVehicleTypesRequest,
  APIItem,
  ItemFields,
  ItemParent,
  ItemRequest,
  ItemType,
  PictureItem,
  PictureItemListOptions,
  PictureItemsRequest,
  SetPictureItemItemIDRequest,
} from '@grpc/spec.pb';
import {ItemsClient, PicturesClient} from '@grpc/spec.pbsc';
import {APIService} from '@services/api.service';
import {ItemService} from '@services/item';
import {PageEnvService} from '@services/page-env.service';
import {InvalidParams} from '@utils/invalid-params.pipe';
import {MarkdownComponent} from '@utils/markdown/markdown.component';
import {EMPTY, forkJoin, Observable, of} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, map, shareReplay, switchMap} from 'rxjs/operators';

import {ItemMetaFormComponent, ItemMetaFormResult} from '../../../item-meta-form/item-meta-form.component';

@Component({
  imports: [RouterLink, MarkdownComponent, AsyncPipe, ItemMetaFormComponent],
  selector: 'app-moder-items-item-pictures-organize',
  templateUrl: './organize.component.html',
})
export class ModerItemsItemPicturesOrganizeComponent implements OnInit {
  readonly #api = inject(APIService);
  readonly #itemService = inject(ItemService);
  readonly #router = inject(Router);
  readonly #route = inject(ActivatedRoute);
  readonly #pageEnv = inject(PageEnvService);
  readonly #itemsClient = inject(ItemsClient);
  readonly #picturesClient = inject(PicturesClient);

  protected loading = 0;
  protected invalidParams?: InvalidParams;

  readonly #itemID$ = this.#route.paramMap.pipe(
    map((params) => params.get('id') ?? ''),
    distinctUntilChanged(),
    debounceTime(30),
    shareReplay({bufferSize: 1, refCount: false}),
  );

  protected readonly pictures$: Observable<PictureItem[]> = this.#itemID$.pipe(
    switchMap((itemID) =>
      this.#picturesClient.getPictureItems(
        new PictureItemsRequest({
          options: new PictureItemListOptions({itemId: '' + itemID}),
        }),
      ),
    ),
    map((response) => response.items || []),
    shareReplay({bufferSize: 1, refCount: false}),
  );

  protected readonly item$: Observable<APIItem> = this.#itemID$.pipe(
    switchMap((id) =>
      this.#itemsClient.item(
        new ItemRequest({
          fields: new ItemFields({
            childsCount: true,
            fullName: true,
            location: true,
            meta: true,
            nameDefault: true,
            nameHtml: true,
            nameText: true,
          }),
          id,
        }),
      ),
    ),
    switchMap((item) => {
      if (!item) {
        this.#router.navigate(['/error-404'], {
          skipLocationChange: true,
        });
        return EMPTY;
      }
      return of(item);
    }),
  );

  protected readonly vehicleTypeIDs$ = this.item$.pipe(
    switchMap((item) =>
      [ItemType.ITEM_TYPE_TWINS, ItemType.ITEM_TYPE_VEHICLE].includes(item.itemTypeId)
        ? this.#itemsClient
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
      const newItem = {...item} as APIItem;
      newItem.isGroup = false;
      return newItem;
    }),
  );

  ngOnInit(): void {
    setTimeout(() => {
      this.#pageEnv.set({
        layout: {isAdminPage: true},
        pageId: 78,
      });
    }, 0);
  }

  protected submit(item: APIItem, event: ItemMetaFormResult, pictures: PictureItem[]) {
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
      item_type_id: item.itemTypeId,
      lat: event.point?.lat,
      lng: event.point?.lng,
      name: event.name,
      produced: event.produced?.count,
      produced_exactly: event.produced?.exactly,
      spec_id: event.spec_id ? event.spec_id : null,
      today: event.end?.today,
    };

    forkJoin([
      this.#api.request$<void>('POST', 'item', {
        body: data,
        observe: 'response',
      }),
      item.isGroup ? of(null) : this.#api.request$<void>('PUT', 'item/' + item.id, {body: {is_group: true}}),
    ])
      .pipe(
        catchError((response: unknown) => {
          if (response instanceof HttpErrorResponse) {
            this.invalidParams = response.error.invalid_params;
          }
          this.loading--;
          return EMPTY;
        }),
        switchMap((responses) => {
          const location = responses[0].headers.get('Location') ?? '';
          const parts = location.split('/');
          const itemId = parts[parts.length - 1];

          return this.#itemsClient.item(new ItemRequest({id: itemId}));
        }),
        switchMap((newItem) => {
          const promises: Observable<void>[] = [
            this.#itemsClient
              .createItemParent(
                new ItemParent({
                  itemId: newItem.id,
                  parentId: item.id,
                }),
              )
              .pipe(map(() => void 0)),
          ];

          if ([ItemType.ITEM_TYPE_TWINS, ItemType.ITEM_TYPE_VEHICLE].includes(newItem.itemTypeId)) {
            promises.push(this.#itemService.setItemVehicleTypes$(newItem.id, event.vehicle_type_id));
          }

          promises.push(
            ...pictures
              .filter((p) => event.pictures.includes(p.pictureId))
              .map((picture) =>
                this.#picturesClient
                  .setPictureItemItemID(
                    new SetPictureItemItemIDRequest({
                      itemId: picture.itemId,
                      newItemId: newItem.id,
                      pictureId: picture.pictureId,
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
        this.#router.navigate(['/moder/items/item', item.id], {
          queryParams: {
            tab: 'pictures',
          },
        });
      });
  }
}
