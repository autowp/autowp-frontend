import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {LeafletModule} from '@asymmetrik/ngx-leaflet';
import {UtilsModule} from '@utils/utils.module';

import {PaginatorModule} from '../paginator/paginator.module';
import {ThumbnailModule} from '../thumbnail/thumbnail.module';
import {FactoryComponent} from './factories.component';
import {FactoriesRoutingModule} from './factories-routing.module';
import {FactoryItemsComponent} from './items/items.component';

@NgModule({
  declarations: [FactoryComponent, FactoryItemsComponent],
  imports: [CommonModule, FactoriesRoutingModule, PaginatorModule, LeafletModule, ThumbnailModule, UtilsModule],
})
export class FactoriesModule {}
