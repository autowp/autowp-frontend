import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CutawayComponent } from './cutaway.component';
import {CutawayAuthorsComponent} from './authors/authors.component';
import {CutawayBrandsComponent} from './brands/brands.component';
import {CutawayBrandsBrandComponent} from './brands/brand/brand.component';

const routes: Routes = [
  { path: 'authors', pathMatch: 'full', component: CutawayAuthorsComponent, title: $localize `Cutaway` },
  { path: 'brands', children: [
    { path: ':brand', pathMatch: 'full', component: CutawayBrandsBrandComponent, title: $localize `Cutaway` },
    { path: '', pathMatch: 'full', component: CutawayBrandsComponent, title: $localize `Cutaway`}
  ] },
  { path: '', pathMatch: 'full', component: CutawayComponent, title: $localize `Cutaway` }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CutawayRoutingModule {}
