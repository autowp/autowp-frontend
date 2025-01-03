import {AsyncPipe} from '@angular/common';
import {Component, inject, Input} from '@angular/core';
import {RouterLink} from '@angular/router';
import {ItemType} from '@grpc/spec.pb';
import type {APIItem} from '@services/item';
import {APIPicture, PictureService} from '@services/picture';
import {BehaviorSubject, EMPTY, Observable} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';

import {chunkBy} from '../../../../chunk';
import {ThumbnailComponent} from '../../../../thumbnail/thumbnail/thumbnail.component';

@Component({
  imports: [RouterLink, ThumbnailComponent, AsyncPipe],
  selector: 'app-moder-items-item-pictures',
  templateUrl: './pictures.component.html',
})
export class ModerItemsItemPicturesComponent {
  private readonly pictureService = inject(PictureService);

  @Input() set item(item: APIItem) {
    this.item$.next(item);
  }
  protected readonly item$ = new BehaviorSubject<APIItem | null>(null);

  protected readonly canUseTurboGroupCreator$ = this.item$.pipe(
    map((item) =>
      item ? [ItemType.ITEM_TYPE_VEHICLE, ItemType.ITEM_TYPE_ENGINE].indexOf(item.item_type_id) !== -1 : false,
    ),
  );

  protected readonly picturesChunks$: Observable<APIPicture[][]> = this.item$.pipe(
    switchMap((item) =>
      item
        ? this.pictureService.getPictures$({
            exact_item_id: item.id,
            fields:
              'owner,thumb_medium,moder_vote,votes,similar,comments_count,perspective_item,name_html,name_text,views',
            limit: 500,
            order: 14,
          })
        : EMPTY,
    ),
    map((response) => chunkBy<APIPicture>(response.pictures, 6)),
  );
}
