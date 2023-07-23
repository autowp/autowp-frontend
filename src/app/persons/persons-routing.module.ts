import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {PersonsPersonAuthorGalleryComponent} from './person/author/gallery/gallery.component';
import {PersonsPersonAuthorPictureComponent} from './person/author/picture/picture.component';
import {PersonsPersonGalleryComponent} from './person/gallery/gallery.component';
import {PersonsPersonInfoComponent} from './person/info/info.component';
import {PersonsPersonComponent} from './person/person.component';
import {PersonsPersonPictureComponent} from './person/picture/picture.component';
import {PersonsComponent} from './persons.component';

const routes: Routes = [
  {
    component: PersonsComponent,
    data: {
      authors: true,
    },
    path: 'authors',
    title: $localize`Persons`,
  },
  {
    children: [
      {
        children: [
          {
            component: PersonsPersonAuthorGalleryComponent,
            path: 'gallery/:identity',
            pathMatch: 'full',
          },
          {
            component: PersonsPersonAuthorPictureComponent,
            path: ':identity',
            pathMatch: 'full',
          },
        ],
        path: 'author',
      },
      {
        component: PersonsPersonGalleryComponent,
        path: 'gallery/:identity',
        pathMatch: 'full',
      },
      {
        component: PersonsPersonPictureComponent,
        path: ':identity',
        pathMatch: 'full',
      },
      {
        component: PersonsPersonInfoComponent,
        path: '',
        pathMatch: 'full',
      },
    ],
    component: PersonsPersonComponent,
    path: ':id',
    title: $localize`Persons`,
  },
  {
    component: PersonsComponent,
    path: '',
    title: $localize`Persons`,
  },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
})
export class PersonsRoutingModule {}
