import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemComponent } from './item/item.component';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { UtilsModule } from '../utils/utils.module';
import {ItemHeaderComponent} from './item-header/item-header.component';

@NgModule({
  declarations: [ItemComponent, ItemHeaderComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([]),
    TranslateModule,
    UtilsModule
  ],
  exports: [ItemComponent, ItemHeaderComponent]
})
export class ItemModule { }
