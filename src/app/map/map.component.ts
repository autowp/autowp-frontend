import {
  Component,
  NgZone,
  OnInit,
  ComponentFactoryResolver,
  ComponentRef,
  Injector,
  ApplicationRef,
} from '@angular/core';
import {BehaviorSubject, EMPTY} from 'rxjs';
import {PageEnvService} from '../services/page-env.service';
import {tileLayer, latLng, Map, LatLngBounds, Marker, marker, icon, Popup, MapOptions} from 'leaflet';
import {debounceTime, distinctUntilChanged, map, switchMap} from 'rxjs/operators';
import {MapPopupComponent} from './popup/popup.component';
import {ToastsService} from '../toasts/toasts.service';
import {MapClient} from '@grpc/spec.pbsc';
import {MapGetPointsRequest, MapPoint} from '@grpc/spec.pb';

function createMarker(lat, lng): Marker {
  return marker([lat, lng], {
    icon: icon({
      iconSize: [25, 41],
      iconAnchor: [13, 41],
      iconUrl: 'assets/marker-icon.png',
      shadowUrl: 'assets/marker-shadow.png',
    }),
  });
}

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./styles.scss'],
})
export class MapComponent implements OnInit {
  private compRef: ComponentRef<MapPopupComponent>;
  public markers: Marker[] = [];

  private bounds$ = new BehaviorSubject<LatLngBounds>(null);

  public options: MapOptions = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
      }),
    ],
    zoom: 4,
    center: latLng(50, 20),
    zoomControl: true,
    dragging: true,
    zoomAnimation: true,
    doubleClickZoom: true,
  };

  constructor(
    private pageEnv: PageEnvService,
    private zone: NgZone,
    private resolver: ComponentFactoryResolver,
    private injector: Injector,
    private appRef: ApplicationRef,
    private toastService: ToastsService,
    private mapClient: MapClient
  ) {
    setTimeout(() => this.pageEnv.set({pageId: 117}), 0);
  }

  ngOnInit(): void {
    this.bounds$
      .pipe(
        distinctUntilChanged(),
        debounceTime(100),
        switchMap((bounds) => {
          if (!bounds) {
            return EMPTY;
          }

          return this.mapClient.getPoints(
            new MapGetPointsRequest({
              bounds: bounds.toBBoxString(),
              pointsOnly: false,
            })
          );
        }),
        map((response) => response.points)
      )
      .subscribe({
        next: (response) => {
          this.renderData(response);
        },
        error: (response) => this.toastService.response(response),
      });
  }

  onMapReady(lmap: Map) {
    lmap.on('moveend', () => {
      this.zone.run(() => {
        this.bounds$.next(lmap.getBounds());
      });
    });

    this.zone.run(() => {
      this.bounds$.next(lmap.getBounds());
    });
  }

  renderData(data: MapPoint[]) {
    for (const m of this.markers) {
      m.remove();
    }
    this.markers = [];

    for (const item of data) {
      const m = createMarker(item.location.lat, item.location.lng);

      const popup = new Popup();
      m.on('click', () => {
        this.zone.run(() => {
          if (this.compRef) {
            this.compRef.destroy();
          }

          const compFactory = this.resolver.resolveComponentFactory(MapPopupComponent);
          this.compRef = compFactory.create(this.injector);
          this.compRef.instance.item = item;

          const div = document.createElement('div');
          div.appendChild(this.compRef.location.nativeElement);

          popup.setContent(div);

          this.appRef.attachView(this.compRef.hostView);
          this.compRef.onDestroy(() => {
            this.appRef.detachView(this.compRef.hostView);
          });
        });
      });

      m.bindPopup(popup);

      this.markers.push(m);
    }

    /*const points: any[] = [];

    // const zoomIsHeatmap = isHeatmap(zoom);

    $.each(data, (key: any, factory: any) => {
      if (factory.location) {
        if (zoomIsHeatmap) {
          points.push([factory.location.lat, factory.location.lng, 1]);
        } else {

        }
      }
    });

    if (zoomIsHeatmap) {
      heatmap.setData(points);
      heatmap.addTo(map);
    } else {
      heatmap.remove();
    }*/
  }
}
