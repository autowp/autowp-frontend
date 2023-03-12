import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {TwinsComponent} from './twins.component';
import {TwinsGroupComponent} from './twins-group/twins-group.component';
import {TwinsGroupSpecificationsComponent} from './twins-group/specifications/specifications.component';
import {TwinsGroupPicturesListComponent} from './twins-group/pictures/list/list.component';
import {TwinsGroupPictureComponent} from './twins-group/pictures/picture/picture.component';
import {TwinsGroupGalleryComponent} from './twins-group/gallery/twins-group-gallery.component';
import {TwinsGroupItemsComponent} from './twins-group/items/items.component';

const routes: Routes = [
  {
    path: 'group/:group',
    component: TwinsGroupComponent,
    children: [
      {
        path: 'pictures',
        children: [
          {
            path: ':identity',
            component: TwinsGroupPictureComponent,
          },
          {
            path: '',
            pathMatch: 'full',
            component: TwinsGroupPicturesListComponent,
          },
        ],
      },
      {
        path: 'gallery',
        children: [
          {
            path: ':identity',
            component: TwinsGroupGalleryComponent,
          },
          {
            path: '',
            pathMatch: 'full',
            component: TwinsGroupGalleryComponent,
          },
        ],
      },
      {path: 'specifications', component: TwinsGroupSpecificationsComponent},
      {path: '', component: TwinsGroupItemsComponent},
    ],
  },
  {path: ':brand', component: TwinsComponent, title: $localize`Twins`},
  {path: '', pathMatch: 'full', component: TwinsComponent, title: $localize`Twins`},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TwinsRoutingModule {}
