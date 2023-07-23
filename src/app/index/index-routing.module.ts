import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {IndexComponent} from './index.component';

const routes: Routes = [{component: IndexComponent, path: '', pathMatch: 'full', title: $localize`Index page`}];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
})
export class IndexRoutingModule {}
