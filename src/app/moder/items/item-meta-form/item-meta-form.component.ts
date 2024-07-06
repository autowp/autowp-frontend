import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AbstractControl, FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {ItemType, Spec, VehicleType} from '@grpc/spec.pb';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {APIItem} from '@services/item';
import {LanguageService} from '@services/language';
import {APIPictureItem} from '@services/picture-item';
import {SpecService} from '@services/spec';
import {VehicleTypeService} from '@services/vehicle-type';
import {InvalidParams} from '@utils/invalid-params.pipe';
import {getVehicleTypeTranslation} from '@utils/translations';
import {BehaviorSubject, EMPTY, Observable, combineLatest, of} from 'rxjs';
import {map, shareReplay, switchMap} from 'rxjs/operators';
import {sprintf} from 'sprintf-js';

import {VehicleTypesModalComponent} from '../../../components/vehicle-types-modal/vehicle-types-modal.component';

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

interface ItemMetaFormAPISpec {
  deep?: number;
  id: 'inherited' | number;
  short_name: string;
}

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
  is_concept: 'inherited' | boolean;
  is_group: boolean;
  items: number[];
  model_years: {
    begin_year: number;
    begin_year_fraction: string;
    end_year: number;
    end_year_fraction: string;
  };
  name: string;
  pictures: number[];
  point: {
    lat: number;
    lng: number;
  };
  produced: {
    count: number;
    exactly: boolean;
  };
  spec_id: 'inherited' | number;
  vehicle_type_id: string[];
}

interface PicturesListItem {
  pictureItem: APIPictureItem;
  selected: boolean;
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
  is_concept?: FormControl<'inherited' | boolean | null>;
  is_group?: FormControl<boolean | null>;
  items?: FormArray<FormControl<string>>;
  model_years?: FormGroup<{
    begin_year: FormControl<null | number>;
    begin_year_fraction: FormControl<null | string>;
    end_year: FormControl<null | number>;
    end_year_fraction: FormControl<null | string>;
  }>;
  name: FormControl<null | string>;
  pictures?: FormArray<FormControl<number>>;
  point?: FormControl<{
    lat: number;
    lng: number;
  } | null>;
  produced?: FormGroup<{
    count: FormControl<null | number>;
    exactly: FormControl<boolean | null>;
  }>;
  spec_id?: FormControl<null | number | string>;
  vehicle_type_id?: FormControl<null | string[]>;
}

export interface ParentIsConcept {
  isConcept: boolean;
}

@Component({
  selector: 'app-item-meta-form',
  styleUrls: ['./styles.scss'],
  templateUrl: './item-meta-form.component.html',
})
export class ItemMetaFormComponent {
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
  protected readonly parentIsConcept$ = new BehaviorSubject<ParentIsConcept | null>(null);

  @Input() set item(item: APIItem) {
    this.item$.next(item);
  }
  protected readonly item$ = new BehaviorSubject<APIItem | null>(null);

  @Input() set vehicleTypeIDs(vehicleTypeIDs: string[]) {
    this.vehicleTypeIDs$.next(vehicleTypeIDs);
  }
  private readonly vehicleTypeIDs$ = new BehaviorSubject<null | string[]>(null);

  @Input() set items(items: APIItem[]) {
    this.items$.next(items);
  }
  protected readonly items$ = new BehaviorSubject<APIItem[] | null>(null);

  @Input() set pictures(pictures: APIPictureItem[]) {
    this.pictures$.next(
      pictures
        ? pictures.map((p) => ({
            pictureItem: p,
            selected: false,
          }))
        : null,
    );
  }
  protected readonly pictures$ = new BehaviorSubject<PicturesListItem[] | null>(null);

  private readonly vehicleTypes$: Observable<VehicleType[]> = this.vehicleTypeService.getTypesPlain$().pipe(
    map((types) =>
      types.map((type) => {
        type.name = getVehicleTypeTranslation(type.name);
        return type;
      }),
    ),
    shareReplay(1),
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
      value: null,
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

  private readonly nameMaxlength = 100; // DbTable\Item::MAX_NAME
  private readonly fullnameMaxlength = 255; // BrandModel::MAX_FULLNAME
  private readonly bodyMaxlength = 20;
  private readonly modelYearMax: number = new Date().getFullYear() + 10;
  private readonly yearMax: number = new Date().getFullYear() + 10;

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
        name: parentIsConcept
          ? parentIsConcept.isConcept
            ? $localize`inherited (yes)`
            : $localize`inherited (no)`
          : $localize`inherited`,
        value: 'inherited',
      },
    ]),
  );

  protected readonly specs$ = this.specService.getSpecs$().pipe(
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
            id: 'inherited',
            short_name: 'inherited',
          },
        ] as ItemMetaFormAPISpec[]
      ).concat(specsToPlain(specs, 0)),
    ),
  );

  protected readonly form$: Observable<FormGroup<Form>> = combineLatest([
    this.item$.pipe(switchMap((item) => (item ? of(item) : EMPTY))),
    this.vehicleTypeIDs$,
    this.disableIsGroup$,
    this.items$,
    this.pictures$,
  ]).pipe(
    map(([item, vehicleTypeIDs, disableIsGroup, items, pictures]) => {
      const elements: Form = {
        name: new FormControl(item.name, [Validators.required, Validators.maxLength(this.nameMaxlength)]),
      };
      if (item.item_type_id === ItemType.ITEM_TYPE_BRAND) {
        elements.full_name = new FormControl(item.full_name, Validators.maxLength(this.fullnameMaxlength));
      }
      if (item.item_type_id === ItemType.ITEM_TYPE_BRAND || item.item_type_id === ItemType.ITEM_TYPE_CATEGORY) {
        elements.catname = new FormControl(item.catname);
      }
      if (item.item_type_id === ItemType.ITEM_TYPE_VEHICLE || item.item_type_id === ItemType.ITEM_TYPE_ENGINE) {
        elements.body = new FormControl(item.body, Validators.maxLength(this.bodyMaxlength));
        elements.spec_id = new FormControl(item.spec_id);
        elements.model_years = new FormGroup({
          begin_year: new FormControl(item.begin_model_year > 0 ? item.begin_model_year : null, [
            Validators.min(1800),
            Validators.max(this.modelYearMax),
          ]),
          begin_year_fraction: new FormControl(item.begin_model_year_fraction),
          end_year: new FormControl(item.end_model_year > 0 ? item.end_model_year : null, [
            Validators.min(1800),
            Validators.max(this.modelYearMax),
          ]),
          end_year_fraction: new FormControl(item.end_model_year_fraction),
        });
        elements.produced = new FormGroup({
          count: new FormControl(item.produced),
          exactly: new FormControl(item.produced_exactly),
        });
        elements.is_concept = new FormControl(item.is_concept);
        elements.is_group = new FormControl({
          disabled: !!(item.childs_count > 0 || disableIsGroup),
          value: item.is_group,
        });
      }
      if ([ItemType.ITEM_TYPE_TWINS, ItemType.ITEM_TYPE_VEHICLE].includes(item.item_type_id)) {
        elements.vehicle_type_id = new FormControl(vehicleTypeIDs);
      }
      if (item.item_type_id !== ItemType.ITEM_TYPE_COPYRIGHT) {
        elements.begin = new FormGroup({
          month: new FormControl(item.begin_month > 0 ? item.begin_month : null),
          year: new FormControl(item.begin_year > 0 ? item.begin_year : null, [
            Validators.min(1800),
            Validators.max(this.yearMax),
          ]),
        });
        elements.end = new FormGroup({
          month: new FormControl(item.end_month > 0 ? item.end_month : null),
          today: new FormControl(item.today),
          year: new FormControl(item.end_year > 0 ? item.end_year : null, [
            Validators.min(1800),
            Validators.max(this.yearMax),
          ]),
        });
      }
      if ([ItemType.ITEM_TYPE_FACTORY, ItemType.ITEM_TYPE_MUSEUM].includes(item.item_type_id)) {
        const lat = item.lat;
        const lng = item.lng;
        elements.point = new FormControl({disabled: false, value: {lat, lng}});
      }
      if (items) {
        elements.items = new FormArray<FormControl<string>>([], {validators: Validators.required});
      }
      if (pictures) {
        elements.pictures = new FormArray<FormControl<number>>([], {validators: Validators.required});
      }
      return new FormGroup<Form>(elements);
    }),
  );

  constructor(
    private readonly specService: SpecService,
    private readonly vehicleTypeService: VehicleTypeService,
    private readonly languageService: LanguageService,
    private readonly modalService: NgbModal,
  ) {
    const date = new Date(Date.UTC(2000, 1, 1, 0, 0, 0, 0));
    for (let i = 0; i < 12; i++) {
      date.setMonth(i);
      const language = this.languageService.language;
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
    const modalRef = this.modalService.open(VehicleTypesModalComponent, {
      centered: true,
      size: 'lg',
    });

    modalRef.componentInstance.ids = vehicleTypeIDs.value;
    modalRef.componentInstance.changed.subscribe((value: string[]) => {
      vehicleTypeIDs.setValue(value);
    });
  }

  protected vehicleTypeName$(typeID: string): Observable<string> {
    return this.vehicleTypes$.pipe(
      map((types) => {
        const type = types.find((t) => t.id.toString() === typeID);
        return type ? type.name : '#' + typeID;
      }),
    );
  }

  protected onCheckboxChange(e: Event, ctrl: FormArray<FormControl<null | string>>) {
    const target = e.target as HTMLInputElement;
    if (target.checked) {
      ctrl.push(new FormControl<string>(target.value));
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

  protected onPictureClick(e: PicturesListItem, ctrl: FormArray<FormControl<null | number>>) {
    e.selected = !e.selected;
    if (e.selected) {
      ctrl.push(new FormControl<number>(e.pictureItem.picture_id));
    } else {
      let i = 0;
      ctrl.controls.forEach((item) => {
        if (item.value == e.pictureItem.picture_id) {
          ctrl.removeAt(i);
          return;
        }
        i++;
      });
    }
  }
}
