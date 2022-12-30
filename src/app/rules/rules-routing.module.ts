import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RulesComponent} from './rules.component';

const routes: Routes = [{path: '', pathMatch: 'full', component: RulesComponent, title: $localize`Rules`}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RulesRoutingModule {}
