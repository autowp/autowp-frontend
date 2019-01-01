import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InfoRoutingModule } from './info-routing.module';
import { InfoSpecRowComponent } from './spec/row/row.component';
import { InfoSpecComponent } from './spec/spec.component';
import { InfoTextComponent } from './text/text.component';
import { UserModule } from '../user/user.module';

@NgModule({
  declarations: [InfoSpecRowComponent, InfoSpecComponent, InfoTextComponent],
  imports: [CommonModule, InfoRoutingModule, UserModule]
})
export class InfoModule {}
