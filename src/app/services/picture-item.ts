import {inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {APIService} from './api.service';
import {APIItem} from './item';
import {APIPicture} from './picture';

export interface APIPictureItemGetOptions {
  fields: string;
}

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

  public get$(
    pictureId: number,
    itemId: number,
    type: number,
    options: APIPictureItemGetOptions,
  ): Observable<APIPictureItem> {
    const params: {[param: string]: string} = {};

    if (options.fields) {
      params.fields = options.fields;
    }

    const url = 'picture-item/' + pictureId + '/' + itemId + '/' + type;

    return this.api.request$<APIPictureItem>('GET', url, {
      params,
    });
  }

  public getItems$(options: APIPictureItemsGetOptions): Observable<APIPictureItemsGetResponse> {
    const params: {[param: string]: string} = {};

    if (options.item_id) {
      params.item_id = options.item_id.toString();
    }

    if (options.limit) {
      params.limit = options.limit.toString();
    }

    if (options.fields) {
      params.fields = options.fields;
    }

    if (options.order) {
      params.order = options.order;
    }

    return this.api.request$<APIPictureItemsGetResponse>('GET', 'picture-item', {
      params,
    });
  }
}
