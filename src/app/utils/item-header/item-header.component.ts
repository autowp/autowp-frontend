import {Component, Input} from '@angular/core';

export interface ItemHeader {
  nameHTML: string;
  design?: {
    name: string;
    route: string[];
  };
  produced?: {
    count: number;
    exactly: boolean;
  };
}

@Component({
  selector: 'app-item-header',
  templateUrl: './item-header.component.html'
})
export class ItemHeaderComponent {
  @Input() item: ItemHeader;

}
