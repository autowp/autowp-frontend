import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {BaseChartDirective, provideCharts, withDefaultRegisterables} from 'ng2-charts';

import {UserModule} from '../user/user.module';
import {PulseComponent} from './pulse.component';
import {PulseRoutingModule} from './pulse-routing.module';

@NgModule({
  declarations: [PulseComponent],
  imports: [CommonModule, PulseRoutingModule, BaseChartDirective, UserModule, HttpClientModule],
  providers: [provideCharts(withDefaultRegisterables())],
})
export class PulseModule {}
