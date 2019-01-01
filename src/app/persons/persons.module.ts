import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonsRoutingModule } from './persons-routing.module';
import { PersonsComponent } from './persons.component';
import { PersonsAuthorsComponent } from './authors/authors.component';
import { PersonsPersonComponent } from './person/person.component';
import { PaginatorModule } from '../paginator/paginator.module';
import { ItemModule } from '../item/item.module';
import { TranslateModule } from '@ngx-translate/core';
import { ThumbnailModule } from '../thumbnail/thumbnail.module';
import { UtilsModule } from '../utils/utils.module';

@NgModule({
  declarations: [
    PersonsComponent,
    PersonsAuthorsComponent,
    PersonsPersonComponent
  ],
  imports: [
    CommonModule,
    PersonsRoutingModule,
    PaginatorModule,
    ItemModule,
    TranslateModule,
    ThumbnailModule,
    UtilsModule
  ]
})
export class PersonsModule {}
