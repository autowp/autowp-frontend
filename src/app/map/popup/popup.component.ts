import {Component, input} from '@angular/core';
import {RouterLink} from '@angular/router';
import {MapPoint} from '@grpc/spec.pb';

@Component({
  imports: [RouterLink],
  selector: 'app-map-popup',
  templateUrl: './popup.component.html',
})
export class MapPopupComponent {
  readonly item = input.required<MapPoint>();
}
