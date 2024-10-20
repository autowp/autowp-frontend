import {Routes} from '@angular/router';

import {CutawayAuthorsComponent} from './authors/authors.component';
import {CutawayBrandsBrandComponent} from './brands/brand/brand.component';
import {CutawayBrandsComponent} from './brands/brands.component';
import {CutawayComponent} from './cutaway.component';

export const routes: Routes = [
  {component: CutawayAuthorsComponent, path: 'authors', pathMatch: 'full', title: $localize`Cutaway`},
  {
    children: [
      {component: CutawayBrandsBrandComponent, path: ':brand', pathMatch: 'full', title: $localize`Cutaway`},
      {component: CutawayBrandsComponent, path: '', pathMatch: 'full', title: $localize`Cutaway`},
    ],
    path: 'brands',
  },
  {component: CutawayComponent, path: '', pathMatch: 'full', title: $localize`Cutaway`},
];
