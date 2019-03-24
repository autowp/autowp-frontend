import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemOfDayComponent } from './item-of-day/item-of-day.component';
import { UserModule } from '../user/user.module';
import {TranslateModule} from '@ngx-translate/core';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [ItemOfDayComponent],
  imports: [
    CommonModule,
    UserModule,
    TranslateModule,
    RouterModule
  ],
  exports: [
    ItemOfDayComponent
  ]
})
export class ItemOfDayModule { }
