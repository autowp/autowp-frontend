import {inject, Injectable} from '@angular/core';
import {APIService} from '@services/api.service';
import {APIItem} from '@services/item';
import {APIVehicleType} from '@services/vehicle-type';
import {Observable} from 'rxjs';

import {APIAttrUnit} from '../api/attrs/attrs.service';

export interface APIMostsItemsGetOptions {
  brand_id?: number;
  rating_catname: string;
  type_catname: string;
  years_catname: string;
}

export interface APIMostsItemPicture {
  name: string;
  route: string[];
  src: string;
}

export interface APIMostsItem {
  item: APIItem;
  pictures: APIMostsItemPicture[];
  unit: APIAttrUnit;
  value_html: string;
  value_text: string;
}

export interface APIMostsItemsGetResponse {
  items: APIMostsItem[];
}

export interface APIMostsMenuRating {
  catname: string;
  name: string;
}

export interface APIMostsMenuYear {
  catname: string;
  name: string;
}

export interface APIMostsMenuGetResponse {
  ratings: APIMostsMenuRating[];
  vehilce_types: APIVehicleType[];
  years: APIMostsMenuYear[];
}

@Injectable({
  providedIn: 'root',
})
export class MostsService {
  private readonly api = inject(APIService);

  private readonly menus$ = new Map<number, Observable<APIMostsMenuGetResponse>>();

  public getMenu$(brandID: number): Observable<APIMostsMenuGetResponse> {
    const cached$ = this.menus$.get(brandID);
    if (cached$) {
      return cached$;
    }

    const o$ = this.api.request$<APIMostsMenuGetResponse>('GET', 'mosts/menu', {
      params: {
        brand_id: brandID.toString(),
      },
    });
    this.menus$.set(brandID, o$);

    return o$;
  }

  public getItems$(options: APIMostsItemsGetOptions): Observable<APIMostsItemsGetResponse> {
    const params: {[param: string]: string} = {};

    if (options.rating_catname) {
      params.rating_catname = options.rating_catname;
    }

    if (options.type_catname) {
      params.type_catname = options.type_catname;
    }

    if (options.years_catname) {
      params.years_catname = options.years_catname;
    }

    if (options.brand_id) {
      params.brand_id = options.brand_id.toString();
    }

    return this.api.request$<APIMostsItemsGetResponse>('GET', 'mosts/items', {
      params,
    });
  }
}
