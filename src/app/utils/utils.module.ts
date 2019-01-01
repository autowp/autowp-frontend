import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvalidParamsPipe } from './invalid-params.pipe';
import { MarkdownComponent } from './markdown/markdown.component';
import { PastTimeIndicatorComponent } from './past-time-indicator/past-time-indicator.component';
import { MomentModule } from 'ngx-moment';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    InvalidParamsPipe,
    MarkdownComponent,
    PastTimeIndicatorComponent
  ],
  imports: [CommonModule, MomentModule, NgbTooltipModule],
  exports: [InvalidParamsPipe, MarkdownComponent, PastTimeIndicatorComponent]
})
export class UtilsModule {}
