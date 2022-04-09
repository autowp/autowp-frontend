import { Component, Input } from '@angular/core';
import {APIItem, APIItemOfDayPicture} from '../../services/item';
import {APIUser} from '../../../../generated/spec.pb';
import {BehaviorSubject} from 'rxjs';
import {map} from 'rxjs/operators';

interface ItemOfDayItem extends APIItem {
  public_route?: string;
}

@Component({
  selector: 'app-item-of-day',
  templateUrl: './item-of-day.component.html',
  styleUrls: ['./item-of-day.component.scss']
})
export class ItemOfDayComponent {

  @Input() set item(item: ItemOfDayItem) { this.item$.next(item); };
  public item$ = new BehaviorSubject<ItemOfDayItem>(null);

  @Input() user: APIUser;

  public itemOfDayPictures$ = this.item$.pipe(
    map(item => {
      if (! item) {
        return {
          first: [] as APIItemOfDayPicture[],
          others: [] as APIItemOfDayPicture[],
        }
      }
      return {
        first: item.item_of_day_pictures.slice(0, 1),
        others: item.item_of_day_pictures.slice(1, 5),
      }
    })
  );
}
