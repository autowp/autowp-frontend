import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {LeafletModule} from '@asymmetrik/ngx-leaflet';
import {UtilsModule} from '@utils/utils.module';

import {CommentsModule} from '../comments/comments.module';
import {ThumbnailModule} from '../thumbnail/thumbnail.module';
import {MuseumComponent} from './museum.component';
import {MuseumRoutingModule} from './museum-routing.module';

@NgModule({
  declarations: [MuseumComponent],
  imports: [CommonModule, MuseumRoutingModule, UtilsModule, LeafletModule, ThumbnailModule, CommentsModule],
})
export class MuseumModule {}
