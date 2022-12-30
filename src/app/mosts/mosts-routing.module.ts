import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MostsComponent} from './mosts.component';

const routes: Routes = [
  {
    path: '',
    component: MostsComponent,
    title: $localize`Mostly`,
  },
  {
    path: ':rating_catname',
    component: MostsComponent,
    title: $localize`Mostly`,
  },
  {
    path: ':rating_catname/:type_catname',
    component: MostsComponent,
    title: $localize`Mostly`,
  },
  {
    path: ':rating_catname/:type_catname/:years_catname',
    component: MostsComponent,
    title: $localize`Mostly`,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MostsRoutingModule {}
