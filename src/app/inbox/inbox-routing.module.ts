import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {InboxComponent} from './inbox.component';

const routes: Routes = [
  {component: InboxComponent, path: '', pathMatch: 'full', title: $localize`Inbox`},
  {component: InboxComponent, path: ':brand', title: $localize`Inbox`},
  {component: InboxComponent, path: ':brand/:date', title: $localize`Inbox`},
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
})
export class InboxRoutingModule {}
