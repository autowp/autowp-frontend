import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TwinsComponent } from './twins.component';
import { TwinsGroupComponent } from './twins-group.component';
import { TwinsGroupSpecificationsComponent } from './twins-group-specifications.component';
import { TwinsGroupPicturesComponent } from './twins-group-pictures.component';
import { TwinsGroupPictureComponent } from './twins-group-picture/twins-group-picture.component';
import { TwinsGroupGalleryComponent } from './twins-group-gallery/twins-group-gallery.component';

const routes: Routes = [
  {
    path: 'group',
    children: [
      {
        path: ':group',
        children: [
          {
            path: 'pictures',
            children: [
              {
                path: ':identity',
                component: TwinsGroupPictureComponent
              },
              {
                path: '',
                pathMatch: 'full',
                component: TwinsGroupPicturesComponent,
              }
            ]
          },
          {
            path: 'gallery',
            children: [
              {
                path: ':identity',
                component: TwinsGroupGalleryComponent
              },
              {
                path: '',
                pathMatch: 'full',
                component: TwinsGroupGalleryComponent
              }
            ]
          },
          { path: 'specifications', component: TwinsGroupSpecificationsComponent },
          { path: '', component: TwinsGroupComponent }
        ]
      }
    ]
  },
  { path: ':brand', component: TwinsComponent },
  { path: '', pathMatch: 'full', component: TwinsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TwinsRoutingModule { }
