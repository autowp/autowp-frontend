import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticlesArticleComponent } from './article/article.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [
  { path: ':catname', component: ArticlesArticleComponent },
  { path: '', component: ListComponent, pathMatch: 'full', title: $localize `Articles` }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticlesRoutingModule {}
