import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChartRoutingModule} from './chart-routing.module';
import {ChartComponent} from './chart.component';
import {NgChartsModule} from 'ng2-charts';

@NgModule({
  declarations: [ChartComponent],
  imports: [CommonModule, ChartRoutingModule, NgChartsModule],
})
export class ChartModule {}
