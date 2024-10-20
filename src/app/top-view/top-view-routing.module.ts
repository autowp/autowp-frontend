import {Routes} from '@angular/router';

import {TopViewComponent} from './top-view.component';

export const routes: Routes = [
  {component: TopViewComponent, path: 'top-view', pathMatch: 'full', title: $localize`Top View`},
];
