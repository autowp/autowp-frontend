import {
  Component,
  Injectable,
  NgZone,
  OnInit,
  ComponentFactoryResolver,
  ComponentRef,
  Injector,
  ApplicationRef
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, EMPTY} from 'rxjs';
import { PageEnvService } from '../services/page-env.service';
import {
  tileLayer,
  latLng,
  Map,
  LatLngBounds,
  Marker,
  marker,
  icon,
  Popup
} from 'leaflet';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { MapPopupComponent } from './popup/popup.component';
import {ToastsService} from '../toasts/toasts.service';

export interface MapItem {
  location: {
    lat: number;
    lng: number;
  };
  id: string;
  name: string;
  url: string[];
  image: string;
}

// require('leaflet-webgl-heatmap/src/webgl-heatmap/webgl-heatmap');
// require('leaflet-webgl-heatmap/dist/leaflet-webgl-heatmap.min');

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
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./styles.scss']
})
@Injectable()
export class MapComponent implements OnInit {
  private compRef: ComponentRef<MapPopupComponent>;
  public markers: Marker[] = [];

  private bounds$ = new BehaviorSubject<LatLngBounds>(null);

  public options = {
    layers: [
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18
      })
    ],
    zoom: 4,
    center: latLng(50, 20)
  };

  constructor(
    private http: HttpClient,
    private pageEnv: PageEnvService,
    private zone: NgZone,
    private resolver: ComponentFactoryResolver,
    private injector: Injector,
    private appRef: ApplicationRef,
    private toastService: ToastsService
  ) {
    setTimeout(
      () =>
        this.pageEnv.set({
          layout: {
            needRight: false
          },
          name: 'page/117/name',
          pageId: 117
        }),
      0
    );
  }

  ngOnInit(): void {
    this.bounds$
      .pipe(
        distinctUntilChanged(),
        debounceTime(100),
        switchMap(bounds => {
          if (!bounds) {
            return EMPTY;
          }

          return this.http.get<MapItem[]>('/api/map/data', {
            params: {
              bounds: bounds.toBBoxString(),
              'points-only': '0'
            }
          });
        })
      )
      .subscribe(
        response => {
          this.renderData(response);
        },
        response => this.toastService.response(response)
      );
  }

  onMapReady(lmap: Map) {
    lmap.on('moveend', event => {
      this.zone.run(() => {
        this.bounds$.next(lmap.getBounds());
      });
    });

    this.zone.run(() => {
      this.bounds$.next(lmap.getBounds());
    });
  }

  renderData(data: MapItem[]) {
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

          const compFactory = this.resolver.resolveComponentFactory(
            MapPopupComponent
          );
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
