import {Component, NgZone, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {EMPTY} from 'rxjs';
import {APIPicture, PictureService} from '../../../../services/picture';
import {PageEnvService} from '../../../../services/page-env.service';
import {catchError, debounceTime, distinctUntilChanged, map, shareReplay, switchMap} from 'rxjs/operators';
import {icon, LatLng, latLng, LeafletMouseEvent, Map, marker, Marker, TileLayer, tileLayer} from 'leaflet';
import {APIService} from '../../../../services/api.service';

interface MapOptions {
  leafletOptions: {center: LatLng, layers: TileLayer[], zoom: number},
  center: LatLng,
  markers: Marker[]
}

function createMarker(lat: number, lng: number): Marker {
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
  selector: 'app-moder-pictures-place',
  templateUrl: './place.component.html'
})
export class ModerPicturesItemPlaceComponent implements OnInit {
  public lat: number;
  public lng: number;

  public picture$ = this.route.paramMap.pipe(
    map(params => parseInt(params.get('id'), 10)),
    distinctUntilChanged(),
    debounceTime(10),
    switchMap(id => this.pictureService.getPicture(id, {fields: 'point'})),
    catchError(() => {
      this.router.navigate(['/error-404'], {
        skipLocationChange: true
      });
      return EMPTY;
    }),
    shareReplay(1)
  );

  public map$ = this.picture$.pipe(
    map(picture => {
      const center = latLng(55.7423627, 37.6786422);

      const leafletOptions = {
        layers: [
          tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 18
          })
        ],
        zoom: 8,
        center: center
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

      return {leafletOptions, markers, center}
    })
  );

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private pictureService: PictureService,
    private pageEnv: PageEnvService,
    private zone: NgZone,
    private api: APIService
  ) {}

  ngOnInit(): void {
    setTimeout(
      () =>
        this.pageEnv.set({
          layout: {
            isAdminPage: true,
            needRight: false
          },
          pageId: 72
        }),
      0
    );
  }

  public coordsChanged(mapOptions: MapOptions) {
    const lat = this.lat;
    const lng = this.lng;

    const ll = (isNaN(lat) || isNaN(lng)) ? null : latLng([lat, lng]);
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

  public onMapReady(mapOptions: MapOptions, lmap: Map) {
    lmap.on('click', (event: LeafletMouseEvent) => {
      this.zone.run(() => {
        const ll: LatLng = event.latlng;
        mapOptions.markers = [createMarker(ll.lat, ll.lng)];
        this.lat = ll.lat;
        this.lng = ll.lng;
      });
    });
  }

  public doSubmit(picture: APIPicture) {
    this.api.request<void>('PUT', 'picture/' + picture.id, {body: {
      point: {
        lat: this.lat,
        lng: this.lng
      }
    }}).subscribe(() => {
      this.router.navigate(['/moder/pictures', picture.id]);
    });
  }
}
