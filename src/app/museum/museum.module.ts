import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MuseumRoutingModule} from './museum-routing.module';
import {MuseumComponent} from './museum.component';
import {UtilsModule} from '../utils/utils.module';
import {LeafletModule} from '@asymmetrik/ngx-leaflet';
import {ThumbnailModule} from '../thumbnail/thumbnail.module';
import {CommentsModule} from '../comments/comments.module';

@NgModule({
  declarations: [MuseumComponent],
  imports: [CommonModule, MuseumRoutingModule, UtilsModule, LeafletModule, ThumbnailModule, CommentsModule],
})
export class MuseumModule {}
