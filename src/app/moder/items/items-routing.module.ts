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
    canActivate: [ModerGuard],
    title: $localize `Alphabetical vehicles list`
  },
  {
    path: 'too-big',
    component: ModerItemsTooBigComponent,
    canActivate: [ModerGuard],
    title: $localize `Too big`
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
        canActivate: [ModerGuard],
        title: $localize `Organize`
      },
      {
        path: 'organize-pictures',
        component: ModerItemsItemPicturesOrganizeComponent,
        canActivate: [ModerGuard],
        title: $localize `Organize pictures`
      },
      {
        path: 'select-parent',
        component: ModerItemsItemSelectParentComponent,
        canActivate: [ModerGuard],
        title: $localize `Parent selection`
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
    canActivate: [ModerGuard],
    title: $localize `Items`
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemsRoutingModule { }
