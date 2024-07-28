import {Injectable} from '@angular/core';
import {
  AttrAttribute,
  AttrAttributeID,
  AttrAttributeType,
  AttrAttributesRequest,
  AttrListOptionsRequest,
  AttrListOptionsResponse,
  AttrZone,
} from '@grpc/spec.pb';
import {AttrsClient} from '@grpc/spec.pbsc';
import {Empty} from '@ngx-grpc/well-known-types';
import {APIPaginator, APIService} from '@services/api.service';
import {APIItem} from '@services/item';
import {Observable} from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';

export interface APIAttrListOption {
  childs?: APIAttrListOption[];
  id: number;
  name: string;
}

export interface APIAttrConflictsGetOptions {
  fields: string;
  filter: string;
  page: number;
}

export interface APIAttrConflictValue {
  user_id: number;
  value: null | number | string;
}

export interface APIAttrConflict {
  attribute: APIAttrAttribute;
  item_id: number;
  object: string;
  unit: APIAttrUnit;

  values: APIAttrConflictValue[];
}

export interface APIAttrConflictsGetResponse {
  items: APIAttrConflict[];
  paginator: APIPaginator;
}

export interface APIAttrValuesGetOptions {
  fields?: string;
  item_id: number;
  limit?: number;
  zone_id?: number;
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
  fields?: string;
  item_id: number;
  limit?: number;
  page?: number;
  user_id?: number;
  zone_id?: number;
}

export type APIAttrAttributeValue = number | string | string[];

export interface APIAttrUserValue {
  attribute_id: number;
  empty: boolean;
  item: APIItem | null;
  item_id: number;
  path: null | string[];
  unit: APIAttrUnit | null;
  update_date: null | string;
  user_id: string;
  value: APIAttrAttributeValue | null;
  value_text: string;
}

export interface APIAttrUserValueGetResponse {
  items: APIAttrUserValue[];
  paginator: APIPaginator;
}

export interface APIAttrAttribute {
  childs?: APIAttrAttribute[];
  description: string;
  disabled?: boolean;
  id: number;
  is_multiple: boolean;
  name: string;
  options?: APIAttrListOption[];
  parent_id: null | number;
  precision: number;
  type_id: number;
  unit_id: number;
}

export interface APIAttrUnit {
  abbr: string;
  id: number;
  name: string;
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
      map((response) => (response.items ? response.items : [])),
      shareReplay(1),
    );

  public readonly zones$: Observable<AttrZone[]> = this.attrsClient.getZones(new Empty()).pipe(
    map((response) => (response.items ? response.items : [])),
    shareReplay(1),
  );

  constructor(
    private readonly api: APIService,
    private readonly attrsClient: AttrsClient,
  ) {}

  public getZone$(id: string): Observable<AttrZone | null> {
    return this.zones$.pipe(
      map((zones) => {
        for (const zone of zones) {
          if (zone.id === id) {
            return zone;
          }
        }
        return null;
      }),
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

  public getAttributes$(zoneID: null | string, parentID: null | string): Observable<AttrAttributeTreeItem[]> {
    return this.attrsClient
      .getAttributes(
        new AttrAttributesRequest({parentId: parentID ? parentID : undefined, zoneId: zoneID ? zoneID : undefined}),
      )
      .pipe(map((response) => toTree(response.items ? response.items : [], parentID ? parentID : '0')));
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

  public getListOptions$(attributeID: string | undefined): Observable<AttrListOptionsResponse> {
    return this.attrsClient.getListOptions(new AttrListOptionsRequest({attributeId: attributeID}));
  }
}
