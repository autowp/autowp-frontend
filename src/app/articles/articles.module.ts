import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticlesRoutingModule } from './articles-routing.module';
import { ListComponent } from './list/list.component';
import { MomentModule } from 'ngx-moment';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PaginatorModule } from '../paginator/paginator.module';
import { ArticlesArticleComponent } from './article/article.component';
import { UserModule } from '../user/user.module';
import { HttpClientModule } from '@angular/common/http';
import { ArticleService } from './article.service';
import { CommentsModule } from '../comments/comments.module';

@NgModule({
  declarations: [ListComponent, ArticlesArticleComponent],
  imports: [
    CommonModule,
    ArticlesRoutingModule,
    MomentModule,
    NgbModule,
    PaginatorModule,
    UserModule,
    HttpClientModule,
    CommentsModule
  ],
  providers: [
    ArticleService
  ]
})
export class ArticlesModule {}
