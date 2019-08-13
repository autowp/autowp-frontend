import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CatalogueIndexComponent} from './index/index.component';
import {CatalogueRecentComponent} from './recent/recent.component';
import {CatalogueMixedComponent} from './mixed/mixed.component';
import {CatalogueOtherComponent} from './other/other.component';
import {CatalogueLogotypesComponent} from './logotypes/logotypes.component';

const routes: Routes = [
  {
    path: 'recent',
    component: CatalogueRecentComponent
  },
  {
    path: 'mixed',
    component: CatalogueMixedComponent
  },
  {
    path: 'other',
    component: CatalogueOtherComponent
  },
  {
    path: 'logotypes',
    component: CatalogueLogotypesComponent
  },
  {
    path: '',
    pathMatch: 'full',
    component: CatalogueIndexComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogueRoutingModule { }
