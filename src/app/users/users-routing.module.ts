import {Routes} from '@angular/router';

import {UsersRatingComponent} from './rating/rating.component';
import {UsersUserCommentsComponent} from './user/comments/comments.component';
import {UsersUserPicturesBrandComponent} from './user/pictures/brand/brand.component';
import {UsersUserPicturesComponent} from './user/pictures/pictures.component';
import {UsersUserComponent} from './user/user.component';

export const routes: Routes = [
  {
    children: [
      {
        component: UsersRatingComponent,
        path: ':rating',
      },
      {
        component: UsersRatingComponent,
        path: '',
      },
    ],
    path: 'rating',
    title: $localize`Statistics`,
  },
  {
    children: [
      {component: UsersUserCommentsComponent, path: 'comments', title: $localize`Comments`},
      {
        children: [
          {component: UsersUserPicturesBrandComponent, path: ':brand'},
          {component: UsersUserPicturesComponent, path: ''},
        ],
        path: 'pictures',
        title: $localize`User's pictures`,
      },
      {component: UsersUserComponent, path: ''},
    ],
    path: ':identity',
  },
];
