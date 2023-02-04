import {Component, Input} from '@angular/core';
import {APIItem} from '../../../services/item';
import {Observable, forkJoin, BehaviorSubject, combineLatest, EMPTY, of} from 'rxjs';
import {AuthService} from '../../../services/auth.service';
import {tap, switchMap, distinctUntilChanged, map, catchError, shareReplay} from 'rxjs/operators';
import {
  APIAttrAttribute,
  APIAttrValue,
  APIAttrUserValue,
  APIAttrsService,
  APIAttrUserValueGetResponse,
} from '../../../api/attrs/attrs.service';
import {ToastsService} from '../../../toasts/toasts.service';
import {APIService} from '../../../services/api.service';
import {getAttrDescriptionTranslation, getAttrsTranslation, getUnitTranslation} from '../../../utils/translations';
import {APIUser} from '@grpc/spec.pb';
import {HttpErrorResponse} from '@angular/common/http';

export interface APIAttrAttributeInSpecEditor extends APIAttrAttribute {
  deep?: number;
}

interface InvalidParams {
  items: any;
}

interface APIAttrUserValuePatchResponse {
  detail: string;
  invalid_params: InvalidParams;
  status: number;
  title: string;
  type: string;
}

const booleanOptions = [
  {
    name: '—',
    id: null,
  },
  {
    name: $localize`no`,
    id: 0,
  },
  {
    name: $localize`yes`,
    id: 1,
  },
];

function toPlain(options: APIAttrAttributeInSpecEditor[], deep: number): APIAttrAttributeInSpecEditor[] {
  const result: APIAttrAttributeInSpecEditor[] = [];
  for (const item of options) {
    item.deep = deep;
    result.push(item);
    for (const subitem of toPlain(item.childs, deep + 1)) {
      result.push(subitem);
    }
  }
  return result;
}

function applyUserValues(userValues: Map<number, APIAttrUserValue[]>, items: APIAttrUserValue[]) {
  for (const value of items) {
    const values = userValues.get(value.attribute_id);
    if (values === undefined) {
      userValues.set(value.attribute_id, [value]);
    } else {
      values.push(value);
      userValues.set(value.attribute_id, values);
    }
  }
}

function getAttribute(attributes: APIAttrAttributeInSpecEditor[], id: number): APIAttrAttribute {
  for (const attribute of attributes) {
    if (attribute.id === id) {
      return attribute;
    }
  }

  return undefined;
}

@Component({
  selector: 'app-cars-specifications-editor-spec',
  templateUrl: './spec.component.html',
  styleUrls: ['./spec.component.scss'],
})
export class CarsSpecificationsEditorSpecComponent {
  @Input() set item(item: APIItem) {
    this.item$.next(item);
  }
  public item$ = new BehaviorSubject<APIItem>(null);

  public loading = 0;
  private change$ = new BehaviorSubject<null>(null);
  public invalidParams: InvalidParams;

  public user$ = this.auth.getUser$();

  public attributes$ = this.item$.pipe(
    distinctUntilChanged(),
    switchMap((item) =>
      this.attrsService
        .getAttributes$({
          fields: 'unit,options,childs.unit,childs.options',
          zone_id: item.attr_zone_id,
          recursive: true,
        })
        .pipe(
          catchError((response: unknown) => {
            this.toastService.handleError(response);
            return EMPTY;
          }),
          map((attributes) => ({item, attributes}))
        )
    ),
    map(({item, attributes}) => {
      const attrs = toPlain(attributes.items, 0);
      for (const attribute of attrs) {
        if (attribute.options) {
          attribute.options.splice(0, 0, {
            name: '—',
            id: null,
          });
        }

        if (attribute.type_id === 5) {
          attribute.options = booleanOptions;
        }
      }

      return attrs;
    }),
    shareReplay(1)
  );

  constructor(
    private api: APIService,
    private attrsService: APIAttrsService,
    private auth: AuthService,
    private toastService: ToastsService
  ) {}

  public values$ = combineLatest([this.item$, this.change$]).pipe(
    switchMap(([item]) =>
      this.attrsService.getValues$({
        item_id: item.id,
        zone_id: item.attr_zone_id,
        limit: 500,
        fields: 'value,value_text',
      })
    ),
    map((response) => {
      const values = new Map<number, APIAttrValue>();
      for (const value of response.items) {
        values.set(value.attribute_id, value);
      }
      return values;
    }),
    shareReplay(1)
  );

  public currentUserValues$ = combineLatest([this.item$, this.user$, this.attributes$, this.change$]).pipe(
    switchMap(([item, user, attributes]) =>
      this.attrsService
        .getUserValues$({
          item_id: item.id,
          user_id: +user.id,
          zone_id: item.attr_zone_id,
          limit: 500,
          fields: 'value',
        })
        .pipe(map((response) => ({response, user, item, attributes})))
    ),
    map(({response, user, item, attributes}) => {
      const currentUserValues: {[key: number]: APIAttrUserValue} = {};
      for (const value of response.items) {
        const attribute = getAttribute(attributes, value.attribute_id);
        if (attribute.type_id === 2 || attribute.type_id === 3) {
          if (value.value !== null) {
            value.value = +value.value;
          }
        }
        if (attribute.is_multiple) {
          if (!(value.value instanceof Array)) {
            value.value = [value.value.toString()];
          }
        }
        currentUserValues[value.attribute_id] = value;
      }

      for (const attr of attributes) {
        if (!currentUserValues.hasOwnProperty(attr.id)) {
          currentUserValues[attr.id] = {
            item_id: item.id,
            user_id: +user.id,
            attribute_id: attr.id,
            value: null,
            empty: false,
            value_text: '',
            user: null,
            update_date: null,
            item: null,
            unit: null,
            path: null,
          };
        }
      }

      return currentUserValues;
    })
  );

  public userValues$: Observable<Map<number, APIAttrUserValue[]>> = combineLatest([this.item$, this.change$]).pipe(
    switchMap(([item]) =>
      this.attrsService
        .getUserValues$({
          item_id: item.id,
          page: 1,
          zone_id: item.attr_zone_id,
          limit: 500,
          fields: 'value_text,user',
        })
        .pipe(map((response) => ({response, item})))
    ),
    map(({response, item}) => {
      const uv = new Map<number, APIAttrUserValue[]>();
      applyUserValues(uv, response.items);
      return {uv, paginator: response.paginator, item};
    }),
    switchMap(({uv, paginator, item}) => {
      const observables: Observable<APIAttrUserValueGetResponse>[] = [];
      for (let i = 2; i <= paginator.pageCount; i++) {
        observables.push(
          this.attrsService
            .getUserValues$({
              item_id: item.id,
              page: i,
              zone_id: item.attr_zone_id,
              limit: 500,
              fields: 'value_text,user',
            })
            .pipe(
              tap((subresponse) => {
                applyUserValues(uv, subresponse.items);
              })
            )
        );
      }

      return (observables.length ? forkJoin(observables) : of(null)).pipe(map(() => uv));
    }),
    shareReplay(1)
  );

  public saveSpecs(user: APIUser, item: APIItem, currentUserValues: {[p: number]: APIAttrUserValue}) {
    const items = [];
    for (const attributeID in currentUserValues) {
      if (currentUserValues.hasOwnProperty(attributeID)) {
        items.push({
          item_id: item.id,
          attribute_id: attributeID,
          user_id: user.id,
          value: currentUserValues[attributeID].value,
          empty: currentUserValues[attributeID].empty,
        });
      }
    }

    this.loading++;
    this.invalidParams = null;
    this.api
      .request<APIAttrUserValuePatchResponse>('PATCH', 'attr/user-value', {
        body: {
          items,
        },
      })
      .subscribe({
        next: () => {
          this.change$.next(null);
          this.loading--;
        },
        error: (response: unknown) => {
          if (response instanceof HttpErrorResponse && response.status === 400) {
            this.invalidParams = response.error.invalid_params;
          } else {
            this.toastService.handleError(response);
          }
          this.loading--;
        },
      });
  }

  public getStep(attribute: APIAttrAttribute): number {
    return Math.pow(10, -attribute.precision);
  }

  public getInvalidParams(id: number): string[] {
    if (!this.invalidParams || !this.invalidParams.items) {
      return [];
    }

    const items = this.invalidParams.items;

    if (!items[id]) {
      return [];
    }

    const result = [];
    for (const field in items[id]) {
      if (items[id].hasOwnProperty(field)) {
        for (const code in items[id][field]) {
          if (items[id][field].hasOwnProperty(code)) {
            result.push(items[id][field][code]);
          }
        }
      }
    }

    return result;
  }

  public getUnitTranslation(id: number, type: string): string {
    return getUnitTranslation(id, type);
  }

  public getAttrsTranslation(id: string): string {
    return getAttrsTranslation(id);
  }

  public getAttrDescriptionTranslation(id: string): string {
    return getAttrDescriptionTranslation(id);
  }
}
