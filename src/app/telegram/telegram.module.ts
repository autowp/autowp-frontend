import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {UtilsModule} from '@utils/utils.module';

import {TelegramComponent} from './telegram.component';
import {TelegramRoutingModule} from './telegram-routing.module';

@NgModule({
  declarations: [TelegramComponent],
  imports: [CommonModule, TelegramRoutingModule, UtilsModule],
})
export class TelegramModule {}
