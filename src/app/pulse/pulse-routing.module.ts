import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PulseComponent } from './pulse.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: PulseComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PulseRoutingModule { }
