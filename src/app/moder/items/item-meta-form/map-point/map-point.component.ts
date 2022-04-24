import {Component, NgZone} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {icon, LatLng, latLng, Layer, LeafletMouseEvent, Map, MapOptions, marker, tileLayer} from 'leaflet';

export interface Point {
  lat: number;
  lng: number;
}

const DEFAULT_LAT = 54.5260,
      DEFAULT_LNG = 15.2551;

const normalizeValue = (value: number|string|null|undefined): number|null => {
  if (value === null || typeof value === 'undefined' || typeof value === 'number' && isNaN(value)) {
    return null;
  }
  value = typeof value !== 'number' ? parseFloat(value) : value;
  return isNaN(value) ? null : value;
}

const center = (lat: number|string, lng: number|string): LatLng => {
  lat = normalizeValue(lat);
  lng = normalizeValue(lng);

  console.log('center', lat, lng);

  if (typeof lat != "number" || typeof lng != "number" || isNaN(lat) || isNaN(lng)) {
    return latLng(DEFAULT_LAT, DEFAULT_LNG);
  }

  return latLng(lat, lng);
}

@Component({
  selector: 'app-map-point',
  templateUrl: 'map-point.component.html',
  styleUrls: ['./styles.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: MapPointComponent
    }
  ]
})
export class MapPointComponent implements ControlValueAccessor {

  /*public center$ = this.point$.pipe(
    map(point => point ? point : latLng(54.5260, 15.2551))
  );*/

  /*public markers$: Observable<Layer[]> = this.point$.pipe(
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

  public markers: Layer[] = [];

  public lat: number = null;
  public lng: number = null;
  //public latLng: LatLng = latLng(54.5260, 15.2551);

  public center = center(this.lat, this.lng);

  public mapOptions: MapOptions = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18
      })
    ],
    zoom: 8,
    center: center(this.lat, this.lng),
    dragging: true
  };

  private onChange: (Point) => {};

  private onTouched = () => {};

  public disabled = false;

  private touched = false;

  constructor(private zone: NgZone) {
  }

  writeValue(point: Point): void {
    const lat = normalizeValue(point.lat);
    const lng = normalizeValue(point.lng);

    console.log('writeValue', lat, lng);

    this.lat = lat;
    this.lng = lng;

    let ll: LatLng = null;
    if (lat !== null && lng !== null) {
      ll = latLng(lat, lng);
      console.log('this.center', this.center)
      this.center = ll;
      this.mapOptions.center = ll;
    }

    this.setMarker(ll);
  }

  registerOnChange(onChange: any): void {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: any): void {
    this.onTouched = onTouched;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  public onMapReady(lmap: Map) {
    lmap.on('click', (event: LeafletMouseEvent) => {
      this.zone.run(() => {

        this.center = event.latlng;
        this.mapOptions.center = event.latlng;
        this.setMarker(event.latlng);

        this.lat = event.latlng.lat;
        this.lng = event.latlng.lng;

        this.markAsTouched();
        this.onChange({lat: event.latlng.lat, lng: event.latlng.lng});

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
        console.log('form.value', form.value);
        // this.markerInput$.next(event.latlng);*/
      });
    });
  }

  public coordsChanged(event: Event) {
    console.log('coordsChanged', event);

    const lat = normalizeValue(this.lat);
    const lng = normalizeValue(this.lng);

    let ll = null;
    if (lat !== null && lng !== null) {
      ll = latLng(lat, lng);
      this.center = ll;
      this.mapOptions.center = ll;
    }

    this.setMarker(ll);

    this.markAsTouched();
    this.onChange({lat, lng});

    /*const lat = parseFloat(point.get('lat').value);
    const lng = parseFloat(point.get('lng').value);
    console.log('coordsChanged', lat, lng);
    this.markerInput$.next(
      (isNaN(lat) || isNaN(lng)) ? null : latLng([lat, lng])
    );*/
  }

  markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }

  public setMarker(ll: LatLng) {
    this.markers = ll ? [marker(ll, {
      icon: icon({
        iconSize: [25, 41],
        iconAnchor: [13, 41],
        iconUrl: 'assets/marker-icon.png',
        shadowUrl: 'assets/marker-shadow.png'
      })
    })] : [];
  }
}
