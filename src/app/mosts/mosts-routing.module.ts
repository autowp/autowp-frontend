import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MostsComponent } from './mosts.component';

const routes: Routes = [
  {
    path: '',
    component: MostsComponent
  },
  {
    path: ':rating_catname',
    component: MostsComponent
  },
  {
    path: ':rating_catname/:type_catname',
    component: MostsComponent
  },
  {
    path: ':rating_catname/:type_catname/:years_catname',
    component: MostsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MostsRoutingModule {}
