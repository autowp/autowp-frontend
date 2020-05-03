import {Component, Injectable, OnDestroy, OnInit} from '@angular/core';
import {APIItem, ItemService} from '../../services/item';
import {PageEnvService} from '../../services/page-env.service';
import {ActivatedRoute} from '@angular/router';
import {debounceTime, distinctUntilChanged, map, switchMap, tap} from 'rxjs/operators';
import {combineLatest, EMPTY, of, Subscription} from 'rxjs';
import {APIPaginator, APIService} from '../../services/api.service';
import {CatalogueListItem, CatalogueListItemPicture} from '../../utils/list-item/list-item.component';

interface VehicleTypesResponse {
  items: VehicleType[];
}

interface VehicleType {
  id: number;
  name: string;
  catname: string;
  carsCount: number;
}

@Component({
  selector: 'app-catalogue-cars',
  templateUrl: './cars.component.html'
})
@Injectable()
export class CatalogueCarsComponent implements OnInit, OnDestroy {
  public brand: APIItem;
  private sub: Subscription;
  public items: CatalogueListItem[];
  public paginator: APIPaginator;
  public vehicleTypes: VehicleType[];
  public currentVehicleType: VehicleType;

  constructor(
    private pageEnv: PageEnvService,
    private itemService: ItemService,
    private route: ActivatedRoute,
    private api: APIService
  ) {
  }

  ngOnInit(): void {

    this.sub = this.route.paramMap.pipe(
      map(params => {
        return params.get('brand');
      }),
      distinctUntilChanged(),
      debounceTime(10),
      switchMap(catname => this.getBrand(catname)),
      tap(brand => {
        this.brand = brand;
      }),
      switchMap(brand => combineLatest([
        this.getVehicleTypes(brand.id),
        this.route.paramMap.pipe(
          map(params => params.get('vehicle_type')),
          distinctUntilChanged(),
          debounceTime(10),
        ),
        of(brand)
      ])),
      map(([vehicleTypes, vehicleTypeCatname, brand]) => {
        this.vehicleTypes = vehicleTypes.items;
        for (const type of this.vehicleTypes) {
          if (type.catname === vehicleTypeCatname) {
            this.currentVehicleType = type;
            break;
          }
        }

        const currentVehicleTypeID = this.currentVehicleType ? this.currentVehicleType.id : 0;

        if (brand) {
          if (this.currentVehicleType) {
            this.pageEnv.set({
              layout: {
                needRight: false
              },
              pageId: 138,
              name: 'page/138/ng-name',
              args: {
                brand: brand.name_text,
                vehicle_type: this.currentVehicleType.name,
              }
            });
          } else {
            this.pageEnv.set({
              layout: {
                needRight: false
              },
              pageId: 14,
              name: 'page/14/ng-name',
              args: {
                brand: brand.name_text,
              }
            });
          }
        }

        return {
          currentVehicleType: currentVehicleTypeID,
          brand
        };
      }),
      switchMap(data => this.route.queryParamMap.pipe(
        map(params => +params.get('page')),
        distinctUntilChanged(),
        debounceTime(10),
        map(page => ({
          currentVehicleType: data.currentVehicleType,
          brandID: data.brand.id,
          page
        }))
      )),
      switchMap(data => this.getItems(data.brandID, data.currentVehicleType, data.page)),
    ).subscribe(response => {
      this.items = response.items;
      this.paginator = response.paginator;
    });
  }

  private getItems(brandID: number, vehicleTypeID: number, page: number) {
    return this.itemService.getItems({
      limit: 7,
      type_id: 1,
      order: 'age',
      ancestor_id: brandID,
      dateful: true,
      vehicle_type_id: vehicleTypeID,
      route_brand_id: brandID,
      fields: [
        'name_html,name_default,description,has_text,produced,accepted_pictures_count',
        'design,engine_vehicles,route,categories.name_html',
        'can_edit_specs,specs_route',
        'twins_groups',
        'childs_count,total_pictures,preview_pictures.picture.name_text'
      ].join(','),
      page
    }).pipe(
      map(response => {
        const items: CatalogueListItem[] = [];

        for (const item of response.items) {

          const pictures: CatalogueListItemPicture[] = [];
          for (const picture of item.preview_pictures.pictures) {
            pictures.push({
              picture: picture ? picture.picture : null,
              thumb: picture ? picture.thumb : null,
              routerLink: item.route && picture && picture.picture ? item.route.concat(['pictures', picture.picture.identity]) : []
            });
          }
          items.push({
            id: item.id,
            preview_pictures: {
              pictures,
              large_format: item.preview_pictures.large_format
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
              count: item.childs_count
            },
            childs_counts: item.childs_counts,
            categories: item.categories
          });
        }

        return {
          items,
          paginator: response.paginator
        };
      })
    );
  }

  private getBrand(catname: string) {
    if (!catname) {
      return EMPTY;
    }
    return this.itemService.getItems({
      catname,
      fields: 'name_text,name_html',
      limit: 1
    }).pipe(
      map(response => response && response.items.length ? response.items[0] : null),
    );
  }

  private getVehicleTypes(brandID: number) {
    return this.api.request<VehicleTypesResponse>('GET', 'item/vehicle-type', {
      params: {
        brand_id: brandID.toString()
      }
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
