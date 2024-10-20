import {Routes} from '@angular/router';

import {InfoSpecComponent} from './spec/spec.component';
import {InfoTextComponent} from './text/text.component';

export const routes: Routes = [
  {component: InfoSpecComponent, path: 'spec', title: $localize`Specs`},
  {component: InfoTextComponent, path: 'text/:id', title: $localize`Text history`},
];
