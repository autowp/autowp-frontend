import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {InfoSpecComponent} from './spec/spec.component';
import {InfoTextComponent} from './text/text.component';

const routes: Routes = [
  {component: InfoSpecComponent, path: 'spec', title: $localize`Specs`},
  {component: InfoTextComponent, path: 'text/:id', title: $localize`Text history`},
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
})
export class InfoRoutingModule {}
