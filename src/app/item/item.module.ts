import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {UtilsModule} from '@utils/utils.module';

import {ItemComponent} from './item/item.component';

@NgModule({
  declarations: [ItemComponent],
  exports: [ItemComponent],
  imports: [CommonModule, RouterModule.forChild([]), UtilsModule],
})
export class ItemModule {}
