import {Routes} from '@angular/router';

import {PolicyComponent} from './policy.component';

export const routes: Routes = [
  {component: PolicyComponent, path: '', pathMatch: 'full', title: $localize`Privacy Policy`},
];
