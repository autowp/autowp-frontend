import {Component, Input} from '@angular/core';
import {APIItem} from '@services/item';
import {PictureService, APIPicture} from '@services/picture';
import {chunkBy} from '../../../../chunk';
import {BehaviorSubject, Observable} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import {ItemType} from '@grpc/spec.pb';

@Component({
  selector: 'app-moder-items-item-pictures',
  templateUrl: './pictures.component.html',
})
export class ModerItemsItemPicturesComponent {
  @Input() set item(item: APIItem) {
    this.item$.next(item);
  }
  public item$ = new BehaviorSubject<APIItem>(null);

  public canUseTurboGroupCreator$ = this.item$.pipe(
    map((item) =>
      item ? [ItemType.ITEM_TYPE_VEHICLE, ItemType.ITEM_TYPE_ENGINE].indexOf(item.item_type_id) !== -1 : false
    )
  );
  public picturesChunks$: Observable<APIPicture[][]> = this.item$.pipe(
    switchMap((item) =>
      this.pictureService.getPictures$({
        exact_item_id: item.id,
        limit: 500,
        fields: 'owner,thumb_medium,moder_vote,votes,similar,comments_count,perspective_item,name_html,name_text,views',
        order: 14,
      })
    ),
    map((response) => chunkBy<APIPicture>(response.pictures, 6))
  );

  constructor(private pictureService: PictureService) {}
}
