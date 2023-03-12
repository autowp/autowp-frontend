import {Injectable} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';
import {APIPaginator, APIService} from '@services/api.service';
import {APIItem} from '@services/item';
import {APIUser} from '@services/user';

export interface APIAttrListOption {
  id: number;
  name: string;
  childs?: APIAttrListOption[];
}

export interface APIttrListOptionsGetResponse {
  items: APIAttrListOption[];
}

export interface APIttrListOptionsGetOptions {
  attribute_id: number;
}

export interface APIAttrConflicsGetOptions {
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

export interface APIAttrConflicsGetResponse {
  items: APIAttrConflict[];
  paginator: APIPaginator;
}

export interface APIAttrAttributesGetOptions {
  fields?: string;
  zone_id?: number;
  recursive: boolean;
}

export interface APIAttrAttributesGetResponse {
  items: APIAttrAttribute[];
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

export interface APIAttrsZonesGetResponse {
  items: APIAttrZone[];
}

export interface APIAttrsAttributeTypesGetResponse {
  items: APIAttrAttributeType[];
}

export interface APIAttrsUnitGetResponse {
  items: APIAttrUnit[];
}

export interface APIAttrAttributeGetResponse {
  items: APIAttrAttribute[];
}

export interface APIAttrZone {
  id: number;
  name: string;
}

export interface APIAttrAttribute {
  parent_id: number | null;
  id: number;
  type_id: number;
  name: string;
  description: string;
  precision: number;
  unit_id: number;
  unit?: APIAttrUnit;
  childs?: APIAttrAttribute[];
  options?: APIAttrListOption[];
  is_multiple: boolean;
  disabled?: boolean;
}

export interface APIAttrAttributeType {
  id: number;
  name: string;
}

export interface APIAttrUnit {
  id: number;
  name: string;
  abbr: string;
}

export interface GetAttributeServiceOptions {
  fields: string;
}

export interface APIAttrListOptionPostOptions {
  attribute_id: number;
  parent_id?: number;
  name: string;
}

export interface APIAttrAttributePatchOptions {
  type_id?: number;
  name?: string;
  description?: string;
  precision?: number;
  unit_id?: number;
  is_multiple?: boolean;
}

export interface APIAttrAttributePostOptions {
  parent_id: number;
  type_id: number;
  name: string;
  description: string;
  precision?: number;
  unit_id?: number;
  is_multiple: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class APIAttrsService {
  private readonly attributeTypes$: Observable<APIAttrAttributeType[]>;
  private readonly zones$: Observable<APIAttrZone[]>;
  private readonly units$: Observable<APIAttrUnit[]>;

  constructor(private api: APIService) {
    this.attributeTypes$ = this.api.request<APIAttrsAttributeTypesGetResponse>('GET', 'attr/attribute-type').pipe(
      map((response) => response.items),
      shareReplay(1)
    );

    this.zones$ = this.api.request<APIAttrsZonesGetResponse>('GET', 'attr/zone').pipe(
      map((response) => response.items),
      shareReplay(1)
    );

    this.units$ = this.api.request<APIAttrsUnitGetResponse>('GET', 'attr/unit').pipe(
      map((response) => response.items),
      shareReplay(1)
    );
  }

  public getZone$(id: number | string): Observable<APIAttrZone> {
    if (typeof id !== 'number') {
      id = parseInt(id, 10);
    }
    return this.getZones$().pipe(
      map((zones) => {
        for (const zone of zones) {
          if (zone.id === id) {
            return zone;
          }
        }
        return null as APIAttrZone;
      })
    );
  }

  public getZones$(): Observable<APIAttrZone[]> {
    return this.zones$;
  }

  public getAttribute$(id: number, options?: GetAttributeServiceOptions): Observable<APIAttrAttribute> {
    return this.api.request<APIAttrAttribute>('GET', 'attr/attribute/' + id);
  }

  public getAttributeByLocation$(location: string): Observable<APIAttrAttribute> {
    return this.api.request<APIAttrAttribute>('GET', this.api.resolveLocation(location));
  }

  public getAttributeTypes$(): Observable<APIAttrAttributeType[]> {
    return this.attributeTypes$;
  }

  public getUnits$(): Observable<APIAttrUnit[]> {
    return this.units$;
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
  public getAttributes$(options: APIAttrAttributesGetOptions): Observable<APIAttrAttributesGetResponse> {
    const params: {[param: string]: string} = {};

    if (options.fields) {
      params.fields = options.fields;
    }

    if (options.zone_id) {
      params.zone_id = options.zone_id.toString();
    }

    if (options.recursive) {
      params.recursive = '1';
    }

    return this.api.request<APIAttrAttributesGetResponse>('GET', 'attr/attribute', {
      params,
    });
  }

  public getConfilicts$(options: APIAttrConflicsGetOptions): Observable<APIAttrConflicsGetResponse> {
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

    return this.api.request<APIAttrConflicsGetResponse>('GET', 'attr/conflict', {
      params,
    });
  }

  public getListOptions$(options: APIttrListOptionsGetOptions): Observable<APIttrListOptionsGetResponse> {
    const params: {[param: string]: string} = {};

    if (options.attribute_id) {
      params.attribute_id = options.attribute_id.toString();
    }

    return this.api.request<APIttrListOptionsGetResponse>('GET', 'attr/list-option', {
      params,
    });
  }

  public createListOption$(options: APIAttrListOptionPostOptions): Observable<HttpResponse<void>> {
    const data: {[param: string]: string} = {
      attribute_id: options.attribute_id.toString(),
      name: options.name,
    };

    if (options.parent_id) {
      data.parent_id = options.parent_id.toString();
    }

    return this.api.request<void>('POST', 'attr/list-option', {
      body: data,
      observe: 'response',
    });
  }

  public updateAttribute$(id: number, options: APIAttrAttributePatchOptions): Observable<void> {
    const data: {[param: string]: string} = {};

    if (options.hasOwnProperty('description')) {
      data.description = options.description;
    }

    if (options.hasOwnProperty('is_multiple')) {
      data.is_multiple = options.is_multiple ? '1' : '0';
    }

    if (options.hasOwnProperty('name')) {
      data.name = options.name;
    }

    if (options.hasOwnProperty('precision')) {
      data.precision = options.precision ? options.precision.toString() : '';
    }

    if (options.hasOwnProperty('type_id')) {
      data.type_id = options.type_id ? options.type_id.toString() : '';
    }

    if (options.hasOwnProperty('unit_id')) {
      data.unit_id = options.unit_id ? options.unit_id.toString() : '';
    }

    return this.api.request<void>('PATCH', 'attr/attribute/' + id, {body: data});
  }

  public createAttribute$(options: APIAttrAttributePostOptions): Observable<HttpResponse<void>> {
    const data: {[param: string]: any} = {
      name: options.name,
      type_id: options.type_id,
      unit_id: options.unit_id,
      precision: options.precision,
      is_multiple: options.is_multiple,
      description: options.description,
    };

    if (options.parent_id) {
      data.parent_id = options.parent_id.toString();
    }

    return this.api.request<void>('POST', 'attr/attribute', {body: data, observe: 'response'});
  }
}
