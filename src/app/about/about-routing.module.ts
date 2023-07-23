import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AboutComponent} from './about.component';

const routes: Routes = [{component: AboutComponent, path: '', pathMatch: 'full', title: $localize`About us`}];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
})
export class AboutRoutingModule {}
