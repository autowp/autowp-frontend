import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {TopViewComponent} from './top-view.component';

const routes: Routes = [{path: 'top-view', pathMatch: 'full', component: TopViewComponent, title: $localize`Top View`}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TopViewRoutingModule {}
