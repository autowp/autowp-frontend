import {Routes} from '@angular/router';

import {moderGuard} from '../../moder.guard';
import {ModerTrafficComponent} from './traffic.component';
import {ModerTrafficWhitelistComponent} from './whitelist/whitelist.component';

export const routes: Routes = [
  {
    canActivate: [moderGuard],
    component: ModerTrafficWhitelistComponent,
    path: 'whitelist',
    title: $localize`Traffic`,
  },
  {
    canActivate: [moderGuard],
    component: ModerTrafficComponent,
    path: '',
    title: $localize`Traffic`,
  },
];
