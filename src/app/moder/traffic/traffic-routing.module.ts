import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ModerTrafficWhitelistComponent} from './whitelist/whitelist.component';
import {ModerTrafficComponent} from './traffic.component';
import {ModerGuard} from '../../moder.guard';

const routes: Routes = [
  {
    path: 'whitelist',
    component: ModerTrafficWhitelistComponent,
    canActivate: [ModerGuard],
    title: $localize`Traffic`,
  },
  {
    path: '',
    component: ModerTrafficComponent,
    canActivate: [ModerGuard],
    title: $localize`Traffic`,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrafficRoutingModule {}
