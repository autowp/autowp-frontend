import {Component, Input} from '@angular/core';
import {ItemType} from '@grpc/spec.pb';
import {APIItem} from '@services/item';
import {APIPicture, PictureService} from '@services/picture';
import {BehaviorSubject, Observable} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';

import {chunkBy} from '../../../../chunk';

@Component({
  selector: 'app-moder-items-item-pictures',
  templateUrl: './pictures.component.html',
})
export class ModerItemsItemPicturesComponent {
  @Input() set item(item: APIItem) {
    this.item$.next(item);
  }
  protected readonly item$ = new BehaviorSubject<APIItem>(null);

  protected readonly canUseTurboGroupCreator$ = this.item$.pipe(
    map((item) =>
      item ? [ItemType.ITEM_TYPE_VEHICLE, ItemType.ITEM_TYPE_ENGINE].indexOf(item.item_type_id) !== -1 : false,
    ),
  );

  protected readonly picturesChunks$: Observable<APIPicture[][]> = this.item$.pipe(
    switchMap((item) =>
      this.pictureService.getPictures$({
        exact_item_id: item.id,
        fields: 'owner,thumb_medium,moder_vote,votes,similar,comments_count,perspective_item,name_html,name_text,views',
        limit: 500,
        order: 14,
      }),
    ),
    map((response) => chunkBy<APIPicture>(response.pictures, 6)),
  );

  constructor(private readonly pictureService: PictureService) {}
}
