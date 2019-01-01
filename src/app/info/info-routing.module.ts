import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InfoSpecComponent } from './spec/spec.component';
import { InfoTextComponent } from './text/text.component';

const routes: Routes = [
  { path: 'spec', component: InfoSpecComponent },
  { path: 'text/:id', component: InfoTextComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InfoRoutingModule {}
