import {Component} from '@angular/core';
import {APIItem, ItemService} from '../../services/item';
import {PageEnvService} from '../../services/page-env.service';
import {ActivatedRoute} from '@angular/router';
import {debounceTime, distinctUntilChanged, map, shareReplay, switchMap} from 'rxjs/operators';
import {combineLatest, EMPTY, Observable} from 'rxjs';
import {CatalogueListItem, CatalogueListItemPicture} from '../../utils/list-item/list-item.component';
import {getVehicleTypeTranslation} from '../../utils/translations';
import {AutowpClient} from '../../../../generated/spec.pbsc';
import {BrandVehicleType, GetBrandVehicleTypesRequest} from '../../../../generated/spec.pb';

@Component({
  selector: 'app-catalogue-cars',
  templateUrl: './cars.component.html',
})
export class CatalogueCarsComponent {
  public brand$: Observable<APIItem> = this.route.paramMap.pipe(
    map((params) => params.get('brand')),
    distinctUntilChanged(),
    debounceTime(10),
    switchMap((catname) => {
      if (!catname) {
        return EMPTY;
      }
      return this.itemService
        .getItems({
          catname,
          fields: 'name_text,name_html',
          limit: 1,
        })
        .pipe(map((response) => (response && response.items.length ? response.items[0] : null)));
    }),
    shareReplay(1)
  );

  public vehicleTypes$: Observable<BrandVehicleType[]> = this.brand$.pipe(
    switchMap((brand) =>
      this.grpc.getBrandVehicleTypes(
        new GetBrandVehicleTypesRequest({
          brandId: brand.id,
        })
      )
    ),
    map((vehicleTypes) => vehicleTypes.items),
    shareReplay(1)
  );

  public currentVehicleType$ = combineLatest([
    this.brand$,
    this.vehicleTypes$,
    this.route.paramMap.pipe(
      map((params) => params.get('vehicle_type')),
      distinctUntilChanged(),
      debounceTime(10)
    ),
  ]).pipe(
    map(([brand, vehicleTypes, vehicleTypeCatname]) => {
      const currentVehicleType = vehicleTypes.find((type) => type.catname === vehicleTypeCatname);

      if (brand) {
        let itemName = brand.name_text;
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
    shareReplay(1)
  );

  public title$ = combineLatest([this.brand$, this.currentVehicleType$]).pipe(
    map(([brand, currentVehicleType]) => {
      const itemName =
        brand.name_text + (currentVehicleType ? ' ' + getVehicleTypeTranslation(currentVehicleType.name) : '');
      return $localize`${itemName} in chronological order`;
    })
  );

  public vehicleTypeOptions$: Observable<
    {
      id: number;
      name: string;
      active: boolean;
      itemsCount: string;
      route: string[];
    }[]
  > = combineLatest([this.vehicleTypes$, this.currentVehicleType$, this.brand$]).pipe(
    map(([types, current, brand]) =>
      types.map((t) => ({
        id: t.id,
        name: getVehicleTypeTranslation(t.name),
        active: current && t.id === current.id,
        itemsCount: t.itemsCount,
        route: ['/', brand.catname, 'cars', t.catname],
      }))
    )
  );

  public result$ = combineLatest([
    this.brand$,
    this.currentVehicleType$,
    this.route.queryParamMap.pipe(
      map((params) => +params.get('page')),
      distinctUntilChanged(),
      debounceTime(10)
    ),
  ]).pipe(
    switchMap(([brand, currentVehicleType, page]) =>
      this.itemService
        .getItems({
          limit: 7,
          type_id: 1,
          order: 'age',
          ancestor_id: brand.id,
          dateful: true,
          vehicle_type_id: currentVehicleType ? currentVehicleType.id : 0,
          route_brand_id: brand.id,
          fields: [
            'name_html,name_default,description,has_text,produced,accepted_pictures_count',
            'design,engine_vehicles,route,categories.name_html',
            'can_edit_specs,specs_route',
            'twins_groups',
            'childs_count,total_pictures,preview_pictures.picture.name_text',
          ].join(','),
          page,
        })
        .pipe(
          map((response) => {
            const items: CatalogueListItem[] = response.items.map((item) => {
              const pictures: CatalogueListItemPicture[] = item.preview_pictures.pictures.map((picture) => ({
                picture: picture ? picture.picture : null,
                thumb: picture ? picture.thumb : null,
                routerLink:
                  item.route && picture && picture.picture
                    ? item.route.concat(['pictures', picture.picture.identity])
                    : [],
              }));

              return {
                id: item.id,
                preview_pictures: {
                  pictures,
                  large_format: item.preview_pictures.large_format,
                },
                item_type_id: item.item_type_id,
                produced: item.produced,
                produced_exactly: item.produced_exactly,
                name_html: item.name_html,
                name_default: item.name_default,
                design: item.design,
                description: item.description,
                engine_vehicles: item.engine_vehicles,
                has_text: item.has_text,
                accepted_pictures_count: item.accepted_pictures_count,
                can_edit_specs: item.can_edit_specs,
                picturesRouterLink: item.route ? item.route.concat(['pictures']) : null,
                specsRouterLink: null, // TODO
                details: {
                  routerLink: item.route,
                  count: item.childs_count,
                },
                childs_counts: item.childs_counts,
                categories: item.categories,
              };
            });

            return {
              items,
              paginator: response.paginator,
            };
          })
        )
    )
  );

  constructor(
    private pageEnv: PageEnvService,
    private itemService: ItemService,
    private route: ActivatedRoute,
    private grpc: AutowpClient
  ) {}
}
