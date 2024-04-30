import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ItemType} from '@grpc/spec.pb';
import {ACLService, Privilege, Resource} from '@services/acl.service';
import {APIItem, ItemService} from '@services/item';
import {PageEnvService} from '@services/page-env.service';
import {PictureService} from '@services/picture';
import {Marker, icon, latLng, marker, tileLayer} from 'leaflet';
import {EMPTY, Observable, of} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, map, shareReplay, switchMap, tap} from 'rxjs/operators';

import {ToastsService} from '../toasts/toasts.service';

@Component({
  selector: 'app-factories',
  templateUrl: './factories.component.html',
})
export class FactoryComponent {
  protected readonly isModer$ = this.acl.isAllowed$(Resource.GLOBAL, Privilege.MODERATE);

  protected readonly item$: Observable<APIItem> = this.route.paramMap.pipe(
    map((params) => parseInt(params.get('id') || '', 10)),
    distinctUntilChanged(),
    debounceTime(10),
    switchMap((id) =>
      this.itemService.getItem$(id, {
        fields: ['name_text', 'name_html', 'lat', 'lng', 'description', 'related_group_pictures'].join(','),
      }),
    ),
    catchError((err: unknown) => {
      this.toastService.handleError(err);
      this.router.navigate(['/error-404'], {
        skipLocationChange: true,
      });
      return EMPTY;
    }),
    switchMap((factory) => {
      if (!factory || factory.item_type_id !== ItemType.ITEM_TYPE_FACTORY) {
        this.router.navigate(['/error-404'], {
          skipLocationChange: true,
        });
        return EMPTY;
      }

      return of(factory);
    }),
    tap((factory) => {
      this.pageEnv.set({
        pageId: 181,
        title: factory.name_text,
      });
    }),
    shareReplay(1),
  );

  protected readonly pictures$ = this.item$.pipe(
    switchMap((factory) =>
      this.pictureService.getPictures$({
        exact_item_id: factory.id,
        fields: 'owner,thumb_medium,votes,views,comments_count,name_html,name_text',
        limit: 24,
        status: 'accepted',
      }),
    ),
    catchError((err: unknown) => {
      this.toastService.handleError(err);
      return EMPTY;
    }),
  );

  protected readonly map$ = this.item$.pipe(
    map((factory) => {
      if (!factory.lat || !factory.lng) {
        return null;
      }

      const center = latLng([factory.lat, factory.lng]);
      const markers: Marker[] = [
        marker(center, {
          icon: icon({
            iconAnchor: [13, 41],
            iconSize: [25, 41],
            iconUrl: 'assets/marker-icon.png',
            shadowUrl: 'assets/marker-shadow.png',
          }),
        }),
      ];
      const options = {
        center,
        layers: [
          tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 18,
          }),
        ],
        zoom: 17,
      };

      return {markers, options};
    }),
  );

  constructor(
    private readonly itemService: ItemService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly pictureService: PictureService,
    private readonly pageEnv: PageEnvService,
    private readonly acl: ACLService,
    private readonly toastService: ToastsService,
  ) {}
}
