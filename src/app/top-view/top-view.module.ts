import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TopViewRoutingModule} from './top-view-routing.module';
import {TopViewComponent} from './top-view.component';
import {PaginatorModule} from '../paginator/paginator.module';
import {ThumbnailModule} from '../thumbnail/thumbnail.module';

@NgModule({
  declarations: [TopViewComponent],
  imports: [CommonModule, TopViewRoutingModule, PaginatorModule, ThumbnailModule],
})
export class TopViewModule {}
