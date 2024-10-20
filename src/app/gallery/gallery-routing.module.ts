import {Routes} from '@angular/router';

import {GalleryPageComponent} from './gallery-page.component';

export const routes: Routes = [
  {
    component: GalleryPageComponent,
    path: ':identity',
  },
];
