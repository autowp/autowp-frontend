import {Component} from '@angular/core';
import {APIItem, ItemService} from '../services/item';
import {ACLService, Privilege, Resource} from '../services/acl.service';
import {of, EMPTY, Observable} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {PictureService} from '../services/picture';
import {PageEnvService} from '../services/page-env.service';
import {tileLayer, latLng, marker, icon} from 'leaflet';
import {distinctUntilChanged, debounceTime, switchMap, catchError, tap, map, shareReplay} from 'rxjs/operators';
import {ToastsService} from '../toasts/toasts.service';
import {APIGetItemLinksRequest, ItemType} from '../../../generated/spec.pb';
import {ItemsClient} from '../../../generated/spec.pbsc';

@Component({
  selector: 'app-museum',
  templateUrl: './museum.component.html',
})
export class MuseumComponent {
  public museumModer$ = this.acl.isAllowed(Resource.GLOBAL, Privilege.MODERATE);

  private itemID$ = this.route.paramMap.pipe(
    map((params) => parseInt(params.get('id'), 10)),
    distinctUntilChanged(),
    debounceTime(10),
    shareReplay(1)
  );

  public links$ = this.itemID$.pipe(
    switchMap((itemID) => this.itemsClient.getItemLinks(new APIGetItemLinksRequest({itemId: '' + itemID}))),
    catchError((err) => {
      this.toastService.grpcErrorResponse(err);
      return of(null);
    })
  );

  public pictures$ = this.itemID$.pipe(
    switchMap((itemID) =>
      this.pictureService.getPictures({
        status: 'accepted',
        exact_item_id: itemID,
        fields: 'owner,thumb_medium,votes,views,comments_count,name_html,name_text',
        limit: 20,
        order: 12,
      })
    ),
    catchError((err) => {
      this.toastService.response(err);
      return EMPTY;
    })
  );

  public item$: Observable<APIItem> = this.itemID$.pipe(
    switchMap((id) =>
      this.itemService.getItem(id, {
        fields: ['name_text', 'lat', 'lng', 'description'].join(','),
      })
    ),
    catchError((err) => {
      this.toastService.response(err);
      this.router.navigate(['/error-404'], {
        skipLocationChange: true,
      });
      return EMPTY;
    }),
    switchMap((item) => {
      if (item.item_type_id !== ItemType.ITEM_TYPE_MUSEUM) {
        this.router.navigate(['/error-404'], {
          skipLocationChange: true,
        });
        return EMPTY;
      }
      return of(item);
    }),
    tap((item) => {
      this.pageEnv.set({
        title: item.name_text,
        pageId: 159,
      });
    }),
    shareReplay(1)
  );

  public map$ = this.item$.pipe(
    map((item) => {
      if (!item.lat || !item.lng) {
        return null;
      }

      const center = latLng([item.lat, item.lng]);
      return {
        markers: [
          marker(center, {
            icon: icon({
              iconSize: [25, 41],
              iconAnchor: [13, 41],
              iconUrl: 'assets/marker-icon.png',
              shadowUrl: 'assets/marker-shadow.png',
            }),
          }),
        ],
        options: {
          layers: [
            tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
              maxZoom: 18,
            }),
          ],
          zoom: 17,
          center,
        },
      };
    })
  );

  constructor(
    private acl: ACLService,
    private itemService: ItemService,
    private route: ActivatedRoute,
    private router: Router,
    private pictureService: PictureService,
    private itemsClient: ItemsClient,
    private pageEnv: PageEnvService,
    private toastService: ToastsService
  ) {}
}
