import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {PaginatorModule} from '../paginator/paginator.module';
import {ThumbnailModule} from '../thumbnail/thumbnail.module';
import {TopViewComponent} from './top-view.component';
import {TopViewRoutingModule} from './top-view-routing.module';

@NgModule({
  declarations: [TopViewComponent],
  imports: [CommonModule, TopViewRoutingModule, PaginatorModule, ThumbnailModule],
})
export class TopViewModule {}
