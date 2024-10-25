import {AsyncPipe, DatePipe, NgStyle} from '@angular/common';
import {HttpErrorResponse} from '@angular/common/http';
import {Component, inject, Input} from '@angular/core';
import {FormArray, FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
  APIUser,
  AttrAttributeType,
  AttrListOption,
  AttrUserValue,
  AttrUserValuesFields,
  AttrUserValuesRequest,
  AttrValue,
  AttrValuesRequest,
  AttrValueValue,
} from '@grpc/spec.pb';
import {AttrsClient} from '@grpc/spec.pbsc';
import {NgbTooltip} from '@ng-bootstrap/ng-bootstrap';
import {APIService} from '@services/api.service';
import {AuthService} from '@services/auth.service';
import {APIItem} from '@services/item';
import {LanguageService} from '@services/language';
import {UserService} from '@services/user';
import {InvalidParams, InvalidParamsPipe} from '@utils/invalid-params.pipe';
import {TimeAgoPipe} from '@utils/time-ago.pipe';
import {
  getAttrDescriptionTranslation,
  getAttrListOptionsTranslation,
  getAttrsTranslation,
  getUnitAbbrTranslation,
  getUnitNameTranslation,
} from '@utils/translations';
import {BehaviorSubject, combineLatest, EMPTY, Observable, of, throwError} from 'rxjs';
import {catchError, distinctUntilChanged, map, shareReplay, switchMap} from 'rxjs/operators';

import {APIAttrsService, AttrAttributeTreeItem} from '../../../api/attrs/attrs.service';
import {ToastsService} from '../../../toasts/toasts.service';
import {UserComponent} from '../../../user/user/user.component';

export interface APIAttrAttributeInSpecEditor extends AttrAttributeTreeItem {
  deep: number;
  options$: Observable<ListOption[]>;
  step: number;
  unitAbbr: string;
  unitName: string;
}

interface APIAttrUserValuePatchResponse {
  detail: string;
  status: number;
  title: string;
  type: string;
}

interface ListOption {
  id: null | string;
  name: string;
}

interface AttrUserValueWithUser {
  user$: Observable<APIUser | null>;
  userValue: AttrUserValue;
}

const booleanOptions: ListOption[] = [
  {
    id: null,
    name: '—',
  },
  {
    id: '0',
    name: $localize`no`,
  },
  {
    id: '1',
    name: $localize`yes`,
  },
];

export class AttrFormControl<TValue> extends FormControl {
  public attr: APIAttrAttributeInSpecEditor;
  constructor(attr: APIAttrAttributeInSpecEditor, value: TValue, disabled: boolean) {
    super({disabled, value});

    this.attr = attr;
  }
}

@Component({
  imports: [
    FormsModule,
    NgStyle,
    ReactiveFormsModule,
    UserComponent,
    NgbTooltip,
    AsyncPipe,
    DatePipe,
    InvalidParamsPipe,
    TimeAgoPipe,
  ],
  selector: 'app-cars-specifications-editor-spec',
  standalone: true,
  styleUrls: ['./spec.component.scss'],
  templateUrl: './spec.component.html',
})
export class CarsSpecificationsEditorSpecComponent {
  private readonly api = inject(APIService);
  private readonly attrsService = inject(APIAttrsService);
  private readonly auth = inject(AuthService);
  private readonly toastService = inject(ToastsService);
  private readonly userService = inject(UserService);
  private readonly attrsClient = inject(AttrsClient);
  private readonly languageService = inject(LanguageService);

  @Input() set item(item: APIItem) {
    this.item$.next(item);
  }
  protected readonly item$ = new BehaviorSubject<APIItem | null>(null);

  protected loading = 0;
  private readonly change$ = new BehaviorSubject<void>(void 0);
  protected readonly invalidParams = new Map<string, InvalidParams>();

  protected readonly user$ = this.auth.getUser$();

  // fields: 'options,childs.options',
  protected readonly attributes$: Observable<APIAttrAttributeInSpecEditor[]> = this.item$.pipe(
    distinctUntilChanged(),
    switchMap((item) =>
      item && item.attr_zone_id
        ? this.attrsService.getAttributes$(item.attr_zone_id + '', null)
        : throwError(() => new Error('Failed to detect attr_zone_id')),
    ),
    catchError((response: unknown) => {
      this.toastService.handleError(response);
      return EMPTY;
    }),
    map((attributes) => this.toPlain(attributes, 0)),
    shareReplay({bufferSize: 1, refCount: false}),
  );

  protected readonly AttrAttributeTypeId = AttrAttributeType.Id;

  protected readonly currentUserValues$: Observable<{[p: string]: AttrUserValue}> = combineLatest([
    this.item$,
    this.user$,
    this.attributes$,
    this.change$,
  ]).pipe(
    switchMap(([item, user, attributes]) =>
      item && user
        ? this.attrsClient
            .getUserValues(
              new AttrUserValuesRequest({
                itemId: '' + item.id,
                language: this.languageService.language,
                userId: user.id,
                zoneId: '' + item.attr_zone_id,
              }),
            )
            .pipe(map((response) => ({attributes, response})))
        : EMPTY,
    ),
    map(({attributes, response}) => {
      const currentUserValues: {[key: string]: AttrUserValue} = {};
      for (const value of response.items || []) {
        currentUserValues[value.attributeId] = value;
      }

      for (const attr of attributes) {
        if (!currentUserValues[attr.id]) {
          currentUserValues[attr.id] = new AttrUserValue({
            value: new AttrValueValue(),
          });
        }
      }

      return currentUserValues;
    }),
  );

  protected readonly form$: Observable<FormArray<AttrFormControl<boolean | null | number | string | string[]>>> =
    combineLatest([this.attributes$, this.currentUserValues$]).pipe(
      map(([attributes, currentUserValues]) => {
        const controls: AttrFormControl<boolean | null | number | string | string[]>[] = attributes
          .map((attr) => {
            const currentUserValue = currentUserValues[+attr.id].value;
            const disabled = !!currentUserValue?.isEmpty;

            switch (attr.typeId) {
              case AttrAttributeType.Id.BOOLEAN:
                return new AttrFormControl<boolean>(attr, currentUserValue?.boolValue || false, disabled);
              case AttrAttributeType.Id.FLOAT:
                return new AttrFormControl<null | number>(attr, currentUserValue?.floatValue || null, disabled);
              case AttrAttributeType.Id.INTEGER:
                return new AttrFormControl<null | number>(attr, currentUserValue?.intValue || null, disabled);
              case AttrAttributeType.Id.LIST:
              case AttrAttributeType.Id.TREE:
                return new AttrFormControl<string[]>(attr, currentUserValue?.listValue || [], disabled);
              case AttrAttributeType.Id.STRING:
              case AttrAttributeType.Id.TEXT:
                return new AttrFormControl<string>(attr, currentUserValue?.stringValue || '', disabled);
            }
            return new AttrFormControl<null>(attr, null, disabled);
          })
          .filter((control): control is Exclude<typeof control, null> => control !== null);
        return new FormArray<AttrFormControl<boolean | null | number | string | string[]>>(controls);
      }),
    );

  private applyUserValues(userValues: Map<string, AttrUserValueWithUser[]>, items: AttrUserValue[]) {
    for (const userValue of items) {
      const v: AttrUserValueWithUser = {user$: this.userService.getUser$(userValue.userId), userValue};
      const values = userValues.get(userValue.attributeId);
      if (values === undefined) {
        userValues.set(userValue.attributeId, [v]);
      } else {
        values.push(v);
        userValues.set(userValue.attributeId, values);
      }
    }
  }

  protected readonly values$ = combineLatest([this.item$, this.change$]).pipe(
    switchMap(([item]) =>
      item
        ? this.attrsClient.getValues(
            new AttrValuesRequest({
              itemId: '' + item.id,
              language: this.languageService.language,
              zoneId: '' + item.attr_zone_id,
            }),
          )
        : EMPTY,
    ),
    map((response) => {
      const values = new Map<string, AttrValue>();
      for (const value of response?.items || []) {
        values.set(value.attributeId, value);
      }
      return values;
    }),
    shareReplay({bufferSize: 1, refCount: false}),
  );

  protected readonly userValues$: Observable<Map<string, AttrUserValueWithUser[]>> = combineLatest([
    this.item$,
    this.change$,
  ]).pipe(
    switchMap(([item]) =>
      item
        ? this.attrsClient.getUserValues(
            new AttrUserValuesRequest({
              fields: new AttrUserValuesFields({valueText: true}),
              itemId: '' + item.id,
              language: this.languageService.language,
              zoneId: '' + item.attr_zone_id,
            }),
          )
        : EMPTY,
    ),
    map((response) => {
      const uv = new Map<string, AttrUserValueWithUser[]>();
      this.applyUserValues(uv, response?.items || []);
      return uv;
    }),
    shareReplay({bufferSize: 1, refCount: false}),
  );

  protected saveSpecs(
    user: APIUser,
    item: APIItem,
    form: FormArray<AttrFormControl<boolean | null | number | string | string[]>>,
  ) {
    const items = form.controls.map((control) => ({
      attribute_id: control.attr.id,
      empty: control.disabled,
      item_id: item.id,
      user_id: user.id,
      value: control.value || null,
    }));

    this.loading++;
    this.invalidParams.clear();
    this.api
      .request<APIAttrUserValuePatchResponse>('PATCH', 'attr/user-value', {
        body: {
          items,
        },
      })
      .subscribe({
        error: (response: unknown) => {
          if (response instanceof HttpErrorResponse && response.status === 400) {
            this.invalidParams.clear();
            const ipItems = response.error.invalid_params.items;
            items.forEach((v, i) => {
              if (ipItems[i]) {
                this.invalidParams.set(v.attribute_id, ipItems[i]);
              }
            });
          } else {
            this.toastService.handleError(response);
          }
          this.loading--;
        },
        next: () => {
          this.change$.next();
          this.loading--;
        },
      });
  }

  private listOptions$: Observable<{attributeId: string; id: string; name: string; parentId: string}[]> =
    this.attrsService.getListOptions$(undefined).pipe(
      map((response) =>
        (response.items ? response.items : []).map((i) => ({
          ...i.toObject(),
          name: getAttrListOptionsTranslation(i.name),
        })),
      ),
      shareReplay({bufferSize: 1, refCount: false}),
    );

  private listOptionsTree(items: AttrListOption.AsObject[], parentID: string): ListOption[] {
    const result: ListOption[] = [];
    items
      .filter((i) => i.parentId === parentID)
      .forEach((i) => {
        result.push(
          i,
          ...this.listOptionsTree(items, i.id).map((i) => ({
            id: i.id,
            name: '…' + i.name,
          })),
        );
      });

    return result;
  }

  private toPlain(options: AttrAttributeTreeItem[], deep: number): APIAttrAttributeInSpecEditor[] {
    const result: APIAttrAttributeInSpecEditor[] = [];
    for (const item of options) {
      let options$: Observable<ListOption[]> = of([]);

      if (item.typeId === AttrAttributeType.Id.LIST || item.typeId === AttrAttributeType.Id.TREE) {
        options$ = this.listOptions$.pipe(
          map((response) => {
            const opts: ListOption[] = this.listOptionsTree(
              response.filter((o) => o.attributeId === item.id),
              '0',
            );
            return [
              {
                id: null,
                name: '—',
              } as ListOption,
            ].concat(opts);
          }),
        );
      }

      if (item.typeId === AttrAttributeType.Id.BOOLEAN) {
        options$ = of(booleanOptions);
      }
      result.push({
        ...item,
        deep,
        description: getAttrDescriptionTranslation(item.description),
        name: getAttrsTranslation(item.name),
        options$,
        step: Math.pow(10, -item.precision),
        unitAbbr: item.unitId !== '0' ? getUnitAbbrTranslation(item.unitId) : '',
        unitName: item.unitId !== '0' ? getUnitNameTranslation(item.unitId) : '',
      });
      for (const subitem of this.toPlain(item.childs, deep + 1)) {
        result.push(subitem);
      }
    }
    return result;
  }
}
