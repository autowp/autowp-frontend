import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CategoriesRoutingModule} from './categories-routing.module';
import {CategoriesCategoryItemComponent} from './category/item/item.component';
import {CategoriesCategoryPicturesComponent} from './category/pictures/pictures.component';
import {CategoriesIndexComponent} from './index.component';
import {CategoriesListItemComponent} from './list-item.component';
import {NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';
import {UtilsModule} from '@utils/utils.module';
import {PaginatorModule} from '../paginator/paginator.module';
import {UserModule} from '../user/user.module';
import {CategoryPictureComponent} from './category/picture/picture.component';
import {PictureModule} from '../picture/picture.module';
import {CommentsModule} from '../comments/comments.module';
import {CategoryGalleryComponent} from './category/gallery/gallery.component';
import {CategoriesService} from './service';
import {GalleryModule} from '../gallery/gallery.module';
import {ThumbnailModule} from '../thumbnail/thumbnail.module';
import {CategoriesCategoryComponent} from './category/category.component';

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
