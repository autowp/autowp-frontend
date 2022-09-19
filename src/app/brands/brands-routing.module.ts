import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrandsComponent } from './brands.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: BrandsComponent, title: $localize `All brands` }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BrandsRoutingModule { }
