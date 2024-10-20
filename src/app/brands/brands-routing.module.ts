import {Routes} from '@angular/router';

import {BrandsComponent} from './brands.component';

export const routes: Routes = [{component: BrandsComponent, path: '', pathMatch: 'full', title: $localize`All brands`}];
