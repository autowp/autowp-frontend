import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {UtilsModule} from '@utils/utils.module';

import {RulesComponent} from './rules.component';
import {RulesRoutingModule} from './rules-routing.module';

@NgModule({
  declarations: [RulesComponent],
  imports: [CommonModule, RulesRoutingModule, UtilsModule],
})
export class RulesModule {}
