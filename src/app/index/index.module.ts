import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IndexBrandsComponent} from './brands/brands.component';
import {IndexComponent} from './index.component';
import {IndexCategoriesComponent} from './categories/categories.component';
import {IndexFactoriesComponent} from './factories/factories.component';
import {IndexSpecsCarsComponent} from './specs-cars/specs-cars.component';
import {ItemOfDayModule} from '../item-of-day/item-of-day.module';
import {UtilsModule} from '../utils/utils.module';
import {IndexRoutingModule} from './index-routing.module';
import {IndexTwinsComponent} from './twins/twins.component';
import {IndexPicturesComponent} from './pictures/pictures.component';
import {ThumbnailModule} from '../thumbnail/thumbnail.module';
import {UserModule} from '../user/user.module';
import {NgbPopoverModule, NgbTooltipModule} from '@ng-bootstrap/ng-bootstrap';
import {IndexBrandsBrandComponent} from './brands/brand/brand.component';
import {IndexCategoriesCategoryComponent} from './categories/category/category.component';
import {IndexFactoriesFactoryComponent} from './factories/factory/factory.component';
import {IndexDonateComponent} from './donate/donate.component';
import {MomentModule} from 'ngx-moment';

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
    IndexDonateComponent
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
        MomentModule
    ]
})
export class IndexModule {
}
