import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {UtilsModule} from '@utils/utils.module';

import {PolicyComponent} from './policy.component';
import {PolicyRoutingModule} from './policy-routing.module';

@NgModule({
  declarations: [PolicyComponent],
  imports: [CommonModule, PolicyRoutingModule, UtilsModule],
})
export class PolicyModule {}
