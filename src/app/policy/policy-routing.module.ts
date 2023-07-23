import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {PolicyComponent} from './policy.component';

const routes: Routes = [{component: PolicyComponent, path: '', pathMatch: 'full', title: $localize`Privacy Policy`}];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
})
export class PolicyRoutingModule {}
