import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {GalleryPageComponent} from './gallery-page.component';

const routes: Routes = [
  {
    path: ':identity',
    component: GalleryPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GalleryRoutingModule {}
