import {Routes} from '@angular/router';

import {MascotsComponent} from './mascots.component';

export const routes: Routes = [{component: MascotsComponent, path: '', pathMatch: 'full', title: $localize`Mascots`}];
