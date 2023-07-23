import {Injectable} from '@angular/core';
import {APIGetItemVehicleTypesRequest, APIItemVehicleType, APIItemVehicleTypeRequest, ItemType} from '@grpc/spec.pb';
import {ItemsClient} from '@grpc/spec.pbsc';
import {Observable, forkJoin, of} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';

import {APIImage, APIPaginator, APIService} from './api.service';
import {APIPicture} from './picture';

export interface APIPathTreeItemParent {
  catname: string;
  item: APIPathTreeItem;
}

export interface APIPathTreeItem {
  catname: string;
  item_type_id: ItemType;
  parents: APIPathTreeItemParent[];
}

export interface APIItemsGetResponse {
  items: APIItem[];
  paginator: APIPaginator;
}

export interface APIPathItem {
  catname: null | string;
  item: APIItem;
  parent_id: number;
}

export interface APIItemsGetPathResponse {
  path: APIPathItem[];
}

export interface APIItemChildsCounts {
  sport: number;
  stock: number;
  tuning: number;
}

export interface APIItemOfDayPicture {
  name: string;
  route: string[];
  thumb: APIImage;
}

export interface APIItem {
  accepted_pictures_count?: number;
  alt_names: {
    languages: string[];
    name: string;
  }[];
  attr_zone_id: number;
  begin_model_year: number;
  begin_model_year_fraction: string;
  begin_month: number;
  begin_year: number;
  body: string;
  brands: APIItem[];
  can_edit_specs?: boolean;
  categories?: APIItem[];
  catname: string;
  childs?: APIItem[];
  childs_count: number;
  childs_counts: APIItemChildsCounts;
  comments_attentions_count?: number;
  comments_topic_stat?: {
    messages: number;
  };
  current_pictures_count?: number;
  descendant_twins_groups_count?: number;
  descendants_count: number;
  description: string;
  design: {
    name: string;
    route: string[];
  };
  end_model_year: number;
  end_model_year_fraction: string;
  end_month: number;
  end_year: number;
  engine_id: null | number;
  engine_inherit: boolean | null;
  engine_vehicles?: [
    {
      name_html: string;
      route: string[];
    }
  ];

  engine_vehicles_count: number;
  exact_picture?: APIPicture;
  front_picture?: APIPicture;
  full_name: string;
  has_child_specs?: boolean;
  has_specs?: boolean;
  has_text?: boolean;
  id: number;

  inbox_pictures_count?: number;

  is_compiles_item_of_day: boolean;
  is_concept: boolean;
  is_group: boolean;
  item_language_count: number;
  item_of_day_pictures: APIItemOfDayPicture[];
  item_type_id: ItemType;
  lat: number;
  links_count: number;
  lng: number;
  logo: APIImage;
  logo120?: APIImage;
  mosts_active?: boolean;
  name: string;
  name_default: string;
  name_html: string;
  name_only: string;
  name_text: string;
  other_names?: string[];
  parents_count: number;
  pictures_count: number;

  preview_pictures: {
    large_format: boolean;
    pictures: {
      picture?: APIPicture;
      route: string[];
      thumb?: APIImage;
    }[];
  };

  produced: number;

  produced_exactly: boolean;

  public_routes?: string[][];
  related_group_pictures: APIItemRelatedGroupItem[];
  route: string[];
  spec_id: null | number | string;
  specifications_count?: number;
  specs_route?: string[];
  subscription: boolean;
  text: string;
  today: boolean | null;
  total_pictures?: number;
  twins_groups: APIItem[];
}

export interface ItemOfDayItem extends APIItem {
  public_route?: string;
}

export interface APIItemRelatedGroupItem {
  name: string;
  route: string[];
  src: string;
}

export interface GetItemServiceOptions {
  fields?: string;
}

export interface GetItemsServiceOptions {
  ancestor_id?: number;
  autocomplete?: string;
  catname?: string;
  concept?: boolean;
  concept_inherit?: boolean;
  dateful?: boolean;
  dateless?: boolean;
  descendant_pictures?: {
    contains_perspective_id?: number;
    owner_id?: number;
    perspective_id?: number;
    status?: string;
    type_id?: number;
  };
  engine_id?: number;
  exclude_self_and_childs?: number;
  factories_of_brand?: number;
  fields: string;
  from_year?: number;
  have_childs_of_type?: number;
  have_childs_with_parent_of_type?: number;
  have_common_childs_with?: number;
  id?: number;
  is_group?: boolean;
  limit: number;
  name?: null | string;
  name_exclude?: null | string;
  no_parent?: boolean;
  order?: string;
  page?: number;
  parent_id?: number;
  parent_types_of?: number;
  preview_pictures?: {
    contains_perspective_id?: number;
    perspective_id?: number;
    type_id?: number;
  };
  related_groups_of?: number;
  route_brand_id?: number;
  spec?: number;
  suggestions_to?: number;
  text?: string;
  to_year?: number;
  type_id?: ItemType;
  vehicle_childs_type_id?: number;
  vehicle_type_id?: number | string;
}

export interface GetPathServiceOptions {
  [key: string]: string;
  catname: string;
  path: string;
}

export const allowedItemTypeCombinations = {
  [ItemType.ITEM_TYPE_BRAND]: [ItemType.ITEM_TYPE_BRAND, ItemType.ITEM_TYPE_VEHICLE, ItemType.ITEM_TYPE_ENGINE],
  [ItemType.ITEM_TYPE_CATEGORY]: [ItemType.ITEM_TYPE_VEHICLE, ItemType.ITEM_TYPE_CATEGORY, ItemType.ITEM_TYPE_BRAND],
  [ItemType.ITEM_TYPE_ENGINE]: [ItemType.ITEM_TYPE_ENGINE],
  [ItemType.ITEM_TYPE_FACTORY]: [ItemType.ITEM_TYPE_VEHICLE, ItemType.ITEM_TYPE_ENGINE],
  [ItemType.ITEM_TYPE_PERSON]: [ItemType.ITEM_TYPE_COPYRIGHT],
  [ItemType.ITEM_TYPE_TWINS]: [ItemType.ITEM_TYPE_VEHICLE],
  [ItemType.ITEM_TYPE_VEHICLE]: [ItemType.ITEM_TYPE_VEHICLE],
};

function convertItemOptions(options: GetItemServiceOptions): {[param: string]: string} {
  const params: {[param: string]: string} = {};

  if (!options) {
    options = {};
  }

  if (options.fields) {
    params.fields = options.fields;
  }

  return params;
}

function converItemsOptions(options: GetItemsServiceOptions): {[param: string]: string} {
  const params: {[param: string]: string} = {};

  if (options.id) {
    params.id = options.id.toString();
  }

  if (options.fields) {
    params.fields = options.fields;
  }

  if (options.type_id) {
    params.type_id = options.type_id.toString();
  }

  if (options.parent_id) {
    params.parent_id = options.parent_id.toString();
  }

  if (options.order) {
    params.order = options.order;
  }

  if (options.limit) {
    params.limit = options.limit.toString();
  }

  if (options.name) {
    params.name = options.name;
  }

  if (options.name_exclude) {
    params.name_exclude = options.name_exclude;
  }

  if (options.concept !== undefined && options.concept !== null) {
    params.concept = options.concept ? '1' : '0';
  }

  if (options.concept_inherit !== undefined && options.concept_inherit !== null) {
    params.concept_inherit = options.concept_inherit ? '1' : '0';
  }

  if (options.dateless) {
    params.dateless = '1';
  }

  if (options.dateful) {
    params.dateful = '1';
  }

  if (options.page) {
    params.page = options.page.toString();
  }

  if (options.have_childs_of_type) {
    params.have_childs_of_type = options.have_childs_of_type.toString();
  }

  if (options.name) {
    params.name = options.name;
  }

  if (options.autocomplete) {
    params.autocomplete = options.autocomplete;
  }

  if (options.vehicle_type_id) {
    params.vehicle_type_id = options.vehicle_type_id.toString();
  }

  if (options.vehicle_childs_type_id) {
    params.vehicle_childs_type_id = options.vehicle_childs_type_id.toString();
  }

  if (options.spec) {
    params.spec = options.spec.toString();
  }

  if (options.no_parent) {
    params.no_parent = '1';
  }

  if (options.text) {
    params.text = options.text;
  }

  if (options.from_year) {
    params.from_year = options.from_year.toString();
  }

  if (options.to_year) {
    params.to_year = options.to_year.toString();
  }

  if (options.ancestor_id) {
    params.ancestor_id = options.ancestor_id.toString();
  }

  if (options.suggestions_to) {
    params.suggestions_to = options.suggestions_to.toString();
  }

  if (options.engine_id) {
    params.engine_id = options.engine_id.toString();
  }

  if (options.exclude_self_and_childs) {
    params.exclude_self_and_childs = options.exclude_self_and_childs.toString();
  }

  if (options.parent_types_of) {
    params.parent_types_of = options.parent_types_of.toString();
  }

  if (options.is_group) {
    params.is_group = '1';
  }

  if (options.have_common_childs_with) {
    params.have_common_childs_with = options.have_common_childs_with.toString();
  }

  if (options.have_childs_with_parent_of_type) {
    params.have_childs_with_parent_of_type = options.have_childs_with_parent_of_type.toString();
  }

  if (options.related_groups_of) {
    params.related_groups_of = options.related_groups_of.toString();
  }

  if (options.catname) {
    params.catname = options.catname;
  }

  if (options.factories_of_brand) {
    params.factories_of_brand = options.factories_of_brand.toString();
  }

  if (options.descendant_pictures) {
    if (options.descendant_pictures.status) {
      params['descendant_pictures[status]'] = options.descendant_pictures.status;
    }

    if (options.descendant_pictures.type_id) {
      params['descendant_pictures[type_id]'] = options.descendant_pictures.type_id.toString();
    }

    if (options.descendant_pictures.owner_id) {
      params['descendant_pictures[owner_id]'] = options.descendant_pictures.owner_id.toString();
    }

    if (options.descendant_pictures.perspective_id) {
      params['descendant_pictures[perspective_id]'] = options.descendant_pictures.perspective_id.toString();
    }

    if (options.descendant_pictures.contains_perspective_id) {
      params['descendant_pictures[contains_perspective_id]'] =
        options.descendant_pictures.contains_perspective_id.toString();
    }
  }

  if (options.preview_pictures) {
    if (options.preview_pictures.type_id) {
      params['preview_pictures[type_id]'] = options.preview_pictures.type_id.toString();
    }

    if (options.preview_pictures.perspective_id) {
      params['preview_pictures[perspective_id]'] = options.preview_pictures.perspective_id.toString();
    }

    if (options.preview_pictures.contains_perspective_id) {
      params['preview_pictures[contains_perspective_id]'] = options.preview_pictures.contains_perspective_id.toString();
    }
  }

  if (options.route_brand_id) {
    params.route_brand_id = options.route_brand_id.toString();
  }

  return params;
}

@Injectable()
export class ItemService {
  constructor(private readonly api: APIService, private readonly itemsClient: ItemsClient) {}

  public setItemVehicleTypes$(itemId: number, ids: string[]): Observable<null> {
    return this.itemsClient
      .getItemVehicleTypes(
        new APIGetItemVehicleTypesRequest({
          itemId: itemId.toString(),
        })
      )
      .pipe(
        switchMap((response) => {
          const promises: Observable<null>[] = [];

          const currentIds: string[] = [];
          for (const itemVehicleType of response.items) {
            currentIds.push(itemVehicleType.vehicleTypeId);
            if (ids.indexOf(itemVehicleType.vehicleTypeId) === -1) {
              promises.push(
                this.itemsClient
                  .deleteItemVehicleType(
                    new APIItemVehicleTypeRequest({
                      itemId: itemId.toString(),
                      vehicleTypeId: itemVehicleType.vehicleTypeId,
                    })
                  )
                  .pipe(map(() => null))
              );
            }
          }

          for (const vehicleTypeId of ids) {
            if (currentIds.indexOf(vehicleTypeId) === -1) {
              promises.push(
                this.itemsClient
                  .createItemVehicleType(
                    new APIItemVehicleType({
                      itemId: itemId.toString(),
                      vehicleTypeId,
                    })
                  )
                  .pipe(map(() => null))
              );
            }
          }

          if (promises.length <= 0) {
            promises.push(of(null));
          }

          return forkJoin(promises).pipe(map(() => null));
        })
      );
  }

  public getItemByLocation$(url: string, options: GetItemServiceOptions): Observable<APIItem> {
    return this.api.request<APIItem>('GET', this.api.resolveLocation(url), {
      params: convertItemOptions(options),
    });
  }

  public getItem$(id: number, options?: GetItemServiceOptions): Observable<APIItem> {
    if (!id) {
      return of(null as APIItem);
    }
    return this.api.request<APIItem>('GET', 'item/' + id, {
      params: convertItemOptions(options),
    });
  }

  public getItems$(options?: GetItemsServiceOptions): Observable<APIItemsGetResponse> {
    return this.api.request<APIItemsGetResponse>('GET', 'item', {
      params: converItemsOptions(options),
    });
  }

  public getPath$(options?: GetPathServiceOptions): Observable<APIItemsGetPathResponse> {
    return this.api.request<APIItemsGetPathResponse>('GET', 'item/path', {
      params: options,
    });
  }
}
