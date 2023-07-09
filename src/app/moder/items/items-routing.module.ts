import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ModerItemsAlphaComponent} from './alpha/alpha.component';
import {ModerItemsTooBigComponent} from './too-big/too-big.component';
import {ModerItemsNewComponent} from './new/new.component';
import {ModerItemsItemOrganizeComponent} from './item/catalogue/organize/organize.component';
import {ModerItemsItemPicturesOrganizeComponent} from './item/pictures/organize/organize.component';
import {ModerItemsItemSelectParentComponent} from './item/select-parent/select-parent.component';
import {ModerItemsItemComponent} from './item/item.component';
import {ModerItemsComponent} from './items.component';
import {moderGuard} from '../../moder.guard';

const routes: Routes = [
  {
    path: 'alpha',
    component: ModerItemsAlphaComponent,
    canActivate: [moderGuard],
    title: $localize`Alphabetical vehicles list`,
  },
  {
    path: 'too-big',
    component: ModerItemsTooBigComponent,
    canActivate: [moderGuard],
    title: $localize`Too big`,
  },
  {
    path: 'new',
    component: ModerItemsNewComponent,
    canActivate: [moderGuard],
  },
  {
    path: 'item/:id',
    children: [
      {
        path: 'organize',
        component: ModerItemsItemOrganizeComponent,
        canActivate: [moderGuard],
        title: $localize`Organize`,
      },
      {
        path: 'organize-pictures',
        component: ModerItemsItemPicturesOrganizeComponent,
        canActivate: [moderGuard],
        title: $localize`Organize pictures`,
      },
      {
        path: 'select-parent',
        component: ModerItemsItemSelectParentComponent,
        canActivate: [moderGuard],
        title: $localize`Parent selection`,
      },
      {
        path: '',
        component: ModerItemsItemComponent,
        canActivate: [moderGuard],
      },
    ],
  },
  {
    path: '',
    component: ModerItemsComponent,
    canActivate: [moderGuard],
    title: $localize`Items`,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ItemsRoutingModule {}
