import {Routes} from '@angular/router';

import {MostsComponent} from './mosts.component';

export const routes: Routes = [
  {
    component: MostsComponent,
    path: '',
    title: $localize`Mostly`,
  },
  {
    component: MostsComponent,
    path: ':rating_catname',
    title: $localize`Mostly`,
  },
  {
    component: MostsComponent,
    path: ':rating_catname/:type_catname',
    title: $localize`Mostly`,
  },
  {
    component: MostsComponent,
    path: ':rating_catname/:type_catname/:years_catname',
    title: $localize`Mostly`,
  },
];
