import {inject, Injectable} from '@angular/core';
import {APIGetItemVehicleTypesRequest, APIItemVehicleType, APIItemVehicleTypeRequest, ItemType} from '@grpc/spec.pb';
import {ItemsClient} from '@grpc/spec.pbsc';
import {forkJoin, Observable, of} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';

import {APIImage, APIService} from './api.service';

export interface APIItem {
  begin_model_year: number;
  begin_model_year_fraction: string;
  begin_month: number;
  begin_year: number;
  body: string;
  brands: APIItem[];
  categories?: APIItem[];
  catname: string;
  childs?: APIItem[];
  description: string;
  design?: {
    name: string;
    route: string[];
  };
  end_model_year: number;
  end_model_year_fraction: string;
  end_month: number;
  end_year: number;
  full_name: string;
  id: number;

  is_concept: 'inherited' | boolean | null;
  is_group: boolean;
  item_type_id: ItemType;
  lat: number;
  lng: number;
  logo?: APIImage;
  logo120?: APIImage;
  name: string;
  name_html: string;
  name_text: string;

  produced: null | number;

  produced_exactly: boolean;

  route: string[];
  spec_id: null | number | string;
  subscription: boolean;
  text: string;
  today: boolean | null;
}

export interface APIItemChildsCounts {
  sport: number;
  stock: number;
  tuning: number;
}

export interface APIItemsGetPathResponse {
  path: APIPathItem[];
}

export interface APIPathItem {
  catname: string;
  item: APIItem;
  parent_id: number;
}

export interface APIPathTreeItem {
  catname: string;
  item_type_id: ItemType;
  parents: APIPathTreeItemParent[];
}

export interface APIPathTreeItemParent {
  catname: string;
  item: APIPathTreeItem;
}

export interface GetPathServiceOptions {
  [key: string]: string;
  catname: string;
  path: string;
}

export const allowedItemTypeCombinations: {
  [key in ItemType]: ItemType[];
} = {
  [ItemType.ITEM_TYPE_BRAND]: [ItemType.ITEM_TYPE_BRAND, ItemType.ITEM_TYPE_VEHICLE, ItemType.ITEM_TYPE_ENGINE],
  [ItemType.ITEM_TYPE_CATEGORY]: [ItemType.ITEM_TYPE_VEHICLE, ItemType.ITEM_TYPE_CATEGORY, ItemType.ITEM_TYPE_BRAND],
  [ItemType.ITEM_TYPE_COPYRIGHT]: [],
  [ItemType.ITEM_TYPE_ENGINE]: [ItemType.ITEM_TYPE_ENGINE],
  [ItemType.ITEM_TYPE_FACTORY]: [ItemType.ITEM_TYPE_VEHICLE, ItemType.ITEM_TYPE_ENGINE],
  [ItemType.ITEM_TYPE_MUSEUM]: [],
  [ItemType.ITEM_TYPE_PERSON]: [ItemType.ITEM_TYPE_COPYRIGHT],
  [ItemType.ITEM_TYPE_TWINS]: [ItemType.ITEM_TYPE_VEHICLE],
  [ItemType.ITEM_TYPE_UNKNOWN]: [],
  [ItemType.ITEM_TYPE_VEHICLE]: [ItemType.ITEM_TYPE_VEHICLE],
};

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  readonly #api = inject(APIService);
  readonly #itemsClient = inject(ItemsClient);

  public setItemVehicleTypes$(itemId: string, ids: string[]): Observable<void> {
    return this.#itemsClient
      .getItemVehicleTypes(
        new APIGetItemVehicleTypesRequest({
          itemId: itemId,
        }),
      )
      .pipe(
        switchMap((response) => {
          const promises: Observable<null>[] = [];

          const currentIds: string[] = [];
          for (const itemVehicleType of response.items ? response.items : []) {
            currentIds.push(itemVehicleType.vehicleTypeId);
            if (ids.indexOf(itemVehicleType.vehicleTypeId) === -1) {
              promises.push(
                this.#itemsClient
                  .deleteItemVehicleType(
                    new APIItemVehicleTypeRequest({
                      itemId: itemId,
                      vehicleTypeId: itemVehicleType.vehicleTypeId,
                    }),
                  )
                  .pipe(map(() => null)),
              );
            }
          }

          for (const vehicleTypeId of ids) {
            if (currentIds.indexOf(vehicleTypeId) === -1) {
              promises.push(
                this.#itemsClient
                  .createItemVehicleType(
                    new APIItemVehicleType({
                      itemId: itemId,
                      vehicleTypeId,
                    }),
                  )
                  .pipe(map(() => null)),
              );
            }
          }

          if (promises.length <= 0) {
            promises.push(of(null));
          }

          return forkJoin(promises).pipe(map(() => void 0));
        }),
      );
  }

  public getPath$(options?: GetPathServiceOptions): Observable<APIItemsGetPathResponse> {
    return this.#api.request$<APIItemsGetPathResponse>('GET', 'item/path', {
      params: options,
    });
  }
}
