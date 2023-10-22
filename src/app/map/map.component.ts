import {
  ApplicationRef,
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  Injector,
  NgZone,
  OnInit,
} from '@angular/core';
import {MapGetPointsRequest, MapPoint} from '@grpc/spec.pb';
import {MapClient} from '@grpc/spec.pbsc';
import {PageEnvService} from '@services/page-env.service';
import {LatLngBounds, Map, MapOptions, Marker, Popup, icon, latLng, marker, tileLayer} from 'leaflet';
import {BehaviorSubject, EMPTY} from 'rxjs';
import {debounceTime, distinctUntilChanged, map, switchMap} from 'rxjs/operators';

import {ToastsService} from '../toasts/toasts.service';
import {MapPopupComponent} from './popup/popup.component';

function createMarker(lat, lng): Marker {
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
  selector: 'app-map',
  styleUrls: ['./styles.scss'],
  templateUrl: './map.component.html',
})
export class MapComponent implements OnInit {
  private compRef: ComponentRef<MapPopupComponent>;
  protected markers: Marker[] = [];

  private readonly bounds$ = new BehaviorSubject<LatLngBounds>(null);

  public readonly options: MapOptions = {
    center: latLng(50, 20),
    doubleClickZoom: true,
    dragging: true,
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
      }),
    ],
    zoom: 4,
    zoomAnimation: true,
    zoomControl: true,
  };

  constructor(
    private readonly pageEnv: PageEnvService,
    private readonly zone: NgZone,
    private readonly resolver: ComponentFactoryResolver,
    private readonly injector: Injector,
    private readonly appRef: ApplicationRef,
    private readonly toastService: ToastsService,
    private readonly mapClient: MapClient,
  ) {}

  ngOnInit(): void {
    setTimeout(() => this.pageEnv.set({pageId: 117}), 0);

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
            }),
          );
        }),
        map((response) => response.points),
      )
      .subscribe({
        error: (response: unknown) => this.toastService.handleError(response),
        next: (response) => {
          this.renderData(response);
        },
      });
  }

  protected onMapReady(lmap: Map) {
    lmap.on('moveend', () => {
      this.zone.run(() => {
        this.bounds$.next(lmap.getBounds());
      });
    });

    this.zone.run(() => {
      this.bounds$.next(lmap.getBounds());
    });
  }

  private renderData(data: MapPoint[]) {
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
