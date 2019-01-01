import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { categoriesPathMatcher, categoriesPicturesPathMatcher } from './matcher';
import { CategoriesCategoryItemComponent } from './category-item.component';
import { CategoriesCategoryPicturesComponent } from './category-pictures.component';
import { CategoriesIndexComponent } from './index.component';

const routes: Routes = [
  {
    path: ':category',
    children: [
      {
        matcher: categoriesPathMatcher,
        component: CategoriesCategoryItemComponent
      },
      {
        matcher: categoriesPicturesPathMatcher,
        component: CategoriesCategoryPicturesComponent
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
    component: CategoriesIndexComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }
