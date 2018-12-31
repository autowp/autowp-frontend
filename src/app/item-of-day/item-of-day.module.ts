import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemOfDayComponent } from './item-of-day/item-of-day.component';
import { UserModule } from '../user/user.module';

@NgModule({
  declarations: [ItemOfDayComponent],
  imports: [
    CommonModule,
    UserModule
  ],
  exports: [
    ItemOfDayComponent
  ]
})
export class ItemOfDayModule { }
