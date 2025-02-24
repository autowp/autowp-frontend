import {AsyncPipe} from '@angular/common';
import {Component, inject, Input} from '@angular/core';
import {RouterLink} from '@angular/router';
import {
  APIItem,
  DfDistanceRequest,
  ItemListOptions,
  ItemType,
  Picture,
  PictureFields,
  PictureItemListOptions,
  PictureItemsRequest,
  PictureListOptions,
  PicturesRequest,
} from '@grpc/spec.pb';
import {PicturesClient} from '@grpc/spec.pbsc';
import {LanguageService} from '@services/language';
import {BehaviorSubject, EMPTY, Observable} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';

import {chunkBy} from '../../../../chunk';
import {ThumbnailComponent} from '../../../../thumbnail/thumbnail/thumbnail.component';

@Component({
  imports: [RouterLink, AsyncPipe, ThumbnailComponent],
  selector: 'app-moder-items-item-pictures',
  templateUrl: './pictures.component.html',
})
export class ModerItemsItemPicturesComponent {
  readonly #picturesClient = inject(PicturesClient);
  readonly #languageService = inject(LanguageService);

  @Input() set item(item: APIItem) {
    this.item$.next(item);
  }
  protected readonly item$ = new BehaviorSubject<APIItem | null>(null);

  protected readonly canUseTurboGroupCreator$ = this.item$.pipe(
    map((item) =>
      item ? [ItemType.ITEM_TYPE_VEHICLE, ItemType.ITEM_TYPE_ENGINE].indexOf(item.itemTypeId) !== -1 : false,
    ),
  );

  protected readonly picturesChunks$: Observable<Picture[][]> = this.item$.pipe(
    switchMap((item) =>
      item
        ? this.#picturesClient.getPictures(
            new PicturesRequest({
              fields: new PictureFields({
                commentsCount: true,
                dfDistance: new DfDistanceRequest({limit: 1}),
                moderVote: true,
                nameHtml: true,
                nameText: true,
                pictureItem: new PictureItemsRequest({
                  options: new PictureItemListOptions({
                    item: new ItemListOptions({typeIds: [ItemType.ITEM_TYPE_VEHICLE, ItemType.ITEM_TYPE_BRAND]}),
                  }),
                }),
                thumbMedium: true,
                views: true,
                votes: true,
              }),
              language: this.#languageService.language,
              limit: 500,
              options: new PictureListOptions({
                pictureItem: new PictureItemListOptions({itemId: '' + item.id}),
              }),
              order: PicturesRequest.Order.ORDER_STATUS,
            }),
          )
        : EMPTY,
    ),
    map((response) => chunkBy<Picture>(response.items || [], 6)),
  );
}
