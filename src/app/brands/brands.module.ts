import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrandsRoutingModule } from './brands-routing.module';
import { BrandsComponent } from './brands.component';
import { BrandsItemComponent } from './item/item.component';
import { TranslateModule } from '@ngx-translate/core';
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [BrandsComponent, BrandsItemComponent],
  imports: [
    CommonModule,
    BrandsRoutingModule,
    TranslateModule,
    NgbPopoverModule
  ]
})
export class BrandsModule {}
