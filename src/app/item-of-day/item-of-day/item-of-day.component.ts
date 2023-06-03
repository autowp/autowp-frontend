import {Component, Input} from '@angular/core';
import {APIItemOfDayPicture, ItemOfDayItem} from '@services/item';
import {APIUser} from '@grpc/spec.pb';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-item-of-day',
  templateUrl: './item-of-day.component.html',
  styleUrls: ['./item-of-day.component.scss'],
})
export class ItemOfDayComponent {
  private _item$: Observable<ItemOfDayItem>;

  @Input() public set item$(item$: Observable<ItemOfDayItem>) {
    this._item$ = item$;
    this.itemOfDayPictures$ = item$.pipe(
      map((item) => {
        if (!item) {
          return null;
        }
        return {
          first: item.item_of_day_pictures.slice(0, 1),
          others: item.item_of_day_pictures.slice(1, 5),
        };
      })
    );
  }
  public get item$() {
    return this._item$;
  }
  @Input() public user$: Observable<APIUser>;

  protected itemOfDayPictures$: Observable<{
    first: APIItemOfDayPicture[];
    others: APIItemOfDayPicture[];
  } | null>;
}
