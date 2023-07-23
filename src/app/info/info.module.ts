import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {UserModule} from '../user/user.module';
import {InfoRoutingModule} from './info-routing.module';
import {InfoSpecRowComponent} from './spec/row/row.component';
import {InfoSpecComponent} from './spec/spec.component';
import {InfoTextComponent} from './text/text.component';

@NgModule({
  declarations: [InfoSpecRowComponent, InfoSpecComponent, InfoTextComponent],
  imports: [CommonModule, InfoRoutingModule, UserModule],
})
export class InfoModule {}
