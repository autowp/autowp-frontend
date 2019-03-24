import { Component, SimpleChanges, OnChanges, Input } from '@angular/core';
import { APIItem } from '../../services/item';
import { APIUser } from '../../services/user';
import { APIPicture } from '../../services/picture';

interface ItemOfDayItem extends APIItem {
  public_url?: string;
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

  public first: APIPicture[];
  public others: APIPicture[];

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
