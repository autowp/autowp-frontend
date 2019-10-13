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
import {CatalogueListItemComponent} from './list-item/list-item.component';
import {CatalogueEnginesComponent} from './engines/engines.component';
import {CatalogueEnginesPicturesComponent} from './engines/pictures/pictures.component';
import {CatalogueEnginesPicturesPictureComponent} from './engines/pictures/picture/picture.component';
import {CatalogueEnginesGalleryComponent} from './engines/gallery/gallery.component';
import {CatalogueCarsComponent} from './cars/cars.component';
import {CatalogueVehiclesComponent} from './vehicles/vehicles.component';
import {CatalogueVehiclesGalleryComponent} from './vehicles/gallery/gallery.component';
import {CatalogueVehiclesPicturesComponent} from './vehicles/pictures/pictures.component';
import {CatalogueVehiclesPicturesPictureComponent} from './vehicles/pictures/picture/picture.component';
import {ItemModule} from '../item/item.module';
import {CatalogueService} from './catalogue-service';

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
    CatalogueListItemComponent,
    CatalogueEnginesComponent,
    CatalogueEnginesPicturesComponent,
    CatalogueEnginesPicturesPictureComponent,
    CatalogueEnginesGalleryComponent,
    CatalogueCarsComponent,
    CatalogueVehiclesComponent,
    CatalogueVehiclesGalleryComponent,
    CatalogueVehiclesPicturesComponent,
    CatalogueVehiclesPicturesPictureComponent
  ],
  imports: [
    CommonModule,
    CatalogueRoutingModule,
    UtilsModule,
    TranslateModule,
    ThumbnailModule,
    PaginatorModule,
    PictureModule,
    CommentsModule,
    ItemModule
  ],
  providers: [
    CatalogueService
  ]
})
export class CatalogueModule {}
