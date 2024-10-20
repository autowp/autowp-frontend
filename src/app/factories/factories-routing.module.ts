import {Routes} from '@angular/router';

import {FactoryComponent} from './factories.component';
import {FactoryItemsComponent} from './items/items.component';

export const routes: Routes = [
  {
    children: [
      {component: FactoryItemsComponent, path: 'items'},
      {component: FactoryComponent, path: '', pathMatch: 'full'},
    ],
    path: ':id',
    title: $localize`Products`,
  },
];
