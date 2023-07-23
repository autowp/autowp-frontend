import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {NgbPopoverModule} from '@ng-bootstrap/ng-bootstrap';

import {BrandsComponent} from './brands.component';
import {BrandsRoutingModule} from './brands-routing.module';
import {BrandsItemComponent} from './item/item.component';

@NgModule({
  declarations: [BrandsComponent, BrandsItemComponent],
  imports: [CommonModule, BrandsRoutingModule, NgbPopoverModule],
})
export class BrandsModule {}
