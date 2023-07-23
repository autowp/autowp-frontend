import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {PicturePageComponent} from './picture-page.component';

const routes: Routes = [
  {
    component: PicturePageComponent,
    path: ':identity',
  },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
})
export class PictureRoutingModule {}
