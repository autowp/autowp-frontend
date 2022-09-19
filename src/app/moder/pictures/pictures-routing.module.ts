import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModerGuard } from '../../moder.guard';
import { ModerPicturesComponent } from './pictures.component';
import { ModerPicturesItemComponent } from './item/item.component';
import { ModerPicturesItemMoveComponent } from './item/move/move.component';
import { ModerPicturesItemCropComponent } from './item/crop/crop.component';
import { ModerPicturesItemAreaComponent } from './item/area/area.component';
import {ModerPicturesItemPlaceComponent} from './item/place/place.component';

const routes: Routes = [
  {
    path: ':id',
    children: [
      {
        path: 'area',
        component: ModerPicturesItemAreaComponent,
        canActivate: [ModerGuard],
        title: $localize `Cropper`
      },
      {
        path: 'crop',
        component: ModerPicturesItemCropComponent,
        canActivate: [ModerGuard],
        title: $localize `Cropper`
      },
      {
        path: 'move',
        component: ModerPicturesItemMoveComponent,
        canActivate: [ModerGuard],
        title: $localize `Move picture`
      },
      {
        path: 'place',
        component: ModerPicturesItemPlaceComponent,
        canActivate: [ModerGuard],
        title: $localize `Location`
      },
      {
        path: '',
        component: ModerPicturesItemComponent,
        canActivate: [ModerGuard]
      }
    ]
  },
  {
    path: '',
    component: ModerPicturesComponent,
    canActivate: [ModerGuard],
    title: $localize `Pictures`
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PicturesRoutingModule { }
