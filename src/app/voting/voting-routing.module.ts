import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {VotingComponent} from './voting.component';

const routes: Routes = [{component: VotingComponent, path: ':id'}];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
})
export class VotingRoutingModule {}
