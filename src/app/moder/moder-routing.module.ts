import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModerCommentsComponent } from './comments/comments.component';
import { ModerGuard } from '../moder.guard';
import { ModerItemParentComponent } from './item-parent/item-parent.component';
import { ModerPagesComponent } from './pages/pages.component';
import { ModerPerspectivesComponent } from './perspectives/perspectives.component';
import { ModerPictureVoteTemplatesComponent } from './picture-vote-templates/picture-vote-templates.component';
import { ModerStatComponent } from './stat/stat.component';
import { ModerUsersComponent } from './users/users.component';
import { ModerAttrsAttributeComponent } from './attrs/attribute/attribute.component';
import { ModerAttrsZoneComponent } from './attrs/zone/zone.component';
import { ModerIndexComponent } from './index/index.component';
import { ModerAttrsComponent } from './attrs/attrs.component';

const routes: Routes = [
  {
    path: 'comments',
    component: ModerCommentsComponent,
    canActivate: [ModerGuard],
    title: $localize `Comments`
  },
  {
    path: 'item-parent/:item_id/:parent_id',
    component: ModerItemParentComponent,
    canActivate: [ModerGuard]
  },
  {
    path: 'items',
    loadChildren: () => import('./items/items.module').then(m => m.ItemsModule)
  },
  {
    path: 'pages',
    title: $localize `Pages`,
    children: [
      {
        path: '',
        component: ModerPagesComponent,
        canActivate: [ModerGuard]
      }
    ]
  },
  {
    path: 'perspectives',
    component: ModerPerspectivesComponent,
    canActivate: [ModerGuard],
    title: $localize `Perspectives`
  },
  {
    path: 'picture-vote-templates',
    component: ModerPictureVoteTemplatesComponent,
    canActivate: [ModerGuard],
    title: $localize `Picture vote templates`
  },
  {
    path: 'pictures',
    loadChildren: () => import('./pictures/pictures.module').then(m => m.PicturesModule)
  },
  {
    path: 'stat',
    component: ModerStatComponent,
    canActivate: [ModerGuard],
    title: $localize `Statistics`
  },
  {
    path: 'traffic',
    loadChildren: () => import('./traffic/traffic.module').then(m => m.TrafficModule)
  },
  {
    path: 'users',
    component: ModerUsersComponent,
    canActivate: [ModerGuard],
    title: $localize `Users`
  },
  {
    path: 'attrs',
    title: $localize `Attributes`,
    children: [
      {
        path: 'attribute/:id',
        component: ModerAttrsAttributeComponent,
        canActivate: [ModerGuard]
      },
      {
        path: 'zone/:id',
        component: ModerAttrsZoneComponent,
        canActivate: [ModerGuard]
      },
      {
        path: '',
        component: ModerAttrsComponent,
        canActivate: [ModerGuard]
      }
    ]
  },
  {
    path: '',
    component: ModerIndexComponent,
    canActivate: [ModerGuard],
    title: $localize `Moderator page`
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModerRoutingModule { }
