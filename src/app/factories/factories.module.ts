import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FactoriesRoutingModule } from './factories-routing.module';
import { FactoryComponent } from './factories.component';
import { FactoryItemsComponent } from './items/items.component';
import { PaginatorModule } from '../paginator/paginator.module';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { ThumbnailModule } from '../thumbnail/thumbnail.module';
import { UtilsModule } from '../utils/utils.module';

@NgModule({
  declarations: [FactoryComponent, FactoryItemsComponent],
  imports: [
    CommonModule,
    FactoriesRoutingModule,
    PaginatorModule,
    LeafletModule,
    ThumbnailModule,
    UtilsModule
  ]
})
export class FactoriesModule {}
