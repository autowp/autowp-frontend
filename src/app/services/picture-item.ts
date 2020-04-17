import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIItem } from './item';
import { APIPicture } from './picture';
import { APIService } from './api.service';

export interface APIPictureItemAreaPostData {
  left: number;
  top: number;
  width: number;
  height: number;
}

export interface APIPictureItemPostData {
  perspective_id?: number;
}

export interface APIPictureItemGetOptions {
  fields: string;
}

export interface APIPictureItemsGetOptions {
  item_id: number;
  limit: number;
  fields: string;
  order: string;
}

export interface APIPictureItemsGetResponse {
  items: APIPictureItem[];
}

export interface APIPictureItem {
  picture_id: number;
  item_id: number;
  type: number;
  perspective_id: number;
  item: APIItem;
  area: {
    left: number;
    top: number;
    width: number;
    height: number;
  };
  picture?: APIPicture;
}

@Injectable()
export class PictureItemService {
  constructor(private api: APIService) {}

  public setPerspective(
    pictureId: number,
    itemId: number,
    type: number,
    perspectiveId: number
  ): Observable<void> {
    const url = 'picture-item/' + pictureId + '/' + itemId + '/' + type;
    return this.api.request<void>('PUT', url, {body: {
      perspective_id: perspectiveId ? perspectiveId.toString() : null
    }});
  }

  public setArea(
    pictureId: number,
    itemId: number,
    type: number,
    area: APIPictureItemAreaPostData
  ): Observable<void> {
    return this.api.request<void>(
      'PUT',
      'picture-item/' + pictureId + '/' + itemId + '/' + type,
      {body: {
        area
      }}
    );
  }

  public create(
    pictureId: number,
    itemId: number,
    type: number,
    data: APIPictureItemPostData
  ): Observable<void> {
    return this.api.request<void>(
      'POST',
      'picture-item/' + pictureId + '/' + itemId + '/' + type,
      {body: data}
    );
  }

  public remove(
    pictureId: number,
    itemId: number,
    type: number
  ): Observable<void> {
    return this.api.request<void>(
      'DELETE',
      'picture-item/' + pictureId + '/' + itemId + '/' + type
    );
  }

  public changeItem(
    pictureId: number,
    type: number,
    srcItemId: number,
    dstItemId: number
  ): Observable<void> {
    const url = 'picture-item/' + pictureId + '/' + srcItemId + '/' + type;
    return this.api.request<void>('PUT', url, {body: {
      item_id: dstItemId
    }});
  }

  public get(
    pictureId: number,
    itemId: number,
    type: number,
    options: APIPictureItemGetOptions
  ): Observable<APIPictureItem> {
    const params: { [param: string]: string } = {};

    if (options.fields) {
      params.fields = options.fields;
    }

    const url = 'picture-item/' + pictureId + '/' + itemId + '/' + type;

    return this.api.request<APIPictureItem>('GET', url, {
      params
    });
  }

  public getItems(
    options: APIPictureItemsGetOptions
  ): Observable<APIPictureItemsGetResponse> {
    const params: { [param: string]: string } = {};

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

    return this.api.request<APIPictureItemsGetResponse>('GET', 'picture-item', {
      params
    });
  }
}
