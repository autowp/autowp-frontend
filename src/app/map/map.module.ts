import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {LeafletModule} from '@asymmetrik/ngx-leaflet';

import {MapComponent} from './map.component';
import {MapRoutingModule} from './map-routing.module';
import {MapPopupComponent} from './popup/popup.component';

@NgModule({
  declarations: [MapComponent, MapPopupComponent],
  imports: [CommonModule, MapRoutingModule, LeafletModule],
})
export class MapModule {}
