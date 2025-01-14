import {AsyncPipe} from '@angular/common';
import {Component, Input} from '@angular/core';
import {RouterLink} from '@angular/router';
import {APIUser, ItemType} from '@grpc/spec.pb';
import {APIItemOfDayPicture, ItemOfDayItem} from '@services/item';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {UserComponent} from '../../user/user/user.component';

@Component({
  imports: [UserComponent, RouterLink, AsyncPipe],
  selector: 'app-item-of-day',
  styleUrls: ['./item-of-day.component.scss'],
  templateUrl: './item-of-day.component.html',
})
export class ItemOfDayComponent {
  private _item$?: Observable<ItemOfDayItem>;

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
      }),
    );
  }
  public get item$(): Observable<ItemOfDayItem> | undefined {
    return this._item$;
  }
  @Input() public user$?: Observable<APIUser | null>;

  protected itemOfDayPictures$?: Observable<null | {
    first: APIItemOfDayPicture[];
    others: APIItemOfDayPicture[];
  }>;

  protected readonly ItemType = ItemType;
}
