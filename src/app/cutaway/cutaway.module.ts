import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CutawayRoutingModule } from './cutaway-routing.module';
import { CutawayComponent } from './cutaway.component';
import { PaginatorModule } from '../paginator/paginator.module';
import { ThumbnailModule } from '../thumbnail/thumbnail.module';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [CutawayComponent],
  imports: [
    CommonModule,
    CutawayRoutingModule,
    PaginatorModule,
    ThumbnailModule,
    TranslateModule
  ]
})
export class CutawayModule {}
