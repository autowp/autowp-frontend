import {AsyncPipe} from '@angular/common';
import {Component, input} from '@angular/core';
import {toObservable} from '@angular/core/rxjs-interop';
import {RouterLink} from '@angular/router';
import {APIItem, APIUser, ItemOfDayPicture, ItemType} from '@grpc/spec.pb';
import {Observable} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';

import {UserComponent} from '../../user/user/user.component';

@Component({
  imports: [UserComponent, RouterLink, AsyncPipe],
  selector: 'app-item-of-day',
  styleUrls: ['./item-of-day.component.scss'],
  templateUrl: './item-of-day.component.html',
})
export class ItemOfDayComponent {
  readonly item$ = input.required<Observable<APIItem>>();
  protected readonly _item$: Observable<APIItem> = toObservable(this.item$).pipe(switchMap((item$) => item$));

  protected readonly itemOfDayPictures$?: Observable<null | {
    first: ItemOfDayPicture[];
    others: ItemOfDayPicture[];
  }> = this._item$.pipe(
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

  public readonly user$ = input.required<Observable<APIUser | null>>();

  protected readonly ItemType = ItemType;
}
