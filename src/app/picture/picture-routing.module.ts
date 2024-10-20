import {Routes} from '@angular/router';

import {PicturePageComponent} from './picture-page.component';

export const routes: Routes = [
  {
    component: PicturePageComponent,
    path: ':identity',
  },
];
