import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InboxComponent } from './inbox.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: InboxComponent },
  { path: ':brand', component: InboxComponent },
  { path: ':brand/:date', component: InboxComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InboxRoutingModule {}
