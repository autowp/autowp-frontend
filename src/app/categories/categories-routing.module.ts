import {Routes} from '@angular/router';

import {CategoriesCategoryComponent} from './category/category.component';
import {CategoryGalleryComponent} from './category/gallery/gallery.component';
import {CategoriesCategoryItemComponent} from './category/item/item.component';
import {CategoryPictureComponent} from './category/picture/picture.component';
import {CategoriesCategoryPicturesComponent} from './category/pictures/pictures.component';
import {CategoriesIndexComponent} from './index.component';
import {categoriesPathMatcher} from './matcher';

export const routes: Routes = [
  {
    children: [
      {
        children: [
          {
            component: CategoryPictureComponent,
            path: ':identity',
          },
          {
            component: CategoriesCategoryPicturesComponent,
            path: '',
            pathMatch: 'full',
            title: $localize`Pictures`,
          },
        ],
        path: 'pictures',
      },
      {
        component: CategoryGalleryComponent,
        path: 'gallery/:identity',
        pathMatch: 'full',
      },
      {
        component: CategoriesCategoryItemComponent,
        path: '',
        pathMatch: 'full',
      },
    ],
    component: CategoriesCategoryComponent,
    matcher: categoriesPathMatcher,
  },
  {
    component: CategoriesIndexComponent,
    path: '',
    pathMatch: 'full',
    title: $localize`Categories`,
  },
];
