import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {NgbTooltipModule} from '@ng-bootstrap/ng-bootstrap';
import {TimeAgoPipe} from '@utils/time-ago.pipe';

import {UserModule} from '../user/user.module';
import {InvalidParamsPipe} from './invalid-params.pipe';
import {ItemHeaderComponent} from './item-header/item-header.component';
import {CatalogueListItemComponent} from './list-item/list-item.component';
import {MarkdownComponent} from './markdown/markdown.component';
import {Markdown2Component} from './markdown2/markdown2.component';
import {PastTimeIndicatorComponent} from './past-time-indicator/past-time-indicator.component';
import {UserTextComponent} from './user-text/user-text.component';

@NgModule({
  declarations: [
    InvalidParamsPipe,
    TimeAgoPipe,
    MarkdownComponent,
    Markdown2Component,
    PastTimeIndicatorComponent,
    CatalogueListItemComponent,
    ItemHeaderComponent,
    UserTextComponent,
  ],
  exports: [
    InvalidParamsPipe,
    TimeAgoPipe,
    MarkdownComponent,
    PastTimeIndicatorComponent,
    CatalogueListItemComponent,
    ItemHeaderComponent,
    Markdown2Component,
    UserTextComponent,
  ],
  imports: [CommonModule, NgbTooltipModule, RouterModule, UserModule],
})
export class UtilsModule {}
