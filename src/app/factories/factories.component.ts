import { Component} from '@angular/core';
import {APIItem, ItemService} from '../services/item';
import {EMPTY, Observable, of} from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { PictureService} from '../services/picture';
import { PageEnvService } from '../services/page-env.service';
import {distinctUntilChanged, debounceTime, switchMap, catchError, map, tap, shareReplay} from 'rxjs/operators';
import {ACLService, Privilege, Resource} from '../services/acl.service';
import { tileLayer, latLng, Marker, marker, icon } from 'leaflet';
import {ToastsService} from '../toasts/toasts.service';

@Component({
  selector: 'app-factories',
  templateUrl: './factories.component.html'
})
export class FactoryComponent {
  public isModer$ = this.acl.isAllowed(Resource.GLOBAL, Privilege.MODERATE);

  public item$: Observable<APIItem> = this.route.paramMap.pipe(
    map(params => parseInt(params.get('id'), 10)),
    distinctUntilChanged(),
    debounceTime(10),
    switchMap(id => this.itemService.getItem(id, {
      fields: ['name_text', 'name_html', 'lat', 'lng', 'description', 'related_group_pictures'].join(',')
    })),
    catchError((err) => {
      this.toastService.response(err);
      this.router.navigate(['/error-404'], {
        skipLocationChange: true
      });
      return EMPTY;
    }),
    switchMap(factory => {
      if (factory.item_type_id !== 6) {
        this.router.navigate(['/error-404'], {
          skipLocationChange: true
        });
        return EMPTY;
      }

      return of(factory);
    }),
    tap(factory => {
      this.pageEnv.set({
        nameTranslated: factory.name_text,
        pageId: 181
      });
    }),
    shareReplay(1)
  );

  public pictures$ = this.item$.pipe(
    switchMap(factory => this.pictureService.getPictures({
      status: 'accepted',
      exact_item_id: factory.id,
      limit: 24,
      fields: 'owner,thumb_medium,votes,views,comments_count,name_html,name_text'
    })),
    catchError(err => {
      this.toastService.response(err);
      return EMPTY;
    })
  );

  public map$ = this.item$.pipe(
    map(factory => {
      if (!factory.lat || !factory.lng) {
        return null;
      }

      const center = latLng([factory.lat, factory.lng]);
      const markers: Marker[] = [
        marker(center, {
          icon: icon({
            iconSize: [25, 41],
            iconAnchor: [13, 41],
            iconUrl: 'assets/marker-icon.png',
            shadowUrl: 'assets/marker-shadow.png'
          })
        })
      ];
      const options = {
        layers: [
          tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 18
          })
        ],
        zoom: 17,
        center
      };

      return {markers, options}
    })
  );

  constructor(
    private itemService: ItemService,
    private route: ActivatedRoute,
    private router: Router,
    private pictureService: PictureService,
    private pageEnv: PageEnvService,
    private acl: ACLService,
    private toastService: ToastsService
  ) {}
}
