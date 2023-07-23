import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {BrandsComponent} from './brands.component';

const routes: Routes = [{component: BrandsComponent, path: '', pathMatch: 'full', title: $localize`All brands`}];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
})
export class BrandsRoutingModule {}
