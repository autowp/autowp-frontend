import {Routes} from '@angular/router';

import {DonateComponent} from './donate.component';
import {DonateLogComponent} from './log/log.component';
import {DonateSuccessComponent} from './success/success.component';
import {DonateVodSelectComponent} from './vod/select/select.component';
import {DonateVodSuccessComponent} from './vod/success/success.component';
import {DonateVodComponent} from './vod/vod.component';

export const routes: Routes = [
  {component: DonateLogComponent, path: 'log', title: $localize`Donate log`},
  {component: DonateSuccessComponent, path: 'success', title: $localize`Donate success`},
  {
    children: [
      {component: DonateVodSelectComponent, path: 'select'},
      {component: DonateVodSuccessComponent, path: 'success', title: $localize`Donate success`},
      {component: DonateVodComponent, path: ''},
    ],
    path: 'vod',
    title: $localize`Donate`,
  },
  {component: DonateComponent, path: '', title: $localize`Donate`},
];
