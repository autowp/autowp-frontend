import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PolicyRoutingModule } from './policy-routing.module';
import { PolicyComponent } from './policy.component';
import { UtilsModule } from '../utils/utils.module';

@NgModule({
  declarations: [PolicyComponent],
  imports: [CommonModule, PolicyRoutingModule, UtilsModule]
})
export class PolicyModule {}
