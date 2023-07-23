import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ChartComponent} from './chart.component';

const routes: Routes = [{component: ChartComponent, path: '', pathMatch: 'full', title: $localize`Charts`}];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
})
export class ChartRoutingModule {}
