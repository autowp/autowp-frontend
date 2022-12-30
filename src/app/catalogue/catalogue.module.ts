import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CatalogueIndexComponent} from './index/index.component';
import {CatalogueRoutingModule} from './catalogue-routing.module';
import {UtilsModule} from '../utils/utils.module';
import {ThumbnailModule} from '../thumbnail/thumbnail.module';
import {CatalogueRecentComponent} from './recent/recent.component';
import {PaginatorModule} from '../paginator/paginator.module';
import {CatalogueMixedComponent} from './mixed/mixed.component';
import {CatalogueConceptsComponent} from './concepts/concepts.component';
import {CatalogueMixedPictureComponent} from './mixed/picture/picture.component';
import {PictureModule} from '../picture/picture.module';
import {CommentsModule} from '../comments/comments.module';
import {CatalogueEnginesComponent} from './engines/engines.component';
import {CatalogueCarsComponent} from './cars/cars.component';
import {CatalogueVehiclesComponent} from './vehicles/vehicles.component';
import {CatalogueVehiclesGalleryComponent} from './vehicles/gallery/gallery.component';
import {CatalogueVehiclesPicturesComponent} from './vehicles/pictures/pictures.component';
import {CatalogueVehiclesPicturesPictureComponent} from './vehicles/pictures/picture/picture.component';
import {CatalogueService} from './catalogue-service';
import {CatalogueItemMenuComponent} from './item-menu/item-menu.component';
import {GalleryModule} from '../gallery/gallery.module';
import {CatalogueVehiclesSpecificationsComponent} from './vehicles/specifications/specifications.component';
import {CatalogueMostsComponent} from './mosts/mosts.component';
import {MostsModule} from '../mosts/mosts.module';
import {CatalogueMixedGalleryComponent} from './mixed/gallery/gallery.component';

export interface BrandPerspectivePageData {
  catname: string;
  perspective_id?: number;
  perspective_exclude_id?: string;
  page_id: number;
  title: string;
  picture_page: {
    id: number;
    breadcrumbs: string;
  };
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
