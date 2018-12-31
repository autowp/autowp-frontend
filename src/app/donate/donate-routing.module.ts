import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DonateLogComponent } from './log/log.component';
import { DonateSuccessComponent } from './success/success.component';
import { DonateVodSelectComponent } from './vod/select/select.component';
import { DonateVodSuccessComponent } from './vod/success/success.component';
import { DonateVodComponent } from './vod/vod.component';
import { DonateComponent } from './donate.component';

const routes: Routes = [
  { path: 'log', component: DonateLogComponent },
  { path: 'success', component: DonateSuccessComponent },
  {
    path: 'vod',
    children: [
      { path: 'select', component: DonateVodSelectComponent },
      { path: 'success', component: DonateVodSuccessComponent },
      { path: '', component: DonateVodComponent }
    ]
  },
  { path: '', component: DonateComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DonateRoutingModule { }
