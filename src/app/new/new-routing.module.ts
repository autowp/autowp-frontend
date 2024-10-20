import {Routes} from '@angular/router';

import {NewItemComponent} from './item/item.component';
import {NewComponent} from './new.component';

export const routes: Routes = [
  {
    component: NewComponent,
    path: ':date',
    title: $localize`New pictures`,
  },
  {
    component: NewComponent,
    path: ':date/:page',
    title: $localize`New pictures`,
  },
  {
    component: NewItemComponent,
    path: ':date/item/:item_id',
    title: $localize`New pictures`,
  },
  {
    component: NewItemComponent,
    path: ':date/item/:item_id/:page',
    title: $localize`New pictures`,
  },
  {
    component: NewComponent,
    path: '',
    title: $localize`New pictures`,
  },
];
