import {Component, Input} from '@angular/core';
import {RouterLink} from '@angular/router';

export interface ItemHeader {
  design?: {
    name: string;
    route: string[];
  } | null;
  nameHTML: string;
  produced?: {
    count: number;
    exactly: boolean;
  };
}

@Component({
  imports: [RouterLink],
  selector: 'app-item-header',
  standalone: true,
  templateUrl: './item-header.component.html',
})
export class ItemHeaderComponent {
  @Input() item: ItemHeader | null = null;
}
