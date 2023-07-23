import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {LogComponent} from './log.component';

const routes: Routes = [{component: LogComponent, path: '', pathMatch: 'full', title: $localize`Log of events`}];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
})
export class LogRoutingModule {}
