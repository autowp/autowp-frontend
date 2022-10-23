import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticlesRoutingModule } from './articles-routing.module';
import { ListComponent } from './list/list.component';
import { MomentModule } from 'ngx-moment';
import { PaginatorModule } from '../paginator/paginator.module';
import { ArticlesArticleComponent } from './article/article.component';
import { UserModule } from '../user/user.module';
import { HttpClientModule } from '@angular/common/http';
import { ArticleService } from './article.service';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [ListComponent, ArticlesArticleComponent],
  imports: [
    CommonModule,
    ArticlesRoutingModule,
    MomentModule,
    NgbTooltipModule,
    PaginatorModule,
    UserModule,
    HttpClientModule
  ],
  providers: [ArticleService]
})
export class ArticlesModule {}
