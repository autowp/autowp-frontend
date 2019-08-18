import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CatalogueIndexComponent} from './index/index.component';
import {CatalogueRoutingModule} from './catalogue-routing.module';
import {UtilsModule} from '../utils/utils.module';
import {TranslateModule} from '@ngx-translate/core';
import {ThumbnailModule} from '../thumbnail/thumbnail.module';
import {CatalogueRecentComponent} from './recent/recent.component';
import {PaginatorModule} from '../paginator/paginator.module';
import {CatalogueOtherComponent} from './other/other.component';
import {CatalogueMixedComponent} from './mixed/mixed.component';
import {CatalogueLogotypesComponent} from './logotypes/logotypes.component';
import {CatalogueConceptsComponent} from './concepts/concepts.component';
import {CatalogueMixedPictureComponent} from './mixed/picture/picture.component';
import {PictureModule} from '../picture/picture.module';
import {CommentsModule} from '../comments/comments.module';
import {CatalogueOtherPictureComponent} from './other/picture/picture.component';
import {CatalogueLogotypesPictureComponent} from './logotypes/picture/picture.component';
import {CatalogueConceptsListItemComponent} from './concepts/list-item/list-item.component';

@NgModule({
  declarations: [
    CatalogueIndexComponent,
    CatalogueRecentComponent,
    CatalogueOtherComponent,
    CatalogueOtherPictureComponent,
    CatalogueMixedComponent,
    CatalogueMixedPictureComponent,
    CatalogueLogotypesComponent,
    CatalogueLogotypesPictureComponent,
    CatalogueConceptsComponent,
    CatalogueConceptsListItemComponent
  ],
  imports: [
    CommonModule,
    CatalogueRoutingModule,
    UtilsModule,
    TranslateModule,
    ThumbnailModule,
    PaginatorModule,
    PictureModule,
    CommentsModule
  ]
})
export class CatalogueModule {}
