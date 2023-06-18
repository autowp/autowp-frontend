import {Component, Input} from '@angular/core';
import {APIItem} from '@services/item';
import {Observable, forkJoin, BehaviorSubject, combineLatest, EMPTY, of} from 'rxjs';
import {AuthService} from '@services/auth.service';
import {tap, switchMap, distinctUntilChanged, map, catchError, shareReplay} from 'rxjs/operators';
import {
  APIAttrValue,
  APIAttrUserValue,
  APIAttrsService,
  APIAttrUserValueGetResponse,
  AttrAttributeTreeItem,
} from '../../../api/attrs/attrs.service';
import {ToastsService} from '../../../toasts/toasts.service';
import {APIService} from '@services/api.service';
import {
  getAttrDescriptionTranslation,
  getAttrListOptionsTranslation,
  getAttrsTranslation,
  getUnitTranslation,
} from '@utils/translations';
import {APIUser, AttrAttributeType, AttrListOption} from '@grpc/spec.pb';
import {HttpErrorResponse} from '@angular/common/http';

export interface APIAttrAttributeInSpecEditor extends AttrAttributeTreeItem {
  deep: number;
  options$: Observable<ListOption[]>;
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

interface ListOption {
  name: string;
  id: string | null;
}

const booleanOptions: ListOption[] = [
  {
    name: '—',
    id: null,
  },
  {
    name: $localize`no`,
    id: '0',
  },
  {
    name: $localize`yes`,
    id: '1',
  },
];

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

function getAttribute(attributes: APIAttrAttributeInSpecEditor[], id: string): APIAttrAttributeInSpecEditor {
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
  protected readonly item$ = new BehaviorSubject<APIItem>(null);

  protected loading = 0;
  private readonly change$ = new BehaviorSubject<null>(null);
  protected invalidParams: InvalidParams;

  protected readonly user$ = this.auth.getUser$();

  // fields: 'options,childs.options',
  protected readonly attributes$ = this.item$.pipe(
    distinctUntilChanged(),
    switchMap((item) =>
      this.attrsService.getAttributes$(item.attr_zone_id + '', null).pipe(
        catchError((response: unknown) => {
          this.toastService.handleError(response);
          return EMPTY;
        })
      )
    ),
    map((attributes) => this.toPlain(attributes, 0)),
    shareReplay(1)
  );

  protected readonly AttrAttributeTypeId = AttrAttributeType.Id;

  constructor(
    private readonly api: APIService,
    private readonly attrsService: APIAttrsService,
    private readonly auth: AuthService,
    private readonly toastService: ToastsService
  ) {}

  protected readonly values$ = combineLatest([this.item$, this.change$]).pipe(
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

  protected readonly currentUserValues$ = combineLatest([this.item$, this.user$, this.attributes$, this.change$]).pipe(
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
        const attribute = getAttribute(attributes, value.attribute_id + '');
        if (attribute.typeId === AttrAttributeType.Id.INTEGER || attribute.typeId === AttrAttributeType.Id.FLOAT) {
          if (value.value !== null) {
            value.value = +value.value;
          }
        }
        if (attribute.isMultiple) {
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

  protected readonly userValues$: Observable<Map<number, APIAttrUserValue[]>> = combineLatest([
    this.item$,
    this.change$,
  ]).pipe(
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

  protected saveSpecs(user: APIUser, item: APIItem, currentUserValues: {[p: number]: APIAttrUserValue}) {
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

  protected getStep(attribute: APIAttrAttributeInSpecEditor): number {
    return Math.pow(10, -attribute.precision);
  }

  protected getInvalidParams(id: number): string[] {
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

  protected getUnitTranslation(id: string, type: string): string {
    return getUnitTranslation(id, type);
  }

  protected getAttrsTranslation(id: string): string {
    return getAttrsTranslation(id);
  }

  protected getAttrDescriptionTranslation(id: string): string {
    return getAttrDescriptionTranslation(id);
  }

  private listOptions$ = this.attrsService.getListOptions$(null).pipe(
    map((response) =>
      response.toObject().items.map((i) => ({
        ...i,
        name: getAttrListOptionsTranslation(i.name),
      }))
    ),
    shareReplay(1)
  );

  private listOptionsTree(items: AttrListOption.AsObject[], parentID: string): ListOption[] {
    let result: ListOption[] = [];
    items
      .filter((i) => i.parentId === parentID)
      .forEach((i) => {
        result.push(
          i,
          ...this.listOptionsTree(items, i.id).map((i) => ({
            id: i.id,
            name: '…' + i.name,
          }))
        );
      });

    return result;
  }

  private toPlain(options: AttrAttributeTreeItem[], deep: number): APIAttrAttributeInSpecEditor[] {
    const result: APIAttrAttributeInSpecEditor[] = [];
    for (const item of options) {
      let options$: Observable<{name: string; id: string | null}[]> = of([]);

      if (item.typeId === AttrAttributeType.Id.LIST || item.typeId === AttrAttributeType.Id.TREE) {
        options$ = this.listOptions$.pipe(
          map((response) =>
            [
              {
                name: '—',
                id: null,
              },
            ].concat(
              this.listOptionsTree(
                response.filter((o) => o.attributeId === item.id),
                '0'
              )
            )
          )
        );
      }

      if (item.typeId === AttrAttributeType.Id.BOOLEAN) {
        options$ = of(booleanOptions);
      }
      result.push({...item, deep, options$});
      for (const subitem of this.toPlain(item.childs, deep + 1)) {
        result.push(subitem);
      }
    }
    return result;
  }
}
