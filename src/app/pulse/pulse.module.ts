import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PulseRoutingModule} from './pulse-routing.module';
import {PulseComponent} from './pulse.component';
import {NgChartsModule} from 'ng2-charts';
import {UserModule} from '../user/user.module';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [PulseComponent],
  imports: [CommonModule, PulseRoutingModule, NgChartsModule, UserModule, HttpClientModule],
})
export class PulseModule {}
