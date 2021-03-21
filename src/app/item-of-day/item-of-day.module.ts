import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemOfDayComponent } from './item-of-day/item-of-day.component';
import { UserModule } from '../user/user.module';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [ItemOfDayComponent],
  imports: [
    CommonModule,
    UserModule,
    RouterModule
  ],
  exports: [
    ItemOfDayComponent
  ]
})
export class ItemOfDayModule { }
