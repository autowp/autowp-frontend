import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PicturePageComponent} from './picture-page.component';

const routes: Routes = [
  {
    path: ':identity',
    component: PicturePageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PictureRoutingModule { }
