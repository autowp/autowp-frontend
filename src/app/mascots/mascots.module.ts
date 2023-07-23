import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {PaginatorModule} from '../paginator/paginator.module';
import {ThumbnailModule} from '../thumbnail/thumbnail.module';
import {MascotsComponent} from './mascots.component';
import {MascotsRoutingModule} from './mascots-routing.module';

@NgModule({
  declarations: [MascotsComponent],
  imports: [CommonModule, MascotsRoutingModule, PaginatorModule, ThumbnailModule],
})
export class MascotsModule {}
