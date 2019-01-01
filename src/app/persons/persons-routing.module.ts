import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PersonsAuthorsComponent } from './authors/authors.component';
import { PersonsPersonComponent } from './person/person.component';
import { PersonsComponent } from './persons.component';

const routes: Routes = [
  {
    path: 'authors',
    component: PersonsAuthorsComponent
  },
  {
    path: ':id',
    component: PersonsPersonComponent
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
