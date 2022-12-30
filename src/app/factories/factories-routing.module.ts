import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {FactoryItemsComponent} from './items/items.component';
import {FactoryComponent} from './factories.component';

const routes: Routes = [
  {
    path: ':id',
    title: $localize`Products`,
    children: [
      {path: 'items', component: FactoryItemsComponent},
      {path: '', component: FactoryComponent, pathMatch: 'full'},
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FactoriesRoutingModule {}
