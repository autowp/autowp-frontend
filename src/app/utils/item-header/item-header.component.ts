import {Component, Input} from '@angular/core';

export interface ItemHeader {
  design?: {
    name: string;
    route: string[];
  };
  nameHTML: string;
  produced?: {
    count: number;
    exactly: boolean;
  };
}

@Component({
  selector: 'app-item-header',
  templateUrl: './item-header.component.html',
})
export class ItemHeaderComponent {
  @Input() item: ItemHeader;
}
