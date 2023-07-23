import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {moderGuard} from '../../moder.guard';
import {ModerTrafficComponent} from './traffic.component';
import {ModerTrafficWhitelistComponent} from './whitelist/whitelist.component';

const routes: Routes = [
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

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
})
export class TrafficRoutingModule {}
