import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapRoutingModule } from './map-routing.module';
import { MapComponent } from './map.component';
import { MapPopupComponent } from './popup/popup.component';
import { TranslateModule } from '@ngx-translate/core';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

@NgModule({
  declarations: [MapComponent, MapPopupComponent],
  imports: [
    CommonModule,
    MapRoutingModule,
    TranslateModule,
    LeafletModule
  ],
  entryComponents: [MapPopupComponent]
})
export class MapModule { }
