import {Routes} from '@angular/router';

import {PulseComponent} from './pulse.component';

export const routes: Routes = [{component: PulseComponent, path: '', pathMatch: 'full', title: $localize`Pulse`}];
