import {AsyncPipe} from '@angular/common';
import {Component, inject} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {LeafletModule} from '@bluehalo/ngx-leaflet';
import {
  APIGetItemLinksRequest,
  APIItem,
  CommentsType,
  GetPicturesRequest,
  ItemFields,
  ItemRequest,
  ItemType,
  PictureFields,
  PictureItemOptions,
  PicturesOptions,
  PictureStatus,
} from '@grpc/spec.pb';
import {ItemsClient, PicturesClient} from '@grpc/spec.pbsc';
import {ACLService, Privilege, Resource} from '@services/acl.service';
import {LanguageService} from '@services/language';
import {PageEnvService} from '@services/page-env.service';
import {MarkdownComponent} from '@utils/markdown/markdown.component';
import {icon, latLng, marker, tileLayer} from 'leaflet';
import {EMPTY, Observable, of} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, map, shareReplay, switchMap, tap} from 'rxjs/operators';

import {CommentsComponent} from '../comments/comments/comments.component';
import {Thumbnail2Component} from '../thumbnail/thumbnail2/thumbnail2.component';
import {ToastsService} from '../toasts/toasts.service';

@Component({
  imports: [RouterLink, LeafletModule, MarkdownComponent, Thumbnail2Component, CommentsComponent, AsyncPipe],
  selector: 'app-museum',
  templateUrl: './museum.component.html',
})
export class MuseumComponent {
  private readonly acl = inject(ACLService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly itemsClient = inject(ItemsClient);
  private readonly pageEnv = inject(PageEnvService);
  private readonly toastService = inject(ToastsService);
  readonly #picturesClient = inject(PicturesClient);
  readonly #languageService = inject(LanguageService);

  protected readonly museumModer$ = this.acl.isAllowed$(Resource.GLOBAL, Privilege.MODERATE);

  private readonly itemID$ = this.route.paramMap.pipe(
    map((params) => params.get('id') ?? ''),
    distinctUntilChanged(),
    debounceTime(10),
    shareReplay({bufferSize: 1, refCount: false}),
  );

  protected readonly links$ = this.itemID$.pipe(
    switchMap((itemID) => this.itemsClient.getItemLinks(new APIGetItemLinksRequest({itemId: itemID}))),
    catchError((err: unknown) => {
      this.toastService.handleError(err);
      return of(null);
    }),
  );

  protected readonly pictures$ = this.itemID$.pipe(
    switchMap((itemID) =>
      this.#picturesClient.getPictures(
        new GetPicturesRequest({
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
          limit: 20,
          options: new PicturesOptions({
            pictureItem: new PictureItemOptions({
              itemId: itemID,
            }),
            status: PictureStatus.PICTURE_STATUS_ACCEPTED,
          }),
          order: GetPicturesRequest.Order.LIKES,
          paginator: false,
        }),
      ),
    ),
    catchError((err: unknown) => {
      this.toastService.handleError(err);
      return EMPTY;
    }),
  );

  protected readonly item$: Observable<APIItem> = this.itemID$.pipe(
    switchMap((id) =>
      this.itemsClient.item(
        new ItemRequest({
          fields: new ItemFields({
            description: true,
            location: true,
            nameHtml: true,
            nameText: true,
          }),
          id,
          language: this.#languageService.language,
        }),
      ),
    ),
    catchError((err: unknown) => {
      this.toastService.handleError(err);
      this.router.navigate(['/error-404'], {
        skipLocationChange: true,
      });
      return EMPTY;
    }),
    switchMap((item) => {
      if (!item || item.itemTypeId !== ItemType.ITEM_TYPE_MUSEUM) {
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
        title: item.nameText,
      });
    }),
    shareReplay({bufferSize: 1, refCount: false}),
  );

  protected readonly map$ = this.item$.pipe(
    map((item) => {
      if (!item.location?.latitude || !item.location?.longitude) {
        return null;
      }

      const center = latLng([item.location.latitude, item.location.longitude]);
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
}
