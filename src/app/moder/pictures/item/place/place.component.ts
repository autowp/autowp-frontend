import {Component, Injectable, OnInit, OnDestroy, NgZone} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { PictureService, APIPicture } from '../../../../services/picture';
import { PageEnvService } from '../../../../services/page-env.service';
import {
  distinctUntilChanged,
  debounceTime,
  switchMap, map
} from 'rxjs/operators';
import {icon, LatLng, latLng, LeafletMouseEvent, Map, marker, Marker, tileLayer} from 'leaflet';
import { APIService } from '../../../../services/api.service';

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
  selector: 'app-moder-pictures-place',
  templateUrl: './place.component.html'
})
@Injectable()
export class ModerPicturesItemPlaceComponent implements OnInit, OnDestroy {
  private sub: Subscription;
  public picture: APIPicture;

  public markers: Marker[] = [];
  public lat: number;
  public lng: number;

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
          nameTranslated: $localize `Location`,
          pageId: 72
        }),
      0
    );

    this.sub = this.route.paramMap
      .pipe(
        map(params => parseInt(params.get('id'), 10)),
        distinctUntilChanged(),
        debounceTime(30),
        switchMap(id =>
          this.pictureService.getPicture(id, {
            fields: 'point'
          })
        )
      )
      .subscribe(
      picture => {
          this.picture = picture;
          if (picture && picture.point) {
            this.lat = picture.point.lat;
            this.lng = picture.point.lng;
            if (this.lat && this.lng) {
              this.markers = [createMarker(this.lat, this.lng)];
              const ll = latLng(this.lat, this.lng);
              this.center = ll;
              this.leafletOptions.center = ll;
            }
          }
        },
        () => {
          this.router.navigate(['/error-404'], {
            skipLocationChange: true
          });
        }
      );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  public coordsChanged() {
    const lat = this.lat;
    const lng = this.lng;

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

  public onMapReady(lmap: Map) {
    lmap.on('click', (event: LeafletMouseEvent) => {
      this.zone.run(() => {
        const ll: LatLng = event.latlng;
        this.markers = [createMarker(ll.lat, ll.lng)];
        this.lat = ll.lat;
        this.lng = ll.lng;
      });
    });
  }

  public doSubmit() {
    this.api
      .request<void>('PUT', 'picture/' + this.picture.id, {body: {
        point: {
          lat: this.lat,
          lng: this.lng
        }
      }})
      .subscribe(() => {
        this.router.navigate(['/moder/pictures', this.picture.id]);
      });
  }
}
