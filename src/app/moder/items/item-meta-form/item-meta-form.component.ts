import { sprintf } from 'sprintf-js';
import {
  Component,
  Injectable,
  Input,
  OnChanges,
  SimpleChanges,
  OnInit,
  Output,
  EventEmitter,
  NgZone,
  OnDestroy
} from '@angular/core';
import { Subscription, BehaviorSubject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  tileLayer,
  latLng,
  Map,
  marker,
  LatLng,
  icon,
  Marker,
  LeafletMouseEvent
} from 'leaflet';
import { finalize, switchMap } from 'rxjs/operators';
import { APIVehicleType, VehicleTypeService } from '../../../services/vehicle-type';
import { APISpec, SpecService } from '../../../services/spec';
import { APIItem } from '../../../services/item';
import { LanguageService } from '../../../services/language';
import { VehicleTypesModalComponent } from '../../../components/vehicle-types-modal/vehicle-types-modal.component';
import {ToastsService} from '../../../toasts/toasts.service';

function specsToPlain(
  options: ItemMetaFormAPISpec[],
  deep: number
): ItemMetaFormAPISpec[] {
  const result: ItemMetaFormAPISpec[] = [];
  for (const item of options) {
    item.deep = deep;
    result.push(item);
    for (const subitem of specsToPlain(item.childs, deep + 1)) {
      result.push(subitem);
    }
  }
  return result;
}

interface ItemMetaFormAPISpec extends APISpec {
  deep?: number;
}

function createMarker(lat, lng): Marker {
  return marker([lat, lng], {
    icon: icon({
      iconSize: [25, 41],
      iconAnchor: [13, 41],
      iconUrl: 'assets/marker-icon.png',
      shadowUrl: 'assets/marker-shadow.png'
    })
  });
}

@Component({
  selector: 'app-item-meta-form',
  templateUrl: './item-meta-form.component.html',
  styleUrls: ['./styles.scss']
})
@Injectable()
export class ItemMetaFormComponent implements OnChanges, OnInit, OnDestroy {

  @Input() item: APIItem;
  @Input() submitNotify: () => void;
  @Input() parent: APIItem;
  @Input() invalidParams: any;
  @Input() hideSubmit: boolean;
  @Input() disableIsGroup: boolean;
  @Input() vehicleTypeIDs: number[] = [];
  @Output() submited = new EventEmitter<void>();

  public vehicleTypes: APIVehicleType[];
  private vehicleTypeIDs$ = new BehaviorSubject<number[]>([]);

  public loading = 0;
  public todayOptions = [
    {
      value: null,
      name: '--'
    },
    {
      value: false,
      name: 'moder/vehicle/today/ended'
    },
    {
      value: true,
      name: 'moder/vehicle/today/continue'
    }
  ];

  public producedOptions = [
    {
      value: false,
      name: 'moder/item/produced/about'
    },
    {
      value: true,
      name: 'moder/item/produced/exactly'
    }
  ];

  public modelYearFractionOptions = [
    {
      value: null,
      name: '-'
    },
    {
      value: '¼',
      name: '¼'
    },
    {
      value: '½',
      name: '½'
    },
    {
      value: '¾',
      name: '¾'
    }
  ];

  public markers: Marker[] = [];

  public center = latLng(55.7423627, 37.6786422);

  public leafletOptions = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18
      })
    ],
    zoom: 8,
    center: this.center
  };

  public nameMaxlength = 100; // DbTable\Item::MAX_NAME
  public fullnameMaxlength = 255; // BrandModel::MAX_FULLNAME
  public bodyMaxlength = 20;
  public modelYearMax: number;
  public yearMax: number;
  public specOptions: any[] = [];
  public monthOptions: any[];
  private isConceptOptions = [
    {
      value: false,
      name: 'moder/vehicle/is-concept/no'
    },
    {
      value: true,
      name: 'moder/vehicle/is-concept/yes'
    },
    {
      value: 'inherited',
      name: 'moder/vehicle/is-concept/inherited'
    }
  ];
  public defaultSpecOptions = [
    {
      id: null,
      short_name: '--',
      deep: 0
    },
    {
      id: 'inherited',
      short_name: 'inherited',
      deep: 0
    }
  ];
  private specsSub: Subscription;

  constructor(
    private specService: SpecService,
    private vehicleTypeService: VehicleTypeService,
    private languageService: LanguageService,
    private modalService: NgbModal,
    private zone: NgZone,
    private toastService: ToastsService
  ) {
    if (this.item && this.item.lat && this.item.lng) {
      this.markers = [createMarker(this.item.lat, this.item.lng)];
    }

    this.modelYearMax = new Date().getFullYear() + 10;
    this.yearMax = new Date().getFullYear() + 10;

    this.monthOptions = [
      {
        value: null,
        name: '--'
      }
    ];

    const date = new Date(Date.UTC(2000, 1, 1, 0, 0, 0, 0));
    for (let i = 0; i < 12; i++) {
      date.setMonth(i);
      const language = this.languageService.language;
      if (language) {
        const month = date.toLocaleString(language, { month: 'long' });
        this.monthOptions.push({
          value: i + 1,
          name: sprintf('%02d - %s', i + 1, month)
        });
      }
    }
  }

  ngOnInit(): void {
    this.loading++;
    this.specsSub = this.specService.getSpecs().pipe(
      finalize(() => (this.loading--)),
    ).subscribe(
      types => this.specOptions = specsToPlain(types, 0),
      response => this.toastService.response(response)
    );

    this.vehicleTypeIDs$.pipe(
      switchMap(ids => this.vehicleTypeService.getTypesById(ids))
    ).subscribe(types => {
      this.vehicleTypes = types;
    });
  }

  ngOnDestroy(): void {
    this.specsSub.unsubscribe();
    this.vehicleTypeIDs$.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.vehicleTypeIDs) {
      this.vehicleTypeIDs$.next(this.vehicleTypeIDs);
    }
    if (changes.item) {
      this.coordsChanged();
    }
  }

  public coordsChanged() {
    const lat = this.item ? this.item.lat : NaN;
    const lng = this.item ? this.item.lng : NaN;

    const ll = (isNaN(lat) || isNaN(lng)) ? null : latLng([lat, lng]);
    if (ll) {
      if (this.markers.length) {
        this.markers[0].setLatLng(ll);
      } else {
        this.markers = [createMarker(ll.lat, ll.lng)];
      }
      this.center = ll;
      this.leafletOptions.center = ll;
    } else {
      this.markers = [];
    }
  }

  public doSubmit(event) {
    event.preventDefault();
    event.stopPropagation();
    this.submited.emit();
    return false;
  }

  public getIsConceptOptions(parent: APIItem) {
    this.isConceptOptions[2].name = parent
      ? parent.is_concept
        ? 'moder/vehicle/is-concept/inherited-yes'
        : 'moder/vehicle/is-concept/inherited-no'
      : 'moder/vehicle/is-concept/inherited';

    return this.isConceptOptions;
  }

  public getSpecOptions(specOptions: any[]): any[] {
    return this.defaultSpecOptions.concat(specOptions);
  }

  public showVehicleTypesModal() {
    const modalRef = this.modalService.open(VehicleTypesModalComponent, {
      size: 'lg',
      centered: true
    });

    modalRef.componentInstance.ids = this.vehicleTypeIDs;
    modalRef.componentInstance.changed.subscribe(() => {
      this.vehicleTypeIDs$.next(this.vehicleTypeIDs);
    });
  }

  public onMapReady(lmap: Map) {
    lmap.on('click', (event: LeafletMouseEvent) => {
      this.zone.run(() => {
        const ll: LatLng = event.latlng;
        this.markers = [createMarker(ll.lat, ll.lng)];
        this.item.lat = ll.lat;
        this.item.lng = ll.lng;
      });
    });
  }
}
