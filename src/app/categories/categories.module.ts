import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';
import {UtilsModule} from '@utils/utils.module';

import {CommentsModule} from '../comments/comments.module';
import {GalleryModule} from '../gallery/gallery.module';
import {PaginatorModule} from '../paginator/paginator.module';
import {PictureModule} from '../picture/picture.module';
import {ThumbnailModule} from '../thumbnail/thumbnail.module';
import {UserModule} from '../user/user.module';
import {CategoriesRoutingModule} from './categories-routing.module';
import {CategoriesCategoryComponent} from './category/category.component';
import {CategoryGalleryComponent} from './category/gallery/gallery.component';
import {CategoriesCategoryItemComponent} from './category/item/item.component';
import {CategoryPictureComponent} from './category/picture/picture.component';
import {CategoriesCategoryPicturesComponent} from './category/pictures/pictures.component';
import {CategoriesIndexComponent} from './index.component';
import {CategoriesListItemComponent} from './list-item.component';
import {CategoriesService} from './service';

@NgModule({
  declarations: [
    CategoriesCategoryItemComponent,
    CategoriesCategoryPicturesComponent,
    CategoriesIndexComponent,
    CategoriesListItemComponent,
    CategoryPictureComponent,
    CategoryGalleryComponent,
    CategoriesCategoryComponent,
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
  providers: [CategoriesService],
})
export class CategoriesModule {}
