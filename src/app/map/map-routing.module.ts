import {Routes} from '@angular/router';

import {MapComponent} from './map.component';

export const routes: Routes = [{component: MapComponent, path: '', pathMatch: 'full', title: $localize`Map`}];
