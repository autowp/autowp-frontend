import {Routes} from '@angular/router';

import {ChartComponent} from './chart.component';

export const routes: Routes = [{component: ChartComponent, path: '', pathMatch: 'full', title: $localize`Charts`}];
