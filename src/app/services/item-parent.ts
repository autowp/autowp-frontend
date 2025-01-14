import {inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {APIPaginator, APIService} from './api.service';
import {APIItem} from './item';

export interface APIItemParent {
  catname: string;
  expanded?: boolean;
  item: APIItem;
  item_id: number;
  name?: string;
  parent?: APIItem;
  parent_id: number;
  type_id: number;
}

export interface APIItemParentGetItemsOptions {
  catname?: string;
  concept?: boolean;
  exclude_concept?: boolean;
  fields?: string;
  is_group?: boolean;
  item_id?: null | number;
  item_type_id?: number;
  limit: number;
  order?: string;
  page?: number;
  parent_id?: number;
  type_id?: null | number;
}

export interface APIItemParentGetResponse {
  items: APIItemParent[];
  paginator: APIPaginator;
}

@Injectable({
  providedIn: 'root',
})
export class ItemParentService {
  private readonly api = inject(APIService);

  public getItems$(options: APIItemParentGetItemsOptions): Observable<APIItemParentGetResponse> {
    const params: {[param: string]: string} = {};

    if (options.item_type_id) {
      params['item_type_id'] = options.item_type_id.toString();
    }

    if (options.parent_id) {
      params['parent_id'] = options.parent_id.toString();
    }

    if (options.fields) {
      params['fields'] = options.fields;
    }

    if (options.limit) {
      params['limit'] = options.limit.toString();
    }

    if (options.page) {
      params['page'] = options.page.toString();
    }

    if (options.concept) {
      params['concept'] = '1';
    }

    if (typeof options.type_id !== 'undefined' && options.type_id !== null) {
      params['type_id'] = options.type_id.toString();
    }

    if (options.order) {
      params['order'] = options.order;
    }

    if (typeof options.item_id !== 'undefined' && options.item_id !== null) {
      params['item_id'] = options.item_id.toString();
    }

    if (options.is_group) {
      params['is_group'] = '1';
    }

    if (options.exclude_concept) {
      params['exclude_concept'] = '1';
    }

    if (options.catname) {
      params['catname'] = options.catname;
    }

    return this.api.request$<APIItemParentGetResponse>('GET', 'item-parent', {
      params,
    });
  }
}
