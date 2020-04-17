import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarkdownEditComponent } from './markdown-edit/markdown-edit.component';
import { UtilsModule } from '../utils/utils.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { AutosizeModule } from 'ngx-autosize';
import {NgbNavModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [MarkdownEditComponent],
  imports: [
    CommonModule,
    UtilsModule,
    TranslateModule,
    FormsModule,
    AutosizeModule,
    NgbNavModule
  ],
  exports: [MarkdownEditComponent]
})
export class MarkdownEditModule {}
