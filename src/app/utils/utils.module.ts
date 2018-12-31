import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvalidParamsPipe } from './invalid-params.pipe';
import { MarkdownComponent } from './markdown/markdown.component';

@NgModule({
  declarations: [
    InvalidParamsPipe,
    MarkdownComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    InvalidParamsPipe,
    MarkdownComponent
  ]
})
export class UtilsModule { }
