import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InvalidParamsPipe} from './invalid-params.pipe';
import {MarkdownComponent} from './markdown/markdown.component';
import {PastTimeIndicatorComponent} from './past-time-indicator/past-time-indicator.component';
import {MomentModule} from 'ngx-moment';
import {NgbTooltipModule} from '@ng-bootstrap/ng-bootstrap';
import {CatalogueListItemComponent} from './list-item/list-item.component';
import {RouterModule} from '@angular/router';
import {ItemHeaderComponent} from './item-header/item-header.component';
import {Markdown2Component} from './markdown2/markdown2.component';
import {UserTextComponent} from './user-text/user-text.component';
import {UserModule} from '../user/user.module';

@NgModule({
  declarations: [
    InvalidParamsPipe,
    MarkdownComponent,
    Markdown2Component,
    PastTimeIndicatorComponent,
    CatalogueListItemComponent,
    ItemHeaderComponent,
    UserTextComponent,
  ],
  imports: [CommonModule, MomentModule, NgbTooltipModule, RouterModule, UserModule],
  exports: [
    InvalidParamsPipe,
    MarkdownComponent,
    PastTimeIndicatorComponent,
    CatalogueListItemComponent,
    ItemHeaderComponent,
    Markdown2Component,
    UserTextComponent,
  ],
})
export class UtilsModule {}
