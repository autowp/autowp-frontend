import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {UtilsModule} from '@utils/utils.module';

import {CommentsModule} from '../comments/comments.module';
import {GalleryModule} from '../gallery/gallery.module';
import {PaginatorModule} from '../paginator/paginator.module';
import {PictureModule} from '../picture/picture.module';
import {ThumbnailModule} from '../thumbnail/thumbnail.module';
import {PersonsPersonAuthorGalleryComponent} from './person/author/gallery/gallery.component';
import {PersonsPersonAuthorPictureComponent} from './person/author/picture/picture.component';
import {PersonsPersonGalleryComponent} from './person/gallery/gallery.component';
import {PersonsPersonInfoComponent} from './person/info/info.component';
import {PersonsPersonComponent} from './person/person.component';
import {PersonsPersonPictureComponent} from './person/picture/picture.component';
import {PersonsComponent} from './persons.component';
import {PersonsRoutingModule} from './persons-routing.module';

@NgModule({
  declarations: [
    PersonsComponent,
    PersonsPersonComponent,
    PersonsPersonInfoComponent,
    PersonsPersonPictureComponent,
    PersonsPersonGalleryComponent,
    PersonsPersonAuthorGalleryComponent,
    PersonsPersonAuthorPictureComponent,
  ],
  imports: [
    CommonModule,
    PersonsRoutingModule,
    PaginatorModule,
    ThumbnailModule,
    UtilsModule,
    CommentsModule,
    PictureModule,
    GalleryModule,
  ],
})
export class PersonsModule {}
