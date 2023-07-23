import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {MapComponent} from './map.component';

const routes: Routes = [{component: MapComponent, path: '', pathMatch: 'full', title: $localize`Map`}];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
})
export class MapRoutingModule {}
