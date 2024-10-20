import {Routes} from '@angular/router';

import {moderGuard} from '../../moder.guard';
import {ModerPicturesItemAreaComponent} from './item/area/area.component';
import {ModerPicturesItemCropComponent} from './item/crop/crop.component';
import {ModerPicturesItemComponent} from './item/item.component';
import {ModerPicturesItemMoveComponent} from './item/move/move.component';
import {ModerPicturesItemPlaceComponent} from './item/place/place.component';
import {ModerPicturesComponent} from './pictures.component';

export const routes: Routes = [
  {
    children: [
      {
        canActivate: [moderGuard],
        component: ModerPicturesItemAreaComponent,
        path: 'area',
        title: $localize`Cropper`,
      },
      {
        canActivate: [moderGuard],
        component: ModerPicturesItemCropComponent,
        path: 'crop',
        title: $localize`Cropper`,
      },
      {
        canActivate: [moderGuard],
        component: ModerPicturesItemMoveComponent,
        path: 'move',
        title: $localize`Move picture`,
      },
      {
        canActivate: [moderGuard],
        component: ModerPicturesItemPlaceComponent,
        path: 'place',
        title: $localize`Location`,
      },
      {
        canActivate: [moderGuard],
        component: ModerPicturesItemComponent,
        path: '',
      },
    ],
    path: ':id',
  },
  {
    canActivate: [moderGuard],
    component: ModerPicturesComponent,
    path: '',
    title: $localize`Pictures`,
  },
];
