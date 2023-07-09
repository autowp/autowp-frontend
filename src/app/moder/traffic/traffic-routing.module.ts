import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ModerTrafficWhitelistComponent} from './whitelist/whitelist.component';
import {ModerTrafficComponent} from './traffic.component';
import {moderGuard} from '../../moder.guard';

const routes: Routes = [
  {
    path: 'whitelist',
    component: ModerTrafficWhitelistComponent,
    canActivate: [moderGuard],
    title: $localize`Traffic`,
  },
  {
    path: '',
    component: ModerTrafficComponent,
    canActivate: [moderGuard],
    title: $localize`Traffic`,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrafficRoutingModule {}
