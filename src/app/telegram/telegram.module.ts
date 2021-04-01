import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TelegramRoutingModule } from './telegram-routing.module';
import { TelegramComponent } from './telegram.component';
import { UtilsModule } from '../utils/utils.module';

@NgModule({
  declarations: [TelegramComponent],
  imports: [CommonModule, TelegramRoutingModule, UtilsModule]
})
export class TelegramModule {}
