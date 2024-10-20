import {AsyncPipe} from '@angular/common';
import {Component, inject} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {
  APIItem,
  BrandVehicleType,
  GetBrandVehicleTypesRequest,
  ItemFields,
  ItemListOptions,
  ItemType,
  ListItemsRequest,
} from '@grpc/spec.pb';
import {AutowpClient, ItemsClient} from '@grpc/spec.pbsc';
import {ItemService} from '@services/item';
import {LanguageService} from '@services/language';
import {PageEnvService} from '@services/page-env.service';
import {CatalogueListItem, CatalogueListItemPicture} from '@utils/list-item/list-item.component';
import {getVehicleTypeTranslation} from '@utils/translations';
import {combineLatest, EMPTY, Observable, of} from 'rxjs';
import {debounceTime, distinctUntilChanged, map, shareReplay, switchMap} from 'rxjs/operators';

import {PaginatorComponent} from '../../paginator/paginator/paginator.component';
import {CatalogueListItemComponent} from '../../utils/list-item/list-item.component';

@Component({
  imports: [RouterLink, CatalogueListItemComponent, PaginatorComponent, AsyncPipe],
  selector: 'app-catalogue-cars',
  standalone: true,
  templateUrl: './cars.component.html',
})
export class CatalogueCarsComponent {
  private readonly pageEnv = inject(PageEnvService);
  private readonly itemService = inject(ItemService);
  private readonly route = inject(ActivatedRoute);
  private readonly grpc = inject(AutowpClient);
  private readonly itemsClient = inject(ItemsClient);
  private readonly languageService = inject(LanguageService);

  protected readonly brand$: Observable<APIItem> = this.route.paramMap.pipe(
    map((params) => params.get('brand')),
    distinctUntilChanged(),
    switchMap((catname) => {
      if (!catname) {
        return EMPTY;
      }
      return this.itemsClient
        .list(
          new ListItemsRequest({
            fields: new ItemFields({
              nameHtml: true,
              nameOnly: true,
            }),
            language: this.languageService.language,
            limit: 1,
            options: new ItemListOptions({
              catname,
            }),
          }),
        )
        .pipe(map((response) => (response.items && response.items.length ? response.items[0] : null)));
    }),
    switchMap((brand) => (brand ? of(brand) : EMPTY)),
    shareReplay(1),
  );

  protected readonly vehicleTypes$: Observable<BrandVehicleType[]> = this.brand$.pipe(
    switchMap((brand) =>
      this.grpc.getBrandVehicleTypes(
        new GetBrandVehicleTypesRequest({
          brandId: +brand.id,
        }),
      ),
    ),
    map((vehicleTypes) => (vehicleTypes.items ? vehicleTypes.items : [])),
    shareReplay(1),
  );

  protected readonly currentVehicleType$ = combineLatest([
    this.brand$,
    this.vehicleTypes$,
    this.route.paramMap.pipe(
      map((params) => params.get('vehicle_type')),
      distinctUntilChanged(),
      debounceTime(10),
    ),
  ]).pipe(
    map(([brand, vehicleTypes, vehicleTypeCatname]) => {
      const currentVehicleType = vehicleTypes.find((type) => type.catname === vehicleTypeCatname);

      if (brand) {
        let itemName = brand.nameOnly;
        let pageId = 14;
        if (currentVehicleType) {
          itemName += ' ' + getVehicleTypeTranslation(currentVehicleType.name);
          pageId = 138;
        }
        this.pageEnv.set({
          pageId,
          title: $localize`${itemName} in chronological order`,
        });
      }

      return currentVehicleType;
    }),
    shareReplay(1),
  );

  protected readonly title$ = combineLatest([this.brand$, this.currentVehicleType$]).pipe(
    map(([brand, currentVehicleType]) => {
      const itemName =
        brand.nameOnly + (currentVehicleType ? ' ' + getVehicleTypeTranslation(currentVehicleType.name) : '');
      return $localize`${itemName} in chronological order`;
    }),
  );

  protected readonly vehicleTypeOptions$: Observable<
    {
      active: boolean;
      id: number;
      itemsCount: string;
      name: string;
      route: string[];
    }[]
  > = combineLatest([this.vehicleTypes$, this.currentVehicleType$, this.brand$]).pipe(
    map(([types, current, brand]) =>
      types.map((t) => ({
        active: !!(current && t.id === current.id),
        id: t.id,
        itemsCount: t.itemsCount,
        name: getVehicleTypeTranslation(t.name),
        route: ['/', brand.catname, 'cars', t.catname],
      })),
    ),
  );

  protected readonly result$ = combineLatest([
    this.brand$,
    this.currentVehicleType$,
    this.route.queryParamMap.pipe(
      map((params) => parseInt(params.get('page') || '', 10)),
      distinctUntilChanged(),
      debounceTime(10),
    ),
  ]).pipe(
    switchMap(([brand, currentVehicleType, page]) =>
      this.itemService
        .getItems$({
          ancestor_id: +brand.id,
          dateful: true,
          fields: [
            'name_html,name_default,description,has_text,produced,accepted_pictures_count',
            'design,engine_vehicles,route,categories.name_html',
            'can_edit_specs,specs_route',
            'twins_groups',
            'childs_count,total_pictures,preview_pictures.picture.name_text',
          ].join(','),
          limit: 7,
          order: 'age',
          page,
          route_brand_id: +brand.id,
          type_id: ItemType.ITEM_TYPE_VEHICLE,
          vehicle_type_id: currentVehicleType ? currentVehicleType.id : 0,
        })
        .pipe(
          map((response) => {
            const items: CatalogueListItem[] = response.items.map((item) => {
              const pictures: CatalogueListItemPicture[] = item.preview_pictures.pictures.map((picture) => ({
                picture: picture?.picture ? picture.picture : null,
                routerLink:
                  item.route && picture && picture.picture
                    ? item.route.concat(['pictures', picture.picture.identity])
                    : [],
                thumb: picture ? picture.thumb : null,
              }));

              return {
                accepted_pictures_count: item.accepted_pictures_count,
                can_edit_specs: !!item.can_edit_specs,
                categories: item.categories,
                childs_counts: item.childs_counts ? item.childs_counts : null,
                description: item.description,
                design: item.design ? item.design : null,
                details: {
                  count: item.childs_count,
                  routerLink: item.route,
                },
                engine_vehicles: item.engine_vehicles,
                has_text: !!item.has_text,
                id: item.id,
                item_type_id: item.item_type_id,
                name_default: item.name_default,
                name_html: item.name_html,
                picturesRouterLink: item.route ? item.route.concat(['pictures']) : null,
                preview_pictures: {
                  large_format: item.preview_pictures.large_format,
                  pictures,
                },
                produced: item.produced,
                produced_exactly: item.produced_exactly,
                specsRouterLink: null, // TODO
              };
            });

            return {
              items,
              paginator: response.paginator,
            };
          }),
        ),
    ),
  );
}
