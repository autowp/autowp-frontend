import {sprintf} from 'sprintf-js';
import {Component, Input, Output, EventEmitter} from '@angular/core';
import {BehaviorSubject, Observable, combineLatest} from 'rxjs';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {map, shareReplay} from 'rxjs/operators';
import {SpecService} from '@services/spec';
import {APIItem} from '@services/item';
import {LanguageService} from '@services/language';
import {VehicleTypesModalComponent} from '../../../components/vehicle-types-modal/vehicle-types-modal.component';
import {ItemType, Spec, VehicleType} from '@grpc/spec.pb';
import {InvalidParams} from '@utils/invalid-params.pipe';
import {AbstractControl, FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {getVehicleTypeTranslation} from '@utils/translations';
import {VehicleTypeService} from '@services/vehicle-type';
import {APIPictureItem} from '@services/picture-item';

function specsToPlain(options: Spec[], deep: number): ItemMetaFormAPISpec[] {
  const result: ItemMetaFormAPISpec[] = [];
  for (const item of options) {
    result.push({
      id: item.id,
      short_name: item.shortName,
      deep,
    });
    for (const subitem of specsToPlain(item.childs, deep + 1)) {
      result.push(subitem);
    }
  }
  return result;
}

interface ItemMetaFormAPISpec {
  id: number | 'inherited';
  short_name: string;
  deep?: number;
}

export interface ItemMetaFormResult {
  name: string;
  full_name: string;
  catname: string;
  begin: {
    month: number;
    year: number;
  };
  body: string;
  end: {
    month: number;
    today: number;
    year: number;
  };
  is_concept: boolean | 'inherited';
  is_group: boolean;
  model_years: {
    begin_year: number;
    begin_year_fraction: string;
    end_year: number;
    end_year_fraction: string;
  };
  produced: {
    count: number;
    exactly: boolean;
  };
  spec_id: number | 'inherited';
  vehicle_type_id: string[];
  point: {
    lat: number;
    lng: number;
  };
  items: number[];
  pictures: number[];
}

interface PicturesListItem {
  pictureItem: APIPictureItem;
  selected: boolean;
}

interface Form {
  name: FormControl<string>;
  full_name?: FormControl<string>;
  catname?: FormControl<string>;
  body?: FormControl<string>;
  spec_id?: FormControl<string | number>;
  model_years?: FormGroup<{
    begin_year: FormControl<number>;
    begin_year_fraction: FormControl<string>;
    end_year: FormControl<number>;
    end_year_fraction: FormControl<string>;
  }>;
  produced?: FormGroup<{
    count: FormControl<number>;
    exactly: FormControl<boolean>;
  }>;
  is_concept?: FormControl<boolean>;
  is_group?: FormControl<boolean>;
  vehicle_type_id?: FormControl<string[]>;
  begin?: FormGroup<{
    year: FormControl<number>;
    month: FormControl<number>;
  }>;
  end?: FormGroup<{
    year: FormControl<number>;
    month: FormControl<number>;
    today: FormControl<boolean>;
  }>;
  point?: FormControl<{
    lat: number;
    lng: number;
  }>;
  items?: FormArray<FormControl<string>>;
  pictures?: FormArray<FormControl<number>>;
}

@Component({
  selector: 'app-item-meta-form',
  templateUrl: './item-meta-form.component.html',
  styleUrls: ['./styles.scss'],
})
export class ItemMetaFormComponent {
  @Input() submitNotify: () => void;
  @Input() invalidParams: InvalidParams;
  @Output() submitted = new EventEmitter<ItemMetaFormResult>();

  @Input() set disableIsGroup(disableIsGroup: boolean) {
    this.disableIsGroup$.next(disableIsGroup);
  }
  public disableIsGroup$ = new BehaviorSubject<boolean>(null);

  @Input() set parent(parent: APIItem) {
    this.parent$.next(parent);
  }
  public parent$ = new BehaviorSubject<APIItem>(null);

  @Input() set item(item: APIItem) {
    this.item$.next(item);
  }
  public item$ = new BehaviorSubject<APIItem>(null);

  @Input() set vehicleTypeIDs(vehicleTypeIDs: string[]) {
    this.vehicleTypeIDs$.next(vehicleTypeIDs);
  }
  private vehicleTypeIDs$ = new BehaviorSubject<string[]>(null);

  @Input() set items(items: APIItem[]) {
    this.items$.next(items);
  }
  public items$ = new BehaviorSubject<APIItem[]>(null);

  @Input() set pictures(pictures: APIPictureItem[]) {
    this.pictures$.next(
      pictures
        ? pictures.map((p) => ({
            pictureItem: p,
            selected: false,
          }))
        : null
    );
  }
  public pictures$ = new BehaviorSubject<PicturesListItem[]>(null);

  public vehicleTypes$: Observable<VehicleType[]> = this.vehicleTypeService.getTypesPlain$().pipe(
    map((types) =>
      types.map((type) => {
        type.name = getVehicleTypeTranslation(type.name);
        return type;
      })
    ),
    shareReplay(1)
  );

  public todayOptions = [
    {
      value: null,
      name: '--',
    },
    {
      value: false,
      name: $localize`ended`,
    },
    {
      value: true,
      name: $localize`continue in pr.`,
    },
  ];

  public producedOptions = [
    {
      value: false,
      name: $localize`about`,
    },
    {
      value: true,
      name: $localize`exactly`,
    },
  ];

  public modelYearFractionOptions = [
    {
      value: null,
      name: '-',
    },
    {
      value: '¼',
      name: '¼',
    },
    {
      value: '½',
      name: '½',
    },
    {
      value: '¾',
      name: '¾',
    },
  ];

  private nameMaxlength = 100; // DbTable\Item::MAX_NAME
  private fullnameMaxlength = 255; // BrandModel::MAX_FULLNAME
  private bodyMaxlength = 20;
  private modelYearMax: number = new Date().getFullYear() + 10;
  private yearMax: number = new Date().getFullYear() + 10;

  public monthOptions: {
    value: number;
    name: string;
  }[] = [
    {
      value: null,
      name: '--',
    },
  ];

  public isConceptOptions$ = this.parent$.pipe(
    map((parent) => [
      {
        value: false,
        name: $localize`no`,
      },
      {
        value: true,
        name: $localize`yes`,
      },
      {
        value: 'inherited',
        name: parent
          ? parent.is_concept
            ? $localize`inherited (yes)`
            : $localize`inherited (no)`
          : $localize`inherited`,
      },
    ])
  );

  public specs$ = this.specService.getSpecs$().pipe(
    map((specs) =>
      (
        [
          {
            id: null,
            short_name: '--',
            deep: 0,
          },
          {
            id: 'inherited',
            short_name: 'inherited',
            deep: 0,
          },
        ] as ItemMetaFormAPISpec[]
      ).concat(specsToPlain(specs, 0))
    )
  );

  public form$: Observable<FormGroup<Form>> = combineLatest([
    this.item$,
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
          begin_year: new FormControl(item.begin_model_year, [Validators.min(1800), Validators.max(this.modelYearMax)]),
          begin_year_fraction: new FormControl(item.begin_model_year_fraction),
          end_year: new FormControl(item.end_model_year, [Validators.min(1800), Validators.max(this.modelYearMax)]),
          end_year_fraction: new FormControl(item.end_model_year_fraction),
        });
        elements.produced = new FormGroup({
          count: new FormControl(item.produced),
          exactly: new FormControl(item.produced_exactly),
        });
        elements.is_concept = new FormControl(item.is_concept);
        elements.is_group = new FormControl({value: item.is_group, disabled: item.childs_count > 0 || disableIsGroup});
      }
      if ([ItemType.ITEM_TYPE_VEHICLE, ItemType.ITEM_TYPE_TWINS].includes(item.item_type_id)) {
        elements.vehicle_type_id = new FormControl(vehicleTypeIDs);
      }
      if (item.item_type_id !== ItemType.ITEM_TYPE_COPYRIGHT) {
        elements.begin = new FormGroup({
          year: new FormControl(item.begin_year, [Validators.min(1800), Validators.max(this.yearMax)]),
          month: new FormControl(item.begin_month),
        });
        elements.end = new FormGroup({
          year: new FormControl(item.end_year, [Validators.min(1800), Validators.max(this.yearMax)]),
          month: new FormControl(item.end_month),
          today: new FormControl(item.today),
        });
      }
      if ([ItemType.ITEM_TYPE_FACTORY, ItemType.ITEM_TYPE_MUSEUM].includes(item.item_type_id)) {
        const lat = item.lat;
        const lng = item.lng;
        elements.point = new FormControl({value: {lat, lng}, disabled: false});
      }
      if (items) {
        elements.items = new FormArray<FormControl<string>>([], {validators: Validators.required});
      }
      if (pictures) {
        elements.pictures = new FormArray<FormControl<number>>([], {validators: Validators.required});
      }
      return new FormGroup<Form>(elements);
    })
  );

  constructor(
    private specService: SpecService,
    private vehicleTypeService: VehicleTypeService,
    private languageService: LanguageService,
    private modalService: NgbModal
  ) {
    const date = new Date(Date.UTC(2000, 1, 1, 0, 0, 0, 0));
    for (let i = 0; i < 12; i++) {
      date.setMonth(i);
      const language = this.languageService.language;
      if (language) {
        const month = date.toLocaleString(language, {month: 'long'});
        this.monthOptions.push({
          value: i + 1,
          name: sprintf('%02d - %s', i + 1, month),
        });
      }
    }
  }

  public doSubmit(form: FormGroup) {
    this.submitted.emit(form.value);
    return false;
  }

  public showVehicleTypesModal(vehicleTypeIDs: AbstractControl) {
    const modalRef = this.modalService.open(VehicleTypesModalComponent, {
      size: 'lg',
      centered: true,
    });

    modalRef.componentInstance.ids = vehicleTypeIDs.value;
    modalRef.componentInstance.changed.subscribe((value: string[]) => {
      vehicleTypeIDs.setValue(value);
    });
  }

  public vehicleTypeName$(typeID: string): Observable<string> {
    return this.vehicleTypes$.pipe(
      map((types) => {
        const type = types.find((t) => t.id.toString() === typeID);
        return type ? type.name : '#' + typeID;
      })
    );
  }

  onCheckboxChange(e: Event, ctrl: FormArray<FormControl<string>>) {
    const target = e.target as HTMLInputElement;
    if (target.checked) {
      ctrl.push(new FormControl<string>(target.value));
    } else {
      let i: number = 0;
      ctrl.controls.forEach((item) => {
        if (item.value == target.value) {
          ctrl.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  onPictureClick(e: PicturesListItem, ctrl: FormArray<FormControl<number>>) {
    e.selected = !e.selected;
    if (e.selected) {
      ctrl.push(new FormControl<number>(e.pictureItem.picture_id));
    } else {
      let i: number = 0;
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
