import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InboxComponent } from './inbox.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: InboxComponent, title: $localize `Inbox` },
  { path: ':brand', component: InboxComponent, title: $localize `Inbox` },
  { path: ':brand/:date', component: InboxComponent, title: $localize `Inbox` }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InboxRoutingModule {}
