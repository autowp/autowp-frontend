import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {NewComponent} from './new.component';
import {NewItemComponent} from './item/item.component';

const routes: Routes = [
  {
    path: ':date',
    component: NewComponent,
    title: $localize`New pictures`,
  },
  {
    path: ':date/:page',
    component: NewComponent,
    title: $localize`New pictures`,
  },
  {
    path: ':date/item/:item_id',
    component: NewItemComponent,
    title: $localize`New pictures`,
  },
  {
    path: ':date/item/:item_id/:page',
    component: NewItemComponent,
    title: $localize`New pictures`,
  },
  {
    path: '',
    component: NewComponent,
    title: $localize`New pictures`,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewRoutingModule {}
