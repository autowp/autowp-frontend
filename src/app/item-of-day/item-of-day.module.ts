import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {UserModule} from '../user/user.module';
import {ItemOfDayComponent} from './item-of-day/item-of-day.component';

@NgModule({
  declarations: [ItemOfDayComponent],
  exports: [ItemOfDayComponent],
  imports: [CommonModule, UserModule, RouterModule],
})
export class ItemOfDayModule {}
