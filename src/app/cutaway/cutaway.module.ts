import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {UtilsModule} from '@utils/utils.module';

import {PaginatorModule} from '../paginator/paginator.module';
import {ThumbnailModule} from '../thumbnail/thumbnail.module';
import {CutawayAuthorsComponent} from './authors/authors.component';
import {CutawayBrandsBrandComponent} from './brands/brand/brand.component';
import {CutawayBrandsComponent} from './brands/brands.component';
import {CutawayComponent} from './cutaway.component';
import {CutawayRoutingModule} from './cutaway-routing.module';

@NgModule({
  declarations: [CutawayComponent, CutawayAuthorsComponent, CutawayBrandsComponent, CutawayBrandsBrandComponent],
  imports: [CommonModule, CutawayRoutingModule, PaginatorModule, ThumbnailModule, UtilsModule],
})
export class CutawayModule {}
