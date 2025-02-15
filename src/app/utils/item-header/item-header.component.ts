import {Component, Input} from '@angular/core';
import {RouterLink} from '@angular/router';
import {Design} from '@grpc/spec.pb';

export interface ItemHeader {
  design?: Design | null;
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
