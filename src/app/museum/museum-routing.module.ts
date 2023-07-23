import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {MuseumComponent} from './museum.component';

const routes: Routes = [{component: MuseumComponent, path: ':id'}];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
})
export class MuseumRoutingModule {}
