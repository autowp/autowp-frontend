import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MascotsComponent } from './mascots.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: MascotsComponent, title: $localize `Mascots` }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MascotsRoutingModule {}
