import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarkdownEditComponent } from './markdown-edit/markdown-edit.component';
import { UtilsModule } from '../utils/utils.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { AutosizeModule } from 'ngx-autosize';

@NgModule({
  declarations: [MarkdownEditComponent],
  imports: [
    CommonModule,
    UtilsModule,
    NgbModule,
    TranslateModule,
    FormsModule,
    AutosizeModule
  ],
  exports: [MarkdownEditComponent]
})
export class MarkdownEditModule {}
