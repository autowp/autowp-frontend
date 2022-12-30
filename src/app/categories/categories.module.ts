import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CategoriesRoutingModule} from './categories-routing.module';
import {CategoriesCategoryItemComponent} from './category-item.component';
import {CategoriesCategoryPicturesComponent} from './category-pictures.component';
import {CategoriesIndexComponent} from './index.component';
import {CategoriesListItemComponent} from './list-item.component';
import {NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';
import {UtilsModule} from '../utils/utils.module';
import {PaginatorModule} from '../paginator/paginator.module';
import {UserModule} from '../user/user.module';
import {CategoryPictureComponent} from './category-picture/category-picture.component';
import {PictureModule} from '../picture/picture.module';
import {CommentsModule} from '../comments/comments.module';
import {CategoryGalleryComponent} from './category-gallery/category-gallery.component';
import {CatagoriesService} from './service';
import {GalleryModule} from '../gallery/gallery.module';
import {ThumbnailModule} from '../thumbnail/thumbnail.module';

@NgModule({
  declarations: [
    CategoriesCategoryItemComponent,
    CategoriesCategoryPicturesComponent,
    CategoriesIndexComponent,
    CategoriesListItemComponent,
    CategoryPictureComponent,
    CategoryGalleryComponent,
  ],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    NgbDropdownModule,
    UtilsModule,
    PaginatorModule,
    UserModule,
    PictureModule,
    CommentsModule,
    GalleryModule,
    ThumbnailModule,
  ],
  providers: [CatagoriesService],
})
export class CategoriesModule {}
