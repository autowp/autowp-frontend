import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CutawayRoutingModule} from './cutaway-routing.module';
import {CutawayComponent} from './cutaway.component';
import {PaginatorModule} from '../paginator/paginator.module';
import {ThumbnailModule} from '../thumbnail/thumbnail.module';
import {CutawayAuthorsComponent} from './authors/authors.component';
import {UtilsModule} from '@utils/utils.module';
import {CutawayBrandsComponent} from './brands/brands.component';
import {CutawayBrandsBrandComponent} from './brands/brand/brand.component';

@NgModule({
  declarations: [CutawayComponent, CutawayAuthorsComponent, CutawayBrandsComponent, CutawayBrandsBrandComponent],
  imports: [CommonModule, CutawayRoutingModule, PaginatorModule, ThumbnailModule, UtilsModule],
})
export class CutawayModule {}
