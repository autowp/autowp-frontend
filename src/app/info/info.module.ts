import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InfoRoutingModule } from './info-routing.module';
import { InfoSpecRowComponent } from './spec/row/row.component';
import { InfoSpecComponent } from './spec/spec.component';
import { InfoTextComponent } from './text/text.component';
import { UserModule } from '../user/user.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [InfoSpecRowComponent, InfoSpecComponent, InfoTextComponent],
  imports: [CommonModule, InfoRoutingModule, UserModule, TranslateModule]
})
export class InfoModule {}
