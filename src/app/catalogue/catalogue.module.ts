import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CatalogueIndexComponent} from './index/index.component';
import {CatalogueRoutingModule} from './catalogue-routing.module';
import {UtilsModule} from '../utils/utils.module';
import {TranslateModule} from '@ngx-translate/core';
import {ThumbnailModule} from '../thumbnail/thumbnail.module';
import {CatalogueRecentComponent} from './recent/recent.component';
import {PaginatorModule} from '../paginator/paginator.module';

@NgModule({
  declarations: [
    CatalogueIndexComponent,
    CatalogueRecentComponent
  ],
  imports: [
    CommonModule,
    CatalogueRoutingModule,
    UtilsModule,
    TranslateModule,
    ThumbnailModule,
    PaginatorModule
  ]
})
export class CatalogueModule {}
