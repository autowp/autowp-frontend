import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {PulseComponent} from './pulse.component';

const routes: Routes = [{component: PulseComponent, path: '', pathMatch: 'full', title: $localize`Pulse`}];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
})
export class PulseRoutingModule {}
