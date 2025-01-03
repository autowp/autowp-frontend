import {Component, inject, NgZone} from '@angular/core';
import {ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR} from '@angular/forms';
import {LeafletModule} from '@bluehalo/ngx-leaflet';
import {icon, LatLng, latLng, Layer, LeafletMouseEvent, Map, MapOptions, marker, tileLayer} from 'leaflet';

export interface Point {
  lat: number;
  lng: number;
}

const DEFAULT_LAT = 54.526,
  DEFAULT_LNG = 15.2551;

const normalizeValue = (value: null | number | string | undefined): null | number => {
  if (value === null || typeof value === 'undefined' || (typeof value === 'number' && isNaN(value))) {
    return null;
  }
  value = typeof value !== 'number' ? parseFloat(value) : value;
  return isNaN(value) ? null : value;
};

const center = (lat: null | number | string, lng: null | number | string): LatLng => {
  const normalizedLat = normalizeValue(lat);
  const normalizedLng = normalizeValue(lng);

  if (
    typeof normalizedLat != 'number' ||
    typeof normalizedLng != 'number' ||
    isNaN(normalizedLat) ||
    isNaN(normalizedLng)
  ) {
    return latLng(DEFAULT_LAT, DEFAULT_LNG);
  }

  return latLng(normalizedLat, normalizedLng);
};

@Component({
  imports: [FormsModule, LeafletModule],
  providers: [
    {
      multi: true,
      provide: NG_VALUE_ACCESSOR,
      useExisting: MapPointComponent,
    },
  ],
  selector: 'app-map-point',
  styleUrls: ['./styles.scss'],
  templateUrl: 'map-point.component.html',
})
export class MapPointComponent implements ControlValueAccessor {
  private readonly zone = inject(NgZone);

  /*protected readonly center$ = this.point$.pipe(
    map(point => point ? point : latLng(54.5260, 15.2551))
  );*/

  /*protected readonly markers$: Observable<Layer[]> = this.point$.pipe(
    map(ll => ll ? [
      marker(ll, {
        icon: icon({
          iconSize: [25, 41],
          iconAnchor: [13, 41],
          iconUrl: 'assets/marker-icon.png',
          shadowUrl: 'assets/marker-shadow.png'
        })
      })
    ] : []),
  );*/

  protected markers: Layer[] = [];

  protected lat: null | number = null;
  protected lng: null | number = null;
  //protected  latLng: LatLng = latLng(54.5260, 15.2551);

  protected center = center(this.lat, this.lng);

  protected readonly mapOptions: MapOptions = {
    center: center(this.lat, this.lng),
    dragging: true,
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
      }),
    ],
    zoom: 8,
  };

  private onChange?: (_: Point) => void;

  private onTouched?: () => void;

  protected disabled = false;

  private touched = false;

  writeValue(point: Point): void {
    const lat = normalizeValue(point.lat);
    const lng = normalizeValue(point.lng);

    this.lat = lat;
    this.lng = lng;

    let ll: LatLng | null = null;
    if (lat !== null && lng !== null) {
      ll = latLng(lat, lng);
      this.center = ll;
      this.mapOptions.center = ll;
    }

    this.setMarker(ll);
  }

  registerOnChange(onChange: (_: Point) => void): void {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: () => void): void {
    this.onTouched = onTouched;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  protected onMapReady(lmap: Map) {
    lmap.on('click', (event: LeafletMouseEvent) => {
      this.zone.run(() => {
        this.center = event.latlng;
        this.mapOptions.center = event.latlng;
        this.setMarker(event.latlng);

        this.lat = event.latlng.lat;
        this.lng = event.latlng.lng;

        this.markAsTouched();
        if (this.onChange) {
          this.onChange({lat: event.latlng.lat, lng: event.latlng.lng});
        }

        /*form.patchValue({
          point: {
            lat: event.latlng.lat,
            lng: event.latlng.lng,
          }
        }, {
          onlySelf: true,
          emitEvent: true
        });
        form.updateValueAndValidity();
        // this.markerInput$.next(event.latlng);*/
      });
    });
  }

  protected coordsChanged() {
    const lat = normalizeValue(this.lat);
    const lng = normalizeValue(this.lng);

    let ll: LatLng | null = null;
    if (lat !== null && lng !== null) {
      ll = latLng(lat, lng);
      this.center = ll;
      this.mapOptions.center = ll;
    }

    this.setMarker(ll);

    this.markAsTouched();
    if (lat && lng) {
      if (this.onChange) {
        this.onChange({lat, lng});
      }
    }

    /*const lat = parseFloat(point.get('lat').value);
    const lng = parseFloat(point.get('lng').value);
    this.markerInput$.next(
      (isNaN(lat) || isNaN(lng)) ? null : latLng([lat, lng])
    );*/
  }

  markAsTouched() {
    if (!this.touched) {
      if (this.onTouched) {
        this.onTouched();
      }
      this.touched = true;
    }
  }

  protected setMarker(ll: LatLng | null) {
    this.markers = ll
      ? [
          marker(ll, {
            icon: icon({
              iconAnchor: [13, 41],
              iconSize: [25, 41],
              iconUrl: 'assets/marker-icon.png',
              shadowUrl: 'assets/marker-shadow.png',
            }),
          }),
        ]
      : [];
  }
}
