import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModerGuard } from '../../moder.guard';
import { ModerPicturesComponent } from './pictures.component';
import { ModerPicturesItemComponent } from './item/item.component';
import { ModerPicturesItemMoveComponent } from './item/move/move.component';
import { ModerPicturesItemCropComponent } from './item/crop/crop.component';
import { ModerPicturesItemAreaComponent } from './item/area/area.component';

const routes: Routes = [
  {
    path: ':id',
    children: [
      {
        path: 'area',
        component: ModerPicturesItemAreaComponent,
        canActivate: [ModerGuard]
      },
      {
        path: 'crop',
        component: ModerPicturesItemCropComponent,
        canActivate: [ModerGuard]
      },
      {
        path: 'move',
        component: ModerPicturesItemMoveComponent,
        canActivate: [ModerGuard]
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
    canActivate: [ModerGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PicturesRoutingModule { }
