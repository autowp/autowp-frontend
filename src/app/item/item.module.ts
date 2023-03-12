import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ItemComponent} from './item/item.component';
import {RouterModule} from '@angular/router';
import {UtilsModule} from '@utils/utils.module';

@NgModule({
  declarations: [ItemComponent],
  imports: [CommonModule, RouterModule.forChild([]), UtilsModule],
  exports: [ItemComponent],
})
export class ItemModule {}
