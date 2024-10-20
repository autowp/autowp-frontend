import {Routes} from '@angular/router';

import {moderGuard} from '../../moder.guard';
import {ModerItemsAlphaComponent} from './alpha/alpha.component';
import {ModerItemsItemOrganizeComponent} from './item/catalogue/organize/organize.component';
import {ModerItemsItemComponent} from './item/item.component';
import {ModerItemsItemPicturesOrganizeComponent} from './item/pictures/organize/organize.component';
import {ModerItemsItemSelectParentComponent} from './item/select-parent/select-parent.component';
import {ModerItemsComponent} from './items.component';
import {ModerItemsNewComponent} from './new/new.component';
import {ModerItemsTooBigComponent} from './too-big/too-big.component';

export const routes: Routes = [
  {
    canActivate: [moderGuard],
    component: ModerItemsAlphaComponent,
    path: 'alpha',
    title: $localize`Alphabetical vehicles list`,
  },
  {
    canActivate: [moderGuard],
    component: ModerItemsTooBigComponent,
    path: 'too-big',
    title: $localize`Too big`,
  },
  {
    canActivate: [moderGuard],
    component: ModerItemsNewComponent,
    path: 'new',
  },
  {
    children: [
      {
        canActivate: [moderGuard],
        component: ModerItemsItemOrganizeComponent,
        path: 'organize',
        title: $localize`Organize`,
      },
      {
        canActivate: [moderGuard],
        component: ModerItemsItemPicturesOrganizeComponent,
        path: 'organize-pictures',
        title: $localize`Organize pictures`,
      },
      {
        canActivate: [moderGuard],
        component: ModerItemsItemSelectParentComponent,
        path: 'select-parent',
        title: $localize`Parent selection`,
      },
      {
        canActivate: [moderGuard],
        component: ModerItemsItemComponent,
        path: '',
      },
    ],
    path: 'item/:id',
  },
  {
    canActivate: [moderGuard],
    component: ModerItemsComponent,
    path: '',
    title: $localize`Items`,
  },
];
