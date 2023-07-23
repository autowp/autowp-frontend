import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {UtilsModule} from '@utils/utils.module';

import {CommentsModule} from '../comments/comments.module';
import {GalleryModule} from '../gallery/gallery.module';
import {MostsModule} from '../mosts/mosts.module';
import {PaginatorModule} from '../paginator/paginator.module';
import {PictureModule} from '../picture/picture.module';
import {ThumbnailModule} from '../thumbnail/thumbnail.module';
import {CatalogueCarsComponent} from './cars/cars.component';
import {CatalogueRoutingModule} from './catalogue-routing.module';
import {CatalogueService} from './catalogue-service';
import {CatalogueConceptsComponent} from './concepts/concepts.component';
import {CatalogueEnginesComponent} from './engines/engines.component';
import {CatalogueIndexComponent} from './index/index.component';
import {CatalogueItemMenuComponent} from './item-menu/item-menu.component';
import {CatalogueMixedGalleryComponent} from './mixed/gallery/gallery.component';
import {CatalogueMixedComponent} from './mixed/mixed.component';
import {CatalogueMixedPictureComponent} from './mixed/picture/picture.component';
import {CatalogueMostsComponent} from './mosts/mosts.component';
import {CatalogueRecentComponent} from './recent/recent.component';
import {CatalogueVehiclesGalleryComponent} from './vehicles/gallery/gallery.component';
import {CatalogueVehiclesPicturesPictureComponent} from './vehicles/pictures/picture/picture.component';
import {CatalogueVehiclesPicturesComponent} from './vehicles/pictures/pictures.component';
import {CatalogueVehiclesSpecificationsComponent} from './vehicles/specifications/specifications.component';
import {CatalogueVehiclesComponent} from './vehicles/vehicles.component';

export interface BrandPerspectivePageData {
  catname: string;
  page_id: number;
  perspective_exclude_id?: string;
  perspective_id?: number;
  picture_page: {
    breadcrumbs: string;
    id: number;
  };
  title: string;
}

@NgModule({
  declarations: [
    CatalogueIndexComponent,
    CatalogueRecentComponent,
    CatalogueMixedComponent,
    CatalogueMixedPictureComponent,
    CatalogueConceptsComponent,
    CatalogueEnginesComponent,
    CatalogueCarsComponent,
    CatalogueVehiclesComponent,
    CatalogueVehiclesGalleryComponent,
    CatalogueVehiclesPicturesComponent,
    CatalogueVehiclesPicturesPictureComponent,
    CatalogueItemMenuComponent,
    CatalogueVehiclesSpecificationsComponent,
    CatalogueMostsComponent,
    CatalogueMixedGalleryComponent,
  ],
  imports: [
    CommonModule,
    CatalogueRoutingModule,
    UtilsModule,
    ThumbnailModule,
    PaginatorModule,
    PictureModule,
    CommentsModule,
    GalleryModule,
    MostsModule,
  ],
  providers: [CatalogueService],
})
export class CatalogueModule {}
