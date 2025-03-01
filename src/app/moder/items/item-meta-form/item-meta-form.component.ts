import type {InvalidParams} from '@utils/invalid-params.pipe';

import {AsyncPipe} from '@angular/common';
import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  APIItem,
  ItemType,
  Picture,
  PictureFields,
  PictureItem,
  PictureListOptions,
  PicturesRequest,
  Spec,
  VehicleType,
} from '@grpc/spec.pb';
import {PicturesClient} from '@grpc/spec.pbsc';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {LanguageService} from '@services/language';
import {SpecService} from '@services/spec';
import {VehicleTypeService} from '@services/vehicle-type';
import {InvalidParamsPipe} from '@utils/invalid-params.pipe';
import {getVehicleTypeTranslation} from '@utils/translations';
import {BehaviorSubject, combineLatest, EMPTY, Observable, of} from 'rxjs';
import {map, shareReplay, switchMap} from 'rxjs/operators';
import {sprintf} from 'sprintf-js';

import {VehicleTypesModalComponent} from '../../../components/vehicle-types-modal/vehicle-types-modal.component';
import {MapPointComponent} from './map-point/map-point.component';

type isConceptValue = 'inherited' | boolean | null;
type specValue = 'inherited' | null | number;

const isConceptInherited = 'inherited',
  specInherited = 'inherited';

export interface ItemMetaFormResult {
  begin: {
    month: number;
    year: number;
  };
  body: string;
  catname: string;
  end: {
    month: number;
    today: number;
    year: number;
  };
  full_name: string;
  is_concept: isConceptValue;
  is_group: boolean;
  items: number[];
  model_years: {
    begin_year: number;
    begin_year_fraction: string;
    end_year: number;
    end_year_fraction: string;
  };
  name: string;
  pictures: string[];
  point: {
    lat: number;
    lng: number;
  };
  produced: {
    count: number;
    exactly: boolean;
  };
  spec_id: specValue;
  vehicle_type_id: string[];
}

export interface ParentIsConcept {
  isConcept: boolean;
}

interface Form {
  begin?: FormGroup<{
    month: FormControl<null | number>;
    year: FormControl<null | number>;
  }>;
  body?: FormControl<null | string>;
  catname?: FormControl<null | string>;
  end?: FormGroup<{
    month: FormControl<null | number>;
    today: FormControl<boolean | null>;
    year: FormControl<null | number>;
  }>;
  full_name?: FormControl<null | string>;
  is_concept?: FormControl<isConceptValue>;
  is_group?: FormControl<boolean | null>;
  items?: FormArray<FormControl<string>>;
  model_years?: FormGroup<{
    begin_year: FormControl<null | number>;
    begin_year_fraction: FormControl<null | string>;
    end_year: FormControl<null | number>;
    end_year_fraction: FormControl<null | string>;
  }>;
  name: FormControl<null | string>;
  pictures?: FormArray<FormControl<string>>;
  point?: FormControl<null | {
    lat: number;
    lng: number;
  }>;
  produced?: FormGroup<{
    count: FormControl<null | number>;
    exactly: FormControl<boolean | null>;
  }>;
  spec_id?: FormControl<specValue>;
  vehicle_type_id?: FormControl<null | string[]>;
}

interface ItemMetaFormAPISpec {
  deep?: number;
  id: 'inherited' | number;
  short_name: string;
}

interface PicturesListItem {
  picture$: Observable<Picture>;
  pictureItem: PictureItem;
  selected: boolean;
}

function localizeInherited(parentIsConcept: null | ParentIsConcept) {
  if (!parentIsConcept) {
    return $localize`inherited`;
  }
  return parentIsConcept.isConcept ? $localize`inherited (yes)` : $localize`inherited (no)`;
}

function specsToPlain(options: Spec[], deep: number): ItemMetaFormAPISpec[] {
  const result: ItemMetaFormAPISpec[] = [];
  for (const item of options) {
    result.push({
      deep,
      id: item.id,
      short_name: item.shortName,
    });
    for (const subitem of specsToPlain(item.childs ? item.childs : [], deep + 1)) {
      result.push(subitem);
    }
  }
  return result;
}

@Component({
  imports: [FormsModule, ReactiveFormsModule, MapPointComponent, AsyncPipe, InvalidParamsPipe],
  selector: 'app-item-meta-form',
  styleUrls: ['./styles.scss'],
  templateUrl: './item-meta-form.component.html',
})
export class ItemMetaFormComponent {
  readonly #specService = inject(SpecService);
  readonly #vehicleTypeService = inject(VehicleTypeService);
  readonly #picturesClient = inject(PicturesClient);
  readonly #languageService = inject(LanguageService);
  readonly #modalService = inject(NgbModal);

  @Input() submitNotify: () => void = () => {};
  @Input() invalidParams?: InvalidParams;
  @Output() submitted = new EventEmitter<ItemMetaFormResult>();

  @Input() set disableIsGroup(disableIsGroup: boolean) {
    this.disableIsGroup$.next(disableIsGroup);
  }
  protected readonly disableIsGroup$ = new BehaviorSubject<boolean | null>(null);

  @Input() set parentIsConcept(isConcept: ParentIsConcept) {
    this.parentIsConcept$.next(isConcept);
  }
  protected readonly parentIsConcept$ = new BehaviorSubject<null | ParentIsConcept>(null);

  @Input() set item(item: APIItem) {
    this.item$.next(item);
  }
  protected readonly item$ = new BehaviorSubject<APIItem | null>(null);

  @Input() set vehicleTypeIDs(vehicleTypeIDs: string[]) {
    this.#vehicleTypeIDs$.next(vehicleTypeIDs);
  }
  readonly #vehicleTypeIDs$ = new BehaviorSubject<null | string[]>(null);

  @Input() set items(items: APIItem[]) {
    this.items$.next(items);
  }
  protected readonly items$ = new BehaviorSubject<APIItem[] | null>(null);

  @Input() set pictures(pictures: PictureItem[]) {
    this.pictures$.next(
      pictures
        ? pictures.map((p) => ({
            picture$: this.#picturesClient.getPicture(
              new PicturesRequest({
                fields: new PictureFields({nameText: true, thumbMedium: true}),
                language: this.#languageService.language,
                options: new PictureListOptions({id: p.pictureId}),
              }),
            ),
            pictureItem: p,
            selected: false,
          }))
        : null,
    );
  }
  protected readonly pictures$ = new BehaviorSubject<null | PicturesListItem[]>(null);

  readonly #vehicleTypes$: Observable<VehicleType[]> = this.#vehicleTypeService.getTypesPlain$().pipe(
    map((types) =>
      types.map((type) => {
        type.name = getVehicleTypeTranslation(type.name);
        return type;
      }),
    ),
    shareReplay({bufferSize: 1, refCount: false}),
  );

  protected readonly todayOptions = [
    {
      name: '--',
      value: null,
    },
    {
      name: $localize`ended`,
      value: false,
    },
    {
      name: $localize`continue in pr.`,
      value: true,
    },
  ];

  protected readonly producedOptions = [
    {
      name: $localize`about`,
      value: false,
    },
    {
      name: $localize`exactly`,
      value: true,
    },
  ];

  protected readonly modelYearFractionOptions = [
    {
      name: '-',
      value: '',
    },
    {
      name: '¼',
      value: '¼',
    },
    {
      name: '½',
      value: '½',
    },
    {
      name: '¾',
      value: '¾',
    },
  ];
  readonly #nameMaxlength = 100; // DbTable\Item::MAX_NAME
  readonly #fullnameMaxlength = 255; // BrandModel::MAX_FULLNAME
  readonly #bodyMaxlength = 20;
  readonly #modelYearMax: number = new Date().getFullYear() + 10;
  readonly #yearMax: number = new Date().getFullYear() + 10;

  protected readonly monthOptions: {
    name: string;
    value: null | number;
  }[] = [
    {
      name: '--',
      value: null,
    },
  ];

  protected readonly isConceptOptions$ = this.parentIsConcept$.pipe(
    map((parentIsConcept) => [
      {
        name: $localize`no`,
        value: false,
      },
      {
        name: $localize`yes`,
        value: true,
      },
      {
        name: localizeInherited(parentIsConcept),
        value: isConceptInherited,
      },
    ]),
  );

  protected readonly specs$ = this.#specService.specs$.pipe(
    map((specs) =>
      (
        [
          {
            deep: 0,
            id: null,
            short_name: '--',
          },
          {
            deep: 0,
            id: specInherited,
            short_name: 'inherited',
          },
        ] as ItemMetaFormAPISpec[]
      ).concat(specsToPlain(specs, 0)),
    ),
  );

  protected readonly form$: Observable<FormGroup<Form>> = combineLatest([
    this.item$.pipe(switchMap((item) => (item ? of(item) : EMPTY))),
    this.#vehicleTypeIDs$,
    this.disableIsGroup$,
    this.items$,
    this.pictures$,
  ]).pipe(
    // eslint-disable-next-line sonarjs/cognitive-complexity
    map(([item, vehicleTypeIDs, disableIsGroup, items, pictures]) => {
      const elements: Form = {
        name: new FormControl(item.name, [Validators.required, Validators.maxLength(this.#nameMaxlength)]),
      };
      if (item.itemTypeId === ItemType.ITEM_TYPE_BRAND) {
        elements.full_name = new FormControl(item.fullName, Validators.maxLength(this.#fullnameMaxlength));
      }
      if (item.itemTypeId === ItemType.ITEM_TYPE_BRAND || item.itemTypeId === ItemType.ITEM_TYPE_CATEGORY) {
        elements.catname = new FormControl(item.catname);
      }
      if (item.itemTypeId === ItemType.ITEM_TYPE_VEHICLE || item.itemTypeId === ItemType.ITEM_TYPE_ENGINE) {
        elements.body = new FormControl(item.body, Validators.maxLength(this.#bodyMaxlength));

        let spec: specValue = specInherited;
        if (!item.specInherit) {
          spec = item.specId ? item.specId : null;
        }
        elements.spec_id = new FormControl<null | specValue>(spec);
        elements.model_years = new FormGroup({
          begin_year: new FormControl(item.beginModelYear > 0 ? item.beginModelYear : null, [
            Validators.min(1700),
            Validators.max(this.#modelYearMax),
          ]),
          begin_year_fraction: new FormControl(item.beginModelYearFraction),
          end_year: new FormControl(item.endModelYear > 0 ? item.endModelYear : null, [
            Validators.min(1700),
            Validators.max(this.#modelYearMax),
          ]),
          end_year_fraction: new FormControl(item.endModelYearFraction),
        });
        elements.produced = new FormGroup({
          count: new FormControl(item.produced ? item.produced : null),
          exactly: new FormControl(item.producedExactly),
        });
        elements.is_concept = new FormControl<isConceptValue>(
          item.isConceptInherit ? isConceptInherited : item.isConcept,
        );
        elements.is_group = new FormControl({
          disabled: !!(item.childsCount > 0 || disableIsGroup),
          value: item.isGroup,
        });
      }
      if ([ItemType.ITEM_TYPE_TWINS, ItemType.ITEM_TYPE_VEHICLE].includes(item.itemTypeId)) {
        elements.vehicle_type_id = new FormControl(vehicleTypeIDs);
      }
      if (item.itemTypeId !== ItemType.ITEM_TYPE_COPYRIGHT) {
        elements.begin = new FormGroup({
          month: new FormControl(item.beginMonth > 0 ? item.beginMonth : null),
          year: new FormControl(item.beginYear > 0 ? item.beginYear : null, [
            Validators.min(1700),
            Validators.max(this.#yearMax),
          ]),
        });
        elements.end = new FormGroup({
          month: new FormControl(item.endMonth > 0 ? item.endMonth : null),
          today: new FormControl(item.today ? item.today.value : null),
          year: new FormControl(item.endYear > 0 ? item.endYear : null, [
            Validators.min(1700),
            Validators.max(this.#yearMax),
          ]),
        });
      }
      if ([ItemType.ITEM_TYPE_FACTORY, ItemType.ITEM_TYPE_MUSEUM].includes(item.itemTypeId)) {
        const lat = item.location?.latitude || 0;
        const lng = item.location?.longitude || 0;
        elements.point = new FormControl({disabled: false, value: {lat, lng}});
      }
      if (items) {
        elements.items = new FormArray<FormControl<string>>([], {validators: Validators.required});
      }
      if (pictures) {
        elements.pictures = new FormArray<FormControl<string>>([], {validators: Validators.required});
      }
      return new FormGroup<Form>(elements);
    }),
  );

  constructor() {
    const date = new Date(Date.UTC(2000, 1, 1, 0, 0, 0, 0));
    for (let i = 0; i < 12; i++) {
      date.setMonth(i);
      const language = this.#languageService.language;
      if (language) {
        const month = date.toLocaleString(language, {month: 'long'});
        this.monthOptions.push({
          name: sprintf('%02d - %s', i + 1, month),
          value: i + 1,
        });
      }
    }
  }

  protected doSubmit(form: FormGroup) {
    this.submitted.emit(form.value);
    return false;
  }

  protected showVehicleTypesModal(vehicleTypeIDs: AbstractControl) {
    const modalRef = this.#modalService.open(VehicleTypesModalComponent, {
      centered: true,
      size: 'lg',
    });

    modalRef.componentInstance.ids = vehicleTypeIDs.value;
    modalRef.componentInstance.changed.subscribe((value: string[]) => {
      vehicleTypeIDs.setValue(value);
    });
  }

  protected vehicleTypeName$(typeID: string): Observable<string> {
    return this.#vehicleTypes$.pipe(
      map((types) => {
        const type = types.find((t) => t.id.toString() === typeID);
        return type ? type.name : '#' + typeID;
      }),
    );
  }

  protected onCheckboxChange(e: Event, ctrl: FormArray<FormControl<string>>) {
    const target = e.target as HTMLInputElement;
    if (target.checked) {
      ctrl.push(new FormControl<string>(target.value, {nonNullable: true}));
    } else {
      let i = 0;
      ctrl.controls.forEach((item) => {
        if (item.value == target.value) {
          ctrl.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  protected onPictureClick(e: PicturesListItem, ctrl: FormArray<FormControl<string>>) {
    e.selected = !e.selected;
    if (e.selected) {
      ctrl.push(new FormControl<string>({disabled: false, value: e.pictureItem.pictureId}, {nonNullable: true}));
    } else {
      let i = 0;
      ctrl.controls.forEach((item) => {
        if (item.value == e.pictureItem.pictureId) {
          ctrl.removeAt(i);
          return;
        }
        i++;
      });
    }
  }
}
