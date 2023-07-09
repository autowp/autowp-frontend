import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ModerPicturesComponent} from './pictures.component';
import {ModerPicturesItemComponent} from './item/item.component';
import {ModerPicturesItemMoveComponent} from './item/move/move.component';
import {ModerPicturesItemCropComponent} from './item/crop/crop.component';
import {ModerPicturesItemAreaComponent} from './item/area/area.component';
import {ModerPicturesItemPlaceComponent} from './item/place/place.component';
import {moderGuard} from '../../moder.guard';

const routes: Routes = [
  {
    path: ':id',
    children: [
      {
        path: 'area',
        component: ModerPicturesItemAreaComponent,
        canActivate: [moderGuard],
        title: $localize`Cropper`,
      },
      {
        path: 'crop',
        component: ModerPicturesItemCropComponent,
        canActivate: [moderGuard],
        title: $localize`Cropper`,
      },
      {
        path: 'move',
        component: ModerPicturesItemMoveComponent,
        canActivate: [moderGuard],
        title: $localize`Move picture`,
      },
      {
        path: 'place',
        component: ModerPicturesItemPlaceComponent,
        canActivate: [moderGuard],
        title: $localize`Location`,
      },
      {
        path: '',
        component: ModerPicturesItemComponent,
        canActivate: [moderGuard],
      },
    ],
  },
  {
    path: '',
    component: ModerPicturesComponent,
    canActivate: [moderGuard],
    title: $localize`Pictures`,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PicturesRoutingModule {}
