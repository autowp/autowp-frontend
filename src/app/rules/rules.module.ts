import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RulesRoutingModule } from './rules-routing.module';
import { RulesComponent } from './rules.component';
import { UtilsModule } from '../utils/utils.module';

@NgModule({
  declarations: [RulesComponent],
  imports: [CommonModule, RulesRoutingModule, UtilsModule]
})
export class RulesModule {}
