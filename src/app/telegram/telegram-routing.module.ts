import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TelegramComponent } from './telegram.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: TelegramComponent, title: $localize `Telegram` }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TelegramRoutingModule {}
