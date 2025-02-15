import {AsyncPipe} from '@angular/common';
import {Component, Input} from '@angular/core';
import {RouterLink} from '@angular/router';
import {APIItem, APIUser, ItemOfDayPicture, ItemType} from '@grpc/spec.pb';
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
  private _item$?: Observable<APIItem>;

  @Input() public set item$(item$: Observable<APIItem>) {
    this._item$ = item$;
    this.itemOfDayPictures$ = item$.pipe(
      map((item) => {
        if (!item) {
          return null;
        }
        return {
          first: (item.itemOfDayPictures || []).slice(0, 1),
          others: (item.itemOfDayPictures || []).slice(1, 5),
        };
      }),
    );
  }
  public get item$(): Observable<APIItem> | undefined {
    return this._item$;
  }
  @Input() public user$?: Observable<APIUser | null>;

  protected itemOfDayPictures$?: Observable<null | {
    first: ItemOfDayPicture[];
    others: ItemOfDayPicture[];
  }>;

  protected readonly ItemType = ItemType;
}
