import {Routes} from '@angular/router';

import {IndexComponent} from './index.component';

export const routes: Routes = [{component: IndexComponent, path: '', pathMatch: 'full', title: $localize`Index page`}];
