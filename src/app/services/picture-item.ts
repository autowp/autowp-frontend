import {inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {APIService} from './api.service';
import {APIItem} from './item';
import {APIPicture} from './picture';

export interface APIPictureItemsGetOptions {
  fields: string;
  item_id: number;
  limit: number;
  order: string;
}

export interface APIPictureItemsGetResponse {
  items: APIPictureItem[];
}

export interface APIPictureItem {
  area: {
    height: number;
    left: number;
    top: number;
    width: number;
  };
  item: APIItem;
  item_id: number;
  perspective_id: number;
  picture?: APIPicture;
  picture_id: number;
  type: number;
}

@Injectable({
  providedIn: 'root',
})
export class PictureItemService {
  private readonly api = inject(APIService);

  public getItems$(options: APIPictureItemsGetOptions): Observable<APIPictureItemsGetResponse> {
    const params: {[param: string]: string} = {};

    if (options.item_id) {
      params['item_id'] = options.item_id.toString();
    }

    if (options.limit) {
      params['limit'] = options.limit.toString();
    }

    if (options.fields) {
      params['fields'] = options.fields;
    }

    if (options.order) {
      params['order'] = options.order;
    }

    return this.api.request$<APIPictureItemsGetResponse>('GET', 'picture-item', {
      params,
    });
  }
}
