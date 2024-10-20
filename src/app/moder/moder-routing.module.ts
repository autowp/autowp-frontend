import {Routes} from '@angular/router';

import {moderGuard} from '../moder.guard';
import {ModerAttrsAttributeComponent} from './attrs/attribute/attribute.component';
import {ModerAttrsComponent} from './attrs/attrs.component';
import {ModerAttrsZoneComponent} from './attrs/zone/zone.component';
import {ModerCommentsComponent} from './comments/comments.component';
import {ModerIndexComponent} from './index/index.component';
import {ModerItemParentComponent} from './item-parent/item-parent.component';
import {ModerPerspectivesComponent} from './perspectives/perspectives.component';
import {ModerPictureVoteTemplatesComponent} from './picture-vote-templates/picture-vote-templates.component';
import {ModerStatComponent} from './stat/stat.component';
import {ModerUsersComponent} from './users/users.component';

export const routes: Routes = [
  {
    canActivate: [moderGuard],
    component: ModerCommentsComponent,
    path: 'comments',
    title: $localize`Comments`,
  },
  {
    canActivate: [moderGuard],
    component: ModerItemParentComponent,
    path: 'item-parent/:item_id/:parent_id',
  },
  {
    loadChildren: () => import('./items/items-routing.module').then((m) => m.routes),
    path: 'items',
  },
  {
    canActivate: [moderGuard],
    component: ModerPerspectivesComponent,
    path: 'perspectives',
    title: $localize`Perspectives`,
  },
  {
    canActivate: [moderGuard],
    component: ModerPictureVoteTemplatesComponent,
    path: 'picture-vote-templates',
    title: $localize`Picture vote templates`,
  },
  {
    loadChildren: () => import('./pictures/pictures-routing.module').then((m) => m.routes),
    path: 'pictures',
  },
  {
    canActivate: [moderGuard],
    component: ModerStatComponent,
    path: 'stat',
    title: $localize`Statistics`,
  },
  {
    loadChildren: () => import('./traffic/traffic-routing.module').then((m) => m.routes),
    path: 'traffic',
  },
  {
    canActivate: [moderGuard],
    component: ModerUsersComponent,
    path: 'users',
    title: $localize`Users`,
  },
  {
    children: [
      {
        canActivate: [moderGuard],
        component: ModerAttrsAttributeComponent,
        path: 'attribute/:id',
      },
      {
        canActivate: [moderGuard],
        component: ModerAttrsZoneComponent,
        path: 'zone/:id',
      },
      {
        canActivate: [moderGuard],
        component: ModerAttrsComponent,
        path: '',
      },
    ],
    path: 'attrs',
    title: $localize`Attributes`,
  },
  {
    canActivate: [moderGuard],
    component: ModerIndexComponent,
    path: '',
    title: $localize`Moderator page`,
  },
];
