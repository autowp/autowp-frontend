import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModerCommentsComponent } from './comments/comments.component';
import { ModerGuard } from '../moder.guard';
import { ModerItemParentComponent } from './item-parent/item-parent.component';
import { ModerPagesAddComponent } from './pages/add/add.component';
import { ModerPagesEditComponent } from './pages/edit/edit.component';
import { ModerPagesComponent } from './pages/pages.component';
import { ModerPerspectivesComponent } from './perspectives/perspectives.component';
import { ModerPictureVoteTemplatesComponent } from './picture-vote-templates/picture-vote-templates.component';
import { ModerRightsComponent } from './rights/rights.component';
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
    canActivate: [ModerGuard]
  },
  {
    path: 'item-parent/:item_id/:parent_id',
    component: ModerItemParentComponent,
    canActivate: [ModerGuard]
  },
  {
    path: 'items',
    loadChildren: './items/items.module#ItemsModule'
  },
  {
    path: 'pages',
    children: [
      {
        path: 'add',
        component: ModerPagesAddComponent,
        canActivate: [ModerGuard]
      },
      {
        path: 'edit',
        component: ModerPagesEditComponent,
        canActivate: [ModerGuard]
      },
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
    canActivate: [ModerGuard]
  },
  {
    path: 'picture-vote-templates',
    component: ModerPictureVoteTemplatesComponent,
    canActivate: [ModerGuard]
  },
  {
    path: 'pictures',
    loadChildren: './pictures/pictures.module#PicturesModule'
  },
  {
    path: 'rights',
    component: ModerRightsComponent,
    canActivate: [ModerGuard]
  },
  {
    path: 'stat',
    component: ModerStatComponent,
    canActivate: [ModerGuard]
  },
  {
    path: 'traffic',
    loadChildren: './traffic/traffic.module#TrafficModule'
  },
  {
    path: 'users',
    component: ModerUsersComponent,
    canActivate: [ModerGuard]
  },
  {
    path: 'hotlinks',
    loadChildren: './hotlinks/hotlinks.module#HotlinksModule'
  },
  {
    path: 'attrs',
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
    canActivate: [ModerGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModerRoutingModule { }
