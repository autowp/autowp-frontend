import {Component, Input} from '@angular/core';
import {RouterLink} from '@angular/router';

export interface ItemHeader {
  design?: null | {
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
  imports: [RouterLink],
  selector: 'app-item-header',
  templateUrl: './item-header.component.html',
})
export class ItemHeaderComponent {
  @Input() item: ItemHeader | null = null;
}
