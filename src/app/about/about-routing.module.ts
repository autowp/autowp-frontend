import {Routes} from '@angular/router';

import {AboutComponent} from './about.component';

export const routes: Routes = [{component: AboutComponent, path: '', pathMatch: 'full', title: $localize`About us`}];
