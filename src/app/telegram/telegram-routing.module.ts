import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {TelegramComponent} from './telegram.component';

const routes: Routes = [{component: TelegramComponent, path: '', pathMatch: 'full', title: $localize`Telegram`}];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
})
export class TelegramRoutingModule {}
