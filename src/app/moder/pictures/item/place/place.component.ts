import {Component, inject, NgZone, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {LatLng as grpcLatLng} from '@grpc/google/type/latlng.pb';
import {SetPicturePointRequest} from '@grpc/spec.pb';
import {PicturesClient} from '@grpc/spec.pbsc';
import {PageEnvService} from '@services/page-env.service';
import {APIPicture, PictureService} from '@services/picture';
import {icon, LatLng, latLng, LeafletMouseEvent, Map, Marker, marker, TileLayer, tileLayer} from 'leaflet';
import {EMPTY} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, map, shareReplay, startWith, switchMap} from 'rxjs/operators';

import {ToastsService} from '../../../../toasts/toasts.service';

interface MapOptions {
  center: LatLng;
  leafletOptions: {center: LatLng; layers: TileLayer[]; zoom: number};
  markers: Marker[];
}

function normalizeLat(lat: number) {
  return Math.max(lat, Math.min(lat, 90), -90);
}

function normalizeLng(lng: number) {
  lng = ((lng - 180) % 360) + 180;
  return ((lng + 180) % 360) - 180;
}

function createMarker(lat: number, lng: number): Marker {
  return marker([lat, lng], {
    icon: icon({
      iconAnchor: [13, 41],
      iconSize: [25, 41],
      iconUrl: 'assets/marker-icon.png',
      shadowUrl: 'assets/marker-shadow.png',
    }),
  });
}

interface PointForm {
  lat: FormControl<null | string>;
  lng: FormControl<null | string>;
}

@Component({
  selector: 'app-moder-pictures-place',
  templateUrl: './place.component.html',
})
export class ModerPicturesItemPlaceComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly pictureService = inject(PictureService);
  private readonly pageEnv = inject(PageEnvService);
  private readonly zone = inject(NgZone);
  private readonly picturesClient = inject(PicturesClient);
  private readonly toastService = inject(ToastsService);

  private readonly form = new FormGroup<PointForm>({
    lat: new FormControl<string>(''),
    lng: new FormControl<string>(''),
  });

  protected readonly picture$ = this.route.paramMap.pipe(
    map((params) => parseInt(params.get('id') || '', 10)),
    distinctUntilChanged(),
    debounceTime(10),
    switchMap((id) => this.pictureService.getPicture$(id, {fields: 'point'})),
    catchError(() => {
      this.router.navigate(['/error-404'], {
        skipLocationChange: true,
      });
      return EMPTY;
    }),
    shareReplay(1),
  );

  protected readonly form$ = this.picture$.pipe(
    map((picture) => {
      let lat = null,
        lng = null;
      if (picture && picture.point && picture.point.lat && picture.point.lng) {
        lat = picture.point.lat + '';
        lng = picture.point.lng + '';
      }

      this.form.setValue({lat, lng});

      return this.form;
    }),
    shareReplay(1),
  );

  protected readonly map$ = this.form$.pipe(
    switchMap((form) => form.valueChanges.pipe(startWith(form.value))),
    map((formValues) => {
      let center = latLng(55.7423627, 37.6786422);

      const leafletOptions = {
        center: center,
        layers: [
          tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 18,
          }),
        ],
        zoom: 8,
      };

      let lat = formValues.lat ? parseFloat(formValues.lat) : NaN;
      let lng = formValues.lng ? parseFloat(formValues.lng) : NaN;

      const markers: Marker[] = [];

      let ll = null;
      if (!isNaN(lat) && !isNaN(lng)) {
        lat = normalizeLat(lat);
        lng = normalizeLng(lng);
        ll = latLng([lat, lng]);
      }
      if (ll) {
        markers.push(createMarker(ll.lat, ll.lng));
        center = ll;
        leafletOptions.center = ll;
      }

      return {center, leafletOptions, markers};
    }),
  );

  ngOnInit(): void {
    setTimeout(
      () =>
        this.pageEnv.set({
          layout: {isAdminPage: true},
          pageId: 72,
        }),
      0,
    );
  }

  protected onMapReady(mapOptions: MapOptions, lmap: Map, form: FormGroup<PointForm>) {
    lmap.on('click', (event: LeafletMouseEvent) => {
      this.zone.run(() => {
        const ll: LatLng = event.latlng;
        const lat = normalizeLat(ll.lat);
        const lng = normalizeLng(ll.lng);
        mapOptions.markers = [createMarker(lat, lng)];
        form.setValue({
          lat: lat + '',
          lng: lng + '',
        });
      });
    });
  }

  protected doSubmit(form: FormGroup<PointForm>, picture: APIPicture) {
    this.picturesClient
      .setPicturePoint(
        new SetPicturePointRequest({
          pictureId: '' + picture.id,
          point: new grpcLatLng({
            latitude: form.controls.lat.value ? parseFloat(form.controls.lat.value) : 0,
            longitude: form.controls.lng.value ? parseFloat(form.controls.lng.value) : 0,
          }),
        }),
      )
      .pipe(
        catchError((response: unknown) => {
          this.toastService.handleError(response);
          return EMPTY;
        }),
      )
      .subscribe(() => {
        this.router.navigate(['/moder/pictures', picture.id]);
      });
  }
}
