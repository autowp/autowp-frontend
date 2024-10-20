import {Routes} from '@angular/router';

import {RulesComponent} from './rules.component';

export const routes: Routes = [{component: RulesComponent, path: '', pathMatch: 'full', title: $localize`Rules`}];
