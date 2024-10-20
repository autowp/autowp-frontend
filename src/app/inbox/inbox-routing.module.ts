import {Routes} from '@angular/router';

import {InboxComponent} from './inbox.component';

export const routes: Routes = [
  {component: InboxComponent, path: '', pathMatch: 'full', title: $localize`Inbox`},
  {component: InboxComponent, path: ':brand', title: $localize`Inbox`},
  {component: InboxComponent, path: ':brand/:date', title: $localize`Inbox`},
];
