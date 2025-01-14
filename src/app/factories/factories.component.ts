import {AsyncPipe} from '@angular/common';
import {Component, inject} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {LeafletModule} from '@bluehalo/ngx-leaflet';
import {
  ItemType,
  PictureFields,
  PictureItemListOptions,
  PictureListOptions,
  PicturesRequest,
  PictureStatus,
} from '@grpc/spec.pb';
import {PicturesClient} from '@grpc/spec.pbsc';
import {ACLService, Privilege, Resource} from '@services/acl.service';
import {APIItem, ItemService} from '@services/item';
import {LanguageService} from '@services/language';
import {PageEnvService} from '@services/page-env.service';
import {MarkdownComponent} from '@utils/markdown/markdown.component';
import {icon, latLng, Marker, marker, tileLayer} from 'leaflet';
import {EMPTY, Observable, of} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, map, shareReplay, switchMap, tap} from 'rxjs/operators';

import {Thumbnail2Component} from '../thumbnail/thumbnail2/thumbnail2.component';
import {ToastsService} from '../toasts/toasts.service';

@Component({
  imports: [RouterLink, LeafletModule, MarkdownComponent, Thumbnail2Component, AsyncPipe],
  selector: 'app-factories',
  templateUrl: './factories.component.html',
})
export class FactoryComponent {
  private readonly itemService = inject(ItemService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly pageEnv = inject(PageEnvService);
  private readonly acl = inject(ACLService);
  private readonly toastService = inject(ToastsService);
  readonly #picturesClient = inject(PicturesClient);
  readonly #languageService = inject(LanguageService);

  protected readonly isModer$ = this.acl.isAllowed$(Resource.GLOBAL, Privilege.MODERATE);

  protected readonly item$: Observable<APIItem> = this.route.paramMap.pipe(
    map((params) => parseInt(params.get('id') ?? '', 10)),
    distinctUntilChanged(),
    debounceTime(10),
    switchMap((id) =>
      this.itemService.getItem$(id, {
        fields: ['name_text', 'name_html', 'lat', 'lng', 'description', 'text', 'related_group_pictures'].join(','),
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
    shareReplay({bufferSize: 1, refCount: false}),
  );

  protected readonly pictures$ = this.item$.pipe(
    switchMap((factory) =>
      this.#picturesClient.getPictures(
        new PicturesRequest({
          fields: new PictureFields({
            commentsCount: true,
            moderVote: true,
            nameHtml: true,
            nameText: true,
            thumbMedium: true,
            views: true,
            votes: true,
          }),
          language: this.#languageService.language,
          limit: 24,
          options: new PictureListOptions({
            pictureItem: new PictureItemListOptions({itemId: '' + factory.id}),
            status: PictureStatus.PICTURE_STATUS_ACCEPTED,
          }),
          order: PicturesRequest.Order.ORDER_ADD_DATE_DESC,
          paginator: false,
        }),
      ),
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
}
