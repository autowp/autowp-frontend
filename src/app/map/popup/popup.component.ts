import {Component, Input} from '@angular/core';
import {MapPoint} from '@grpc/spec.pb';

@Component({
  selector: 'app-map-popup',
  templateUrl: './popup.component.html',
})
export class MapPopupComponent {
  @Input() item: MapPoint;
}
