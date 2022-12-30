import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {InfoSpecComponent} from './spec/spec.component';
import {InfoTextComponent} from './text/text.component';

const routes: Routes = [
  {path: 'spec', component: InfoSpecComponent, title: $localize`Specs`},
  {path: 'text/:id', component: InfoTextComponent, title: $localize`Text history`},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InfoRoutingModule {}
