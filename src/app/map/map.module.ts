import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapRoutingModule } from './map-routing.module';
import { MapComponent } from './map.component';
import { MapPopupComponent } from './popup/popup.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

@NgModule({
  declarations: [MapComponent, MapPopupComponent],
  imports: [
    CommonModule,
    MapRoutingModule,
    LeafletModule
  ]
})
export class MapModule { }
