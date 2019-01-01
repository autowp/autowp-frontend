import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoriesCategoryItemComponent } from './category-item.component';
import { CategoriesCategoryPicturesComponent } from './category-pictures.component';
import { CategoriesIndexComponent } from './index.component';
import { CategoriesListItemComponent } from './list-item.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { UtilsModule } from '../utils/utils.module';
import { TranslateModule } from '@ngx-translate/core';
import { PaginatorModule } from '../paginator/paginator.module';
import { UserModule } from '../user/user.module';

@NgModule({
  declarations: [
    CategoriesCategoryItemComponent,
    CategoriesCategoryPicturesComponent,
    CategoriesIndexComponent,
    CategoriesListItemComponent
  ],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    NgbDropdownModule,
    UtilsModule,
    TranslateModule,
    PaginatorModule,
    UserModule
  ]
})
export class CategoriesModule {}
