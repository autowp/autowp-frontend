import {OnInit, Component, Input, OnDestroy} from '@angular/core';
import { APIItem } from '../../../services/item';
import {
  Observable,
  Subscription,
  forkJoin,
  BehaviorSubject,
  combineLatest
} from 'rxjs';
import { AuthService } from '../../../services/auth.service';
import {tap, switchMap, distinctUntilChanged, map} from 'rxjs/operators';
import {
  APIAttrAttribute,
  APIAttrValue,
  APIAttrUserValue,
  APIAttrsService,
  APIAttrUserValueGetResponse
} from '../../../api/attrs/attrs.service';
import {ToastsService} from '../../../toasts/toasts.service';
import { APIService } from '../../../services/api.service';
import {getAttrDescriptionTranslation, getAttrsTranslation, getUnitTranslation } from '../../../utils/translations';
import {APIUser} from '../../../../../generated/spec.pb';

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

function toPlain(
  options: APIAttrAttributeInSpecEditor[],
  deep: number
): APIAttrAttributeInSpecEditor[] {
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

@Component({
  selector: 'app-cars-specifications-editor-spec',
  templateUrl: './spec.component.html',
  styleUrls: ['./spec.component.scss']
})
export class CarsSpecificationsEditorSpecComponent
  implements OnInit, OnDestroy {

  @Input() set item(item: APIItem) { this.item$.next(item); };
  public item$ = new BehaviorSubject<APIItem>(null);

  public loading = 0;
  public attributes: APIAttrAttributeInSpecEditor[] = [];
  public values = new Map<number, APIAttrValue>();
  public userValues = new Map<number, APIAttrUserValue[]>();
  public currentUserValues: { [key: number]: APIAttrUserValue } = {};
  private user: APIUser;
  private sub: Subscription;
  private change$ = new BehaviorSubject<null>(null);
  public invalidParams: InvalidParams;

  constructor(
    private api: APIService,
    private attrsService: APIAttrsService,
    private auth: AuthService,
    private toastService: ToastsService
  ) {}

  private applyCurrentUserValues(item: APIItem, values) {
    const currentUserValues: { [key: number]: APIAttrUserValue } = {};
    for (const value of values) {
      const attribute = this.getAttribute(value.attribute_id);
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

    for (const attr of this.attributes) {
      if (!currentUserValues.hasOwnProperty(attr.id)) {
        currentUserValues[attr.id] = {
          item_id: item.id,
          user_id: +this.user.id,
          attribute_id: attr.id,
          value: null,
          empty: false,
          value_text: '',
          user: null,
          update_date: null,
          item: null,
          unit: null,
          path: null
        };
      }
    }

    this.currentUserValues = currentUserValues;
  }

  private values$(item: APIItem) {
    return this.attrsService
      .getValues({
        item_id: item.id,
        zone_id: item.attr_zone_id,
        limit: 500,
        fields: 'value,value_text'
      })
      .pipe(
        tap(values => {
          this.values.clear();
          for (const value of values.items) {
            this.values.set(value.attribute_id, value);
          }
        })
      );
  }

  private currentUserValues$(item: APIItem, user: APIUser) {
    return this.attrsService
      .getUserValues({
        item_id: item.id,
        user_id: +user.id,
        zone_id: item.attr_zone_id,
        limit: 500,
        fields: 'value'
      })
      .pipe(tap(response => this.applyCurrentUserValues(item, response.items)));
  }

  private userValues$(item: APIItem) {
    return this.attrsService
      .getUserValues({
        item_id: item.id,
        page: 1,
        zone_id: item.attr_zone_id,
        limit: 500,
        fields: 'value_text,user'
      })
      .pipe(
        tap(response => {
          this.userValues.clear();
          this.applyUserValues(response.items);
        }),
        switchMap(response => {
          const observables: Observable<APIAttrUserValueGetResponse>[] = [];
          for (let i = 2; i <= response.paginator.pageCount; i++) {
            observables.push(
              this.attrsService
                .getUserValues({
                  item_id: item.id,
                  page: i,
                  zone_id: item.attr_zone_id,
                  limit: 500,
                  fields: 'value_text,user'
                })
                .pipe(
                  tap(subresponse => {
                    this.userValues.clear();
                    this.applyUserValues(subresponse.items);
                  })
                )
            );
          }

          return forkJoin(observables);
        })
      );
  }

  ngOnInit(): void {
    this.sub = this.item$
      .pipe(
        distinctUntilChanged(),
        switchMap(
          item =>
            this.attrsService.getAttributes({
              fields: 'unit,options,childs.unit,childs.options',
              zone_id: item.attr_zone_id,
              recursive: true
            }).pipe(
              map(attributes => ({ item, attributes }))
            )
        ),
        switchMap(data => {

          const booleanOptions = [
            {
              name: '—',
              id: null
            },
            {
              name: $localize`no`,
              id: 0
            },
            {
              name: $localize`yes`,
              id: 1
            }
          ];

          const attibutes = toPlain(data.attributes.items, 0);
          for (const attribute of attibutes) {
            if (attribute.options) {
              attribute.options.splice(0, 0, {
                name: '—',
                id: null
              });
            }

            if (attribute.type_id === 5) {
              attribute.options = booleanOptions;
            }
          }

          this.attributes = attibutes;

          return combineLatest([
            this.auth.getUser().pipe(tap(user => (this.user = user))),
            this.change$
          ]).pipe(
            switchMap(user =>
              combineLatest([
                this.values$(data.item),
                this.currentUserValues$(data.item, user[0]),
                this.userValues$(data.item)
              ])
            )
          );
        })
      )
      .subscribe({
        error: response => this.toastService.response(response)
      });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  public saveSpecs(item: APIItem) {
    const items = [];
    for (const attributeID in this.currentUserValues) {
      if (this.currentUserValues.hasOwnProperty(attributeID)) {
        items.push({
          item_id: item.id,
          attribute_id: attributeID,
          user_id: this.user.id,
          value: this.currentUserValues[attributeID].value,
          empty: this.currentUserValues[attributeID].empty
        });
      }
    }

    this.loading++;
    this.invalidParams = null;
    this.api
      .request<APIAttrUserValuePatchResponse>('PATCH', 'attr/user-value', {body: {
        items
      }})
      .subscribe(
        () => {
          this.change$.next(null);
          this.loading--;
        },
        response => {
          if (response.status === 400) {
            this.invalidParams = response.error.invalid_params;
          } else {
            this.toastService.response(response);
          }
          this.loading--;
        }
      );
  }

  public getStep(attribute: APIAttrAttribute): number {
    return Math.pow(10, -attribute.precision);
  }

  private applyUserValues(items: APIAttrUserValue[]) {
    for (const value of items) {
      const values = this.userValues.get(value.attribute_id);
      if (values === undefined) {
        this.userValues.set(value.attribute_id, [value]);
      } else {
        values.push(value);
        this.userValues.set(value.attribute_id, values);
      }
    }
  }

  private getAttribute(id: number): APIAttrAttribute {
    for (const attribute of this.attributes) {
      if (attribute.id === id) {
        return attribute;
      }
    }

    return undefined;
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
