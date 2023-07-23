import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {FactoryComponent} from './factories.component';
import {FactoryItemsComponent} from './items/items.component';

const routes: Routes = [
  {
    children: [
      {component: FactoryItemsComponent, path: 'items'},
      {component: FactoryComponent, path: '', pathMatch: 'full'},
    ],
    path: ':id',
    title: $localize`Products`,
  },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
})
export class FactoriesRoutingModule {}
