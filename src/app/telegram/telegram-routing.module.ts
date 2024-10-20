import {Routes} from '@angular/router';

import {TelegramComponent} from './telegram.component';

export const routes: Routes = [{component: TelegramComponent, path: '', pathMatch: 'full', title: $localize`Telegram`}];
