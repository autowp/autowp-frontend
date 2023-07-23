import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {TopViewComponent} from './top-view.component';

const routes: Routes = [{component: TopViewComponent, path: 'top-view', pathMatch: 'full', title: $localize`Top View`}];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
})
export class TopViewRoutingModule {}
