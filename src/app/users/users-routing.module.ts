import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersRatingComponent } from './rating/rating.component';
import { UsersUserCommentsComponent } from './user/comments/comments.component';
import { UsersUserPicturesBrandComponent } from './user/pictures/brand/brand.component';
import { UsersUserPicturesComponent } from './user/pictures/pictures.component';
import { UsersUserComponent } from './user/user.component';

const routes: Routes = [
  {
    path: 'rating',
    children: [
      {
        path: ':rating',
        component: UsersRatingComponent
      },
      {
        path: '',
        component: UsersRatingComponent
      }
    ]
  },
  {
    path: ':identity',
    children: [
      { path: 'comments', component: UsersUserCommentsComponent },
      {
        path: 'pictures',
        children: [
          { path: ':brand', component: UsersUserPicturesBrandComponent },
          { path: '', component: UsersUserPicturesComponent }
        ]
      },
      { path: '', component: UsersUserComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
