import {Routes} from '@angular/router';

import {ArticlesArticleComponent} from './article/article.component';
import {ListComponent} from './list/list.component';

export const routes: Routes = [
  {component: ArticlesArticleComponent, path: ':catname'},
  {component: ListComponent, path: '', pathMatch: 'full', title: $localize`Articles`},
];
