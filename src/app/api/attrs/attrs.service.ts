import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';
import {APIPaginator, APIService} from '@services/api.service';
import {APIItem} from '@services/item';
import {APIUser} from '@services/user';
import {AttrsClient} from '@grpc/spec.pbsc';
import {Empty} from '@ngx-grpc/well-known-types';
import {
  AttrAttribute,
  AttrAttributeID,
  AttrAttributesRequest,
  AttrAttributeType,
  AttrListOptionsRequest,
  AttrListOptionsResponse,
  AttrZone,
} from '@grpc/spec.pb';

export interface APIAttrListOption {
  id: number;
  name: string;
  childs?: APIAttrListOption[];
}

export interface APIAttrConflictsGetOptions {
  filter: string;
  page: number;
  fields: string;
}

export interface APIAttrConflictValue {
  user_id: number;
  value: string | number | null;
}

export interface APIAttrConflict {
  object: string;
  item_id: number;
  attribute: APIAttrAttribute;
  unit: APIAttrUnit;
  values: APIAttrConflictValue[];

  user?: APIUser; // TODO: remove
}

export interface APIAttrConflictsGetResponse {
  items: APIAttrConflict[];
  paginator: APIPaginator;
}

export interface APIAttrValuesGetOptions {
  item_id: number;
  zone_id?: number;
  fields?: string;
  limit?: number;
}

export interface APIAttrValue {
  attribute_id: number;
  value: APIAttrAttributeValue;
}

export interface APIAttrValuesGetResponse {
  items: APIAttrValue[];
  paginator: APIPaginator;
}

export interface APIAttrUserValuesOptions {
  user_id?: number;
  item_id: number;
  zone_id?: number;
  page?: number;
  fields?: string;
  limit?: number;
}

export type APIAttrAttributeValue = number | string | string[];

export interface APIAttrUserValue {
  item_id: number;
  user_id: number;
  attribute_id: number;
  value: APIAttrAttributeValue;
  empty: boolean;
  value_text: string;
  user: APIUser;
  update_date: string;
  item: APIItem;
  unit: APIAttrUnit;
  path: string[];
}

export interface APIAttrUserValueGetResponse {
  items: APIAttrUserValue[];
  paginator: APIPaginator;
}

export interface APIAttrAttribute {
  parent_id: number | null;
  id: number;
  type_id: number;
  name: string;
  description: string;
  precision: number;
  unit_id: number;
  childs?: APIAttrAttribute[];
  options?: APIAttrListOption[];
  is_multiple: boolean;
  disabled?: boolean;
}

export interface APIAttrUnit {
  id: number;
  name: string;
  abbr: string;
}

export interface AttrAttributeTreeItem extends AttrAttribute.AsObject {
  childs: AttrAttributeTreeItem[];
}

function toTree(items: AttrAttribute[], parentID: string): AttrAttributeTreeItem[] {
  return items
    .filter((i) => i.parentId === parentID)
    .map((i) => {
      const o = i.toObject();
      return {...o, childs: toTree(items, o.id)};
    });
}

@Injectable({
  providedIn: 'root',
})
export class APIAttrsService {
  public readonly attributeTypes$: Observable<AttrAttributeType[]> = this.attrsClient
    .getAttributeTypes(new Empty())
    .pipe(
      map((response) => response.items),
      shareReplay(1)
    );

  public readonly zones$: Observable<AttrZone[]> = this.attrsClient.getZones(new Empty()).pipe(
    map((response) => response.items),
    shareReplay(1)
  );

  constructor(private readonly api: APIService, private readonly attrsClient: AttrsClient) {}

  public getZone$(id: string): Observable<AttrZone> {
    return this.zones$.pipe(
      map((zones) => {
        for (const zone of zones) {
          if (zone.id === id) {
            return zone;
          }
        }
        return null as AttrZone;
      })
    );
  }

  public getAttribute$(id: string): Observable<AttrAttribute> {
    return this.attrsClient.getAttribute(new AttrAttributeID({id}));
  }

  public getUserValues$(options: APIAttrUserValuesOptions): Observable<APIAttrUserValueGetResponse> {
    const params: {[param: string]: string} = {};

    if (options.fields) {
      params.fields = options.fields;
    }

    if (options.item_id) {
      params.item_id = options.item_id.toString();
    }

    if (options.zone_id) {
      params.zone_id = options.zone_id.toString();
    }

    if (options.user_id) {
      params.user_id = options.user_id.toString();
    }

    if (options.page) {
      params.page = options.page.toString();
    }

    if (options.limit) {
      params.limit = options.limit.toString();
    }

    return this.api.request<APIAttrUserValueGetResponse>('GET', 'attr/user-value', {
      params,
    });
  }

  public getValues$(options: APIAttrValuesGetOptions): Observable<APIAttrValuesGetResponse> {
    const params: {[param: string]: string} = {};

    if (options.fields) {
      params.fields = options.fields;
    }

    if (options.item_id) {
      params.item_id = options.item_id.toString();
    }

    if (options.zone_id) {
      params.zone_id = options.zone_id.toString();
    }

    if (options.limit) {
      params.limit = options.limit.toString();
    }

    return this.api.request<APIAttrValuesGetResponse>('GET', 'attr/value', {
      params,
    });
  }

  public getAttributes$(zoneID: string, parentID: string): Observable<AttrAttributeTreeItem[]> {
    return this.attrsClient
      .getAttributes(new AttrAttributesRequest({zoneId: zoneID, parentId: parentID}))
      .pipe(map((response) => toTree(response.items, parentID ? parentID : '0')));
  }

  public getConflicts$(options: APIAttrConflictsGetOptions): Observable<APIAttrConflictsGetResponse> {
    const params: {[param: string]: string} = {};

    if (options.fields) {
      params.fields = options.fields;
    }

    if (options.page) {
      params.page = options.page.toString();
    }

    if (options.filter) {
      params.filter = options.filter.toString();
    }

    return this.api.request<APIAttrConflictsGetResponse>('GET', 'attr/conflict', {
      params,
    });
  }

  public getListOptions$(attributeID: string): Observable<AttrListOptionsResponse> {
    return this.attrsClient.getListOptions(new AttrListOptionsRequest({attributeId: attributeID}));
  }
}
