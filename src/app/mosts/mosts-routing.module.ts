import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {MostsComponent} from './mosts.component';

const routes: Routes = [
  {
    component: MostsComponent,
    path: '',
    title: $localize`Mostly`,
  },
  {
    component: MostsComponent,
    path: ':rating_catname',
    title: $localize`Mostly`,
  },
  {
    component: MostsComponent,
    path: ':rating_catname/:type_catname',
    title: $localize`Mostly`,
  },
  {
    component: MostsComponent,
    path: ':rating_catname/:type_catname/:years_catname',
    title: $localize`Mostly`,
  },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
})
export class MostsRoutingModule {}
