import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvalidParamsPipe } from './invalid-params.pipe';
import { MarkdownComponent } from './markdown/markdown.component';
import { PastTimeIndicatorComponent } from './past-time-indicator/past-time-indicator.component';
import { MomentModule } from 'ngx-moment';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import {CatalogueListItemComponent} from './list-item/list-item.component';
import {RouterModule} from '@angular/router';
import {ItemHeaderComponent} from './item-header/item-header.component';
import {TranslateModule} from '@ngx-translate/core';
import {Markdown2Component} from './markdown2/markdown2.component';

@NgModule({
  declarations: [
    InvalidParamsPipe,
    MarkdownComponent,
    Markdown2Component,
    PastTimeIndicatorComponent,
    CatalogueListItemComponent,
    ItemHeaderComponent
  ],
  imports: [CommonModule, MomentModule, NgbTooltipModule, RouterModule, TranslateModule],
  exports: [
    InvalidParamsPipe,
    MarkdownComponent,
    PastTimeIndicatorComponent,
    CatalogueListItemComponent,
    ItemHeaderComponent,
    Markdown2Component
  ]
})
export class UtilsModule {}
