import { Component, Input } from '@angular/core';
import { MapItem } from '../map.component';

@Component({
  selector: 'app-map-popup',
  templateUrl: './popup.component.html'
})
export class MapPopupComponent {
  @Input() item: MapItem;
}
