import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {NgChartsModule} from 'ng2-charts';

import {ChartComponent} from './chart.component';
import {ChartRoutingModule} from './chart-routing.module';

@NgModule({
  declarations: [ChartComponent],
  imports: [CommonModule, ChartRoutingModule, NgChartsModule],
})
export class ChartModule {}
