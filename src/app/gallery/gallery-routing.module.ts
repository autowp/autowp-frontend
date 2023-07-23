import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {GalleryPageComponent} from './gallery-page.component';

const routes: Routes = [
  {
    component: GalleryPageComponent,
    path: ':identity',
  },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
})
export class GalleryRoutingModule {}
