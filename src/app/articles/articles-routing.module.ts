import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ArticlesArticleComponent} from './article/article.component';
import {ListComponent} from './list/list.component';

const routes: Routes = [
  {component: ArticlesArticleComponent, path: ':catname'},
  {component: ListComponent, path: '', pathMatch: 'full', title: $localize`Articles`},
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
})
export class ArticlesRoutingModule {}
