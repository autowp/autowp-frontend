import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIService } from './api.service';

export interface APIItemLink {
  id: number;
  url: string;
  name: string;
  type_id: string;
}

export interface APIItemLinkGetResponse {
  items: APIItemLink[];
}

export interface APIItemLinkGetItemsOptions {
  item_id: number;
}

@Injectable()
export class ItemLinkService {
  constructor(private api: APIService) {}

  public getItems(
    options: APIItemLinkGetItemsOptions
  ): Observable<APIItemLinkGetResponse> {
    const params: { [param: string]: string } = {};

    if (options.item_id) {
      params.item_id = options.item_id.toString();
    }

    return this.api.request<APIItemLinkGetResponse>('GET', 'item-link', {
      params
    });
  }
}
