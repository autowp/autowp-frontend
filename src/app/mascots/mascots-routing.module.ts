import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {MascotsComponent} from './mascots.component';

const routes: Routes = [{component: MascotsComponent, path: '', pathMatch: 'full', title: $localize`Mascots`}];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
})
export class MascotsRoutingModule {}
