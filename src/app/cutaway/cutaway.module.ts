import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CutawayRoutingModule } from './cutaway-routing.module';
import { CutawayComponent } from './cutaway.component';
import { PaginatorModule } from '../paginator/paginator.module';
import { ThumbnailModule } from '../thumbnail/thumbnail.module';
import {TranslateModule} from '@ngx-translate/core';
import {CutawayAuthorsComponent} from './authors/authors.component';
import {UtilsModule} from '../utils/utils.module';

@NgModule({
  declarations: [CutawayComponent, CutawayAuthorsComponent],
  imports: [
    CommonModule,
    CutawayRoutingModule,
    PaginatorModule,
    ThumbnailModule,
    TranslateModule,
    UtilsModule
  ]
})
export class CutawayModule {}
