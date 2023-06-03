import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ArticlesRoutingModule} from './articles-routing.module';
import {ListComponent} from './list/list.component';
import {PaginatorModule} from '../paginator/paginator.module';
import {ArticlesArticleComponent} from './article/article.component';
import {UserModule} from '../user/user.module';
import {HttpClientModule} from '@angular/common/http';
import {NgbTooltipModule} from '@ng-bootstrap/ng-bootstrap';
import {UtilsModule} from '@utils/utils.module';

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
