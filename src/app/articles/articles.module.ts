import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {NgbTooltipModule} from '@ng-bootstrap/ng-bootstrap';
import {UtilsModule} from '@utils/utils.module';

import {PaginatorModule} from '../paginator/paginator.module';
import {UserModule} from '../user/user.module';
import {ArticlesArticleComponent} from './article/article.component';
import {ArticlesRoutingModule} from './articles-routing.module';
import {ListComponent} from './list/list.component';

@NgModule({
  declarations: [ListComponent, ArticlesArticleComponent],
  imports: [
    CommonModule,
    ArticlesRoutingModule,
    NgbTooltipModule,
    PaginatorModule,
    UserModule,
    HttpClientModule,
    UtilsModule,
  ],
})
export class ArticlesModule {}
