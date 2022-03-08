import { Component, SimpleChanges, OnChanges, Input } from '@angular/core';
import {APIItem, APIItemOfDayPicture} from '../../services/item';
import { APIPicture } from '../../services/picture';
import {APIUser} from '../../../../generated/spec.pb';

interface ItemOfDayItem extends APIItem {
  public_route?: string;
}

@Component({
  selector: 'app-item-of-day',
  templateUrl: './item-of-day.component.html',
  styleUrls: ['./item-of-day.component.scss']
})
export class ItemOfDayComponent implements OnChanges {
  @Input() item: ItemOfDayItem;
  @Input() user: APIUser;
  @Input() pictures: APIPicture; // TODO: remove

  public first: APIItemOfDayPicture[];
  public others: APIItemOfDayPicture[];

  ngOnChanges(changes: SimpleChanges) {
    if (changes.item) {
      this.item = changes.item.currentValue;

      if (this.item && this.item.item_of_day_pictures) {
        this.first = this.item.item_of_day_pictures.slice(0, 1);
        this.others = this.item.item_of_day_pictures.slice(1, 5);
      } else {
        this.first = [];
        this.others = [];
      }
    }
  }
}
