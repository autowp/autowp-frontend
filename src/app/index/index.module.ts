import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {NgbPopoverModule, NgbTooltipModule} from '@ng-bootstrap/ng-bootstrap';
import {UtilsModule} from '@utils/utils.module';

import {ItemOfDayModule} from '../item-of-day/item-of-day.module';
import {ThumbnailModule} from '../thumbnail/thumbnail.module';
import {UserModule} from '../user/user.module';
import {IndexBrandsBrandComponent} from './brands/brand/brand.component';
import {IndexBrandsComponent} from './brands/brands.component';
import {IndexCategoriesComponent} from './categories/categories.component';
import {IndexCategoriesCategoryComponent} from './categories/category/category.component';
import {IndexDonateComponent} from './donate/donate.component';
import {IndexFactoriesComponent} from './factories/factories.component';
import {IndexFactoriesFactoryComponent} from './factories/factory/factory.component';
import {IndexComponent} from './index.component';
import {IndexRoutingModule} from './index-routing.module';
import {IndexPicturesComponent} from './pictures/pictures.component';
import {IndexSpecsCarsComponent} from './specs-cars/specs-cars.component';
import {IndexTwinsComponent} from './twins/twins.component';

@NgModule({
  declarations: [
    IndexComponent,
    IndexBrandsComponent,
    IndexBrandsBrandComponent,
    IndexCategoriesComponent,
    IndexCategoriesCategoryComponent,
    IndexFactoriesComponent,
    IndexFactoriesFactoryComponent,
    IndexSpecsCarsComponent,
    IndexTwinsComponent,
    IndexPicturesComponent,
    IndexDonateComponent,
  ],
  imports: [
    CommonModule,
    UtilsModule,
    ItemOfDayModule,
    IndexRoutingModule,
    ThumbnailModule,
    UserModule,
    NgbPopoverModule,
    NgbTooltipModule,
  ],
})
export class IndexModule {}
