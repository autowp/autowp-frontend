import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PersonsPersonComponent } from './person/person.component';
import { PersonsComponent } from './persons.component';
import {PersonsPersonPictureComponent} from './person/picture/picture.component';
import {PersonsPersonGalleryComponent} from './person/gallery/gallery.component';

const routes: Routes = [
  {
    path: 'authors',
    component: PersonsComponent,
    data: {
      authors: true
    }
  },
  {
    path: ':id',
    children: [
      {
        path: 'gallery/:identity',
        component: PersonsPersonGalleryComponent
      },
      {
        path: ':identity',
        component: PersonsPersonPictureComponent
      },
      {
        path: '',
        pathMatch: 'full',
        component: PersonsPersonComponent
      }
    ]
  },
  {
    path: '',
    component: PersonsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonsRoutingModule { }
