import {Component, NgZone, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {APIService} from '@services/api.service';
import {PageEnvService} from '@services/page-env.service';
import {APIPicture, PictureService} from '@services/picture';
import {LatLng, LeafletMouseEvent, Map, Marker, TileLayer, icon, latLng, marker, tileLayer} from 'leaflet';
import {EMPTY} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, map, shareReplay, switchMap} from 'rxjs/operators';

interface MapOptions {
  center: LatLng;
  leafletOptions: {center: LatLng; layers: TileLayer[]; zoom: number};
  markers: Marker[];
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

@Component({
  selector: 'app-moder-pictures-place',
  templateUrl: './place.component.html',
})
export class ModerPicturesItemPlaceComponent implements OnInit {
  protected lat: number;
  protected lng: number;

  protected readonly picture$ = this.route.paramMap.pipe(
    map((params) => parseInt(params.get('id'), 10)),
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

  protected readonly map$ = this.picture$.pipe(
    map((picture) => {
      const center = latLng(55.7423627, 37.6786422);

      const leafletOptions = {
        center: center,
        layers: [
          tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 18,
          }),
        ],
        zoom: 8,
      };

      const markers: Marker[] = [];

      if (picture && picture.point) {
        this.lat = picture.point.lat;
        this.lng = picture.point.lng;
        if (picture.point.lat && picture.point.lng) {
          markers.push(createMarker(picture.point.lat, picture.point.lng));
          leafletOptions.center = latLng(picture.point.lat, picture.point.lng);
        }
      }

      return {center, leafletOptions, markers};
    }),
  );

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly pictureService: PictureService,
    private readonly pageEnv: PageEnvService,
    private readonly zone: NgZone,
    private readonly api: APIService,
  ) {}

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

  protected coordsChanged(mapOptions: MapOptions) {
    const lat = this.lat;
    const lng = this.lng;

    const ll = isNaN(lat) || isNaN(lng) ? null : latLng([lat, lng]);
    if (ll) {
      if (mapOptions.markers.length) {
        mapOptions.markers[0].setLatLng(ll);
      } else {
        mapOptions.markers = [createMarker(ll.lat, ll.lng)];
      }
      mapOptions.center = ll;
      mapOptions.leafletOptions.center = ll;
    } else {
      mapOptions.markers = [];
    }
  }

  protected onMapReady(mapOptions: MapOptions, lmap: Map) {
    lmap.on('click', (event: LeafletMouseEvent) => {
      this.zone.run(() => {
        const ll: LatLng = event.latlng;
        mapOptions.markers = [createMarker(ll.lat, ll.lng)];
        this.lat = ll.lat;
        this.lng = ll.lng;
      });
    });
  }

  protected doSubmit(picture: APIPicture) {
    this.api
      .request<void>('PUT', 'picture/' + picture.id, {
        body: {
          point: {
            lat: this.lat,
            lng: this.lng,
          },
        },
      })
      .subscribe(() => {
        this.router.navigate(['/moder/pictures', picture.id]);
      });
  }
}
