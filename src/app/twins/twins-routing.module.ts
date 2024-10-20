import {Routes} from '@angular/router';

import {TwinsComponent} from './twins.component';
import {TwinsGroupGalleryComponent} from './twins-group/gallery/twins-group-gallery.component';
import {TwinsGroupItemsComponent} from './twins-group/items/items.component';
import {TwinsGroupPicturesListComponent} from './twins-group/pictures/list/list.component';
import {TwinsGroupPictureComponent} from './twins-group/pictures/picture/picture.component';
import {TwinsGroupSpecificationsComponent} from './twins-group/specifications/specifications.component';
import {TwinsGroupComponent} from './twins-group/twins-group.component';

export const routes: Routes = [
  {
    children: [
      {
        children: [
          {
            component: TwinsGroupPictureComponent,
            path: ':identity',
          },
          {
            component: TwinsGroupPicturesListComponent,
            path: '',
            pathMatch: 'full',
          },
        ],
        path: 'pictures',
      },
      {
        children: [
          {
            component: TwinsGroupGalleryComponent,
            path: ':identity',
          },
          {
            component: TwinsGroupGalleryComponent,
            path: '',
            pathMatch: 'full',
          },
        ],
        path: 'gallery',
      },
      {component: TwinsGroupSpecificationsComponent, path: 'specifications'},
      {component: TwinsGroupItemsComponent, path: ''},
    ],
    component: TwinsGroupComponent,
    path: 'group/:group',
  },
  {component: TwinsComponent, path: ':brand', title: $localize`Twins`},
  {component: TwinsComponent, path: '', pathMatch: 'full', title: $localize`Twins`},
];
