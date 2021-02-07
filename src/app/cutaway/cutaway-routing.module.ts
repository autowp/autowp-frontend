import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CutawayComponent } from './cutaway.component';
import {CutawayAuthorsComponent} from './authors/authors.component';

const routes: Routes = [
  { path: 'authors', pathMatch: 'full', component: CutawayAuthorsComponent },
  { path: '', pathMatch: 'full', component: CutawayComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CutawayRoutingModule {}
