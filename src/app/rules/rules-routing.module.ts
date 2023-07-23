import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {RulesComponent} from './rules.component';

const routes: Routes = [{component: RulesComponent, path: '', pathMatch: 'full', title: $localize`Rules`}];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
})
export class RulesRoutingModule {}
