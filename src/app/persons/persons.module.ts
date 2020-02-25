import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonsRoutingModule } from './persons-routing.module';
import { PersonsComponent } from './persons.component';
import { PersonsPersonComponent } from './person/person.component';
import { PaginatorModule } from '../paginator/paginator.module';
import { ItemModule } from '../item/item.module';
import { TranslateModule } from '@ngx-translate/core';
import { ThumbnailModule } from '../thumbnail/thumbnail.module';
import { UtilsModule } from '../utils/utils.module';
import {CatalogueModule} from '../catalogue/catalogue.module';
import {PersonsPersonPictureComponent} from './person/picture/picture.component';
import {CommentsModule} from '../comments/comments.module';
import {PictureModule} from '../picture/picture.module';
import {PersonsPersonGalleryComponent} from './person/gallery/gallery.component';
import {GalleryModule} from '../gallery/gallery.module';

@NgModule({
  declarations: [
    PersonsComponent,
    PersonsPersonComponent,
    PersonsPersonPictureComponent,
    PersonsPersonGalleryComponent
  ],
  imports: [
    CommonModule,
    PersonsRoutingModule,
    PaginatorModule,
    ItemModule,
    TranslateModule,
    ThumbnailModule,
    UtilsModule,
    CatalogueModule,
    CommentsModule,
    PictureModule,
    GalleryModule
  ]
})
export class PersonsModule {}
