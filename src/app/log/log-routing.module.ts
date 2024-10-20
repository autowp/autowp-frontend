import {Routes} from '@angular/router';

import {LogComponent} from './log.component';

export const routes: Routes = [{component: LogComponent, path: '', pathMatch: 'full', title: $localize`Log of events`}];
