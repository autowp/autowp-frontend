import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CatalogueIndexComponent} from './index/index.component';

const routes: Routes = [
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
