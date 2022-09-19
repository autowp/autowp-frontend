import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { categoriesPathMatcher } from './matcher';
import { CategoriesCategoryItemComponent } from './category-item.component';
import { CategoriesCategoryPicturesComponent } from './category-pictures.component';
import { CategoriesIndexComponent } from './index.component';
import { CategoryPictureComponent } from './category-picture/category-picture.component';
import { CategoryGalleryComponent } from './category-gallery/category-gallery.component';

const routes: Routes = [
  {
    path: ':category',
    children: [
      {
        matcher: categoriesPathMatcher,
        children: [
          {
            path: 'pictures',
            children: [
              {
                path: ':identity',
                component: CategoryPictureComponent,
              },
              {
                path: '',
                pathMatch: 'full',
                component: CategoriesCategoryPicturesComponent,
                title: $localize `Pictures`
              }
            ]
          },
          {
            path: 'gallery/:identity',
            pathMatch: 'full',
            component: CategoryGalleryComponent,
          },
          {
            path: '',
            pathMatch: 'full',
            component: CategoriesCategoryItemComponent
          }
        ]
      },
      {
        path: '',
        pathMatch: 'full',
        component: CategoriesCategoryItemComponent
      }
    ]
  },
  {
    path: '',
    pathMatch: 'full',
    component: CategoriesIndexComponent,
    title: $localize `Categories`
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }
