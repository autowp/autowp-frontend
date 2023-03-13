import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PersonsPersonInfoComponent} from './person/info/info.component';
import {PersonsComponent} from './persons.component';
import {PersonsPersonPictureComponent} from './person/picture/picture.component';
import {PersonsPersonGalleryComponent} from './person/gallery/gallery.component';
import {PersonsPersonAuthorGalleryComponent} from './person/author/gallery/gallery.component';
import {PersonsPersonAuthorPictureComponent} from './person/author/picture/picture.component';
import {PersonsPersonComponent} from './person/person.component';

const routes: Routes = [
  {
    path: 'authors',
    component: PersonsComponent,
    data: {
      authors: true,
    },
    title: $localize`Persons`,
  },
  {
    path: ':id',
    title: $localize`Persons`,
    component: PersonsPersonComponent,
    children: [
      {
        path: 'author',
        children: [
          {
            path: 'gallery/:identity',
            component: PersonsPersonAuthorGalleryComponent,
            pathMatch: 'full',
          },
          {
            path: ':identity',
            component: PersonsPersonAuthorPictureComponent,
            pathMatch: 'full',
          },
        ],
      },
      {
        path: 'gallery/:identity',
        component: PersonsPersonGalleryComponent,
        pathMatch: 'full',
      },
      {
        path: ':identity',
        component: PersonsPersonPictureComponent,
        pathMatch: 'full',
      },
      {
        path: '',
        pathMatch: 'full',
        component: PersonsPersonInfoComponent,
      },
    ],
  },
  {
    path: '',
    component: PersonsComponent,
    title: $localize`Persons`,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PersonsRoutingModule {}
