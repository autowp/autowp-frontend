import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonsRoutingModule } from './persons-routing.module';
import { PersonsComponent } from './persons.component';
import { PersonsPersonComponent } from './person/person.component';
import { PaginatorModule } from '../paginator/paginator.module';
import { TranslateModule } from '@ngx-translate/core';
import { ThumbnailModule } from '../thumbnail/thumbnail.module';
import { UtilsModule } from '../utils/utils.module';
import {PersonsPersonPictureComponent} from './person/picture/picture.component';
import {CommentsModule} from '../comments/comments.module';
import {PictureModule} from '../picture/picture.module';
import {PersonsPersonGalleryComponent} from './person/gallery/gallery.component';
import {GalleryModule} from '../gallery/gallery.module';
import {PersonsPersonAuthorGalleryComponent} from './person/author/gallery/gallery.component';
import {PersonsPersonAuthorPictureComponent} from './person/author/picture/picture.component';

@NgModule({
  declarations: [
    PersonsComponent,
    PersonsPersonComponent,
    PersonsPersonPictureComponent,
    PersonsPersonGalleryComponent,
    PersonsPersonAuthorGalleryComponent,
    PersonsPersonAuthorPictureComponent
  ],
  imports: [
    CommonModule,
    PersonsRoutingModule,
    PaginatorModule,
    TranslateModule,
    ThumbnailModule,
    UtilsModule,
    CommentsModule,
    PictureModule,
    GalleryModule
  ]
})
export class PersonsModule {}
