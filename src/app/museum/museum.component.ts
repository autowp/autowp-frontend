import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {APIGetItemLinksRequest, CommentsType, ItemType} from '@grpc/spec.pb';
import {ItemsClient} from '@grpc/spec.pbsc';
import {ACLService, Privilege, Resource} from '@services/acl.service';
import {APIItem, ItemService} from '@services/item';
import {PageEnvService} from '@services/page-env.service';
import {PictureService} from '@services/picture';
import {icon, latLng, marker, tileLayer} from 'leaflet';
import {EMPTY, Observable, of} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, map, shareReplay, switchMap, tap} from 'rxjs/operators';

import {ToastsService} from '../toasts/toasts.service';

@Component({
  selector: 'app-museum',
  templateUrl: './museum.component.html',
})
export class MuseumComponent {
  protected readonly museumModer$ = this.acl.isAllowed$(Resource.GLOBAL, Privilege.MODERATE);

  private readonly itemID$ = this.route.paramMap.pipe(
    map((params) => parseInt(params.get('id') || '', 10)),
    distinctUntilChanged(),
    debounceTime(10),
    shareReplay(1),
  );

  protected readonly links$ = this.itemID$.pipe(
    switchMap((itemID) => this.itemsClient.getItemLinks(new APIGetItemLinksRequest({itemId: '' + itemID}))),
    catchError((err: unknown) => {
      this.toastService.handleError(err);
      return of(null);
    }),
  );

  protected readonly pictures$ = this.itemID$.pipe(
    switchMap((itemID) =>
      this.pictureService.getPictures$({
        exact_item_id: itemID,
        fields: 'owner,thumb_medium,votes,views,comments_count,name_html,name_text',
        limit: 20,
        order: 12,
        status: 'accepted',
      }),
    ),
    catchError((err: unknown) => {
      this.toastService.handleError(err);
      return EMPTY;
    }),
  );

  protected readonly item$: Observable<APIItem> = this.itemID$.pipe(
    switchMap((id) =>
      this.itemService.getItem$(id, {
        fields: ['name_text', 'lat', 'lng', 'description'].join(','),
      }),
    ),
    catchError((err: unknown) => {
      this.toastService.handleError(err);
      this.router.navigate(['/error-404'], {
        skipLocationChange: true,
      });
      return EMPTY;
    }),
    switchMap((item) => {
      if (!item || item.item_type_id !== ItemType.ITEM_TYPE_MUSEUM) {
        this.router.navigate(['/error-404'], {
          skipLocationChange: true,
        });
        return EMPTY;
      }
      return of(item);
    }),
    tap((item) => {
      this.pageEnv.set({
        pageId: 159,
        title: item.name_text,
      });
    }),
    shareReplay(1),
  );

  protected readonly map$ = this.item$.pipe(
    map((item) => {
      if (!item.lat || !item.lng) {
        return null;
      }

      const center = latLng([item.lat, item.lng]);
      return {
        markers: [
          marker(center, {
            icon: icon({
              iconAnchor: [13, 41],
              iconSize: [25, 41],
              iconUrl: 'assets/marker-icon.png',
              shadowUrl: 'assets/marker-shadow.png',
            }),
          }),
        ],
        options: {
          center,
          layers: [
            tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
              maxZoom: 18,
            }),
          ],
          zoom: 17,
        },
      };
    }),
  );

  protected readonly CommentsType = CommentsType;

  constructor(
    private readonly acl: ACLService,
    private readonly itemService: ItemService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly pictureService: PictureService,
    private readonly itemsClient: ItemsClient,
    private readonly pageEnv: PageEnvService,
    private readonly toastService: ToastsService,
  ) {}
}
