import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewComponent } from './new.component';
import { NewItemComponent } from './item/item.component';

const routes: Routes = [
  {
    path: ':date',
    component: NewComponent
  },
  {
    path: ':date/:page',
    component: NewComponent
  },
  {
    path: ':date/item/:item_id',
    component: NewItemComponent
  },
  {
    path: ':date/item/:item_id/:page',
    component: NewItemComponent
  },
  {
    path: '',
    component: NewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewRoutingModule { }
