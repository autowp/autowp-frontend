import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModerItemsAlphaComponent } from './alpha/alpha.component';
import { ModerGuard } from '../../moder.guard';
import { ModerItemsTooBigComponent } from './too-big/too-big.component';
import { ModerItemsNewComponent } from './new/new.component';
import { ModerItemsItemOrganizeComponent } from './item/catalogue/organize/organize.component';
import { ModerItemsItemPicturesOrganizeComponent } from './item/pictures/organize/organize.component';
import { ModerItemsItemSelectParentComponent } from './item/select-parent/select-parent.component';
import { ModerItemsItemComponent } from './item/item.component';
import { ModerItemsComponent } from './items.component';

const routes: Routes = [
  {
    path: 'alpha',
    component: ModerItemsAlphaComponent,
    canActivate: [ModerGuard]
  },
  {
    path: 'too-big',
    component: ModerItemsTooBigComponent,
    canActivate: [ModerGuard]
  },
  {
    path: 'new',
    component: ModerItemsNewComponent,
    canActivate: [ModerGuard]
  },
  {
    path: 'item/:id',
    children: [
      {
        path: 'organize',
        component: ModerItemsItemOrganizeComponent,
        canActivate: [ModerGuard]
      },
      {
        path: 'organize-pictures',
        component: ModerItemsItemPicturesOrganizeComponent,
        canActivate: [ModerGuard]
      },
      {
        path: 'select-parent',
        component: ModerItemsItemSelectParentComponent,
        canActivate: [ModerGuard]
      },
      {
        path: '',
        component: ModerItemsItemComponent,
        canActivate: [ModerGuard]
      }
    ]
  },
  {
    path: '',
    component: ModerItemsComponent,
    canActivate: [ModerGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemsRoutingModule { }
