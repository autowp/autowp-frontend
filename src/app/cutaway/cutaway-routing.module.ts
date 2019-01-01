import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CutawayComponent } from './cutaway.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: CutawayComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CutawayRoutingModule {}
