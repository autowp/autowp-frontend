import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MapComponent} from './map.component';

const routes: Routes = [{path: '', pathMatch: 'full', component: MapComponent, title: $localize`Map`}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MapRoutingModule {}
