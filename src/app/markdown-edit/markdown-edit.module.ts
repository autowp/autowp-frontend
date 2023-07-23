import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgbNavModule} from '@ng-bootstrap/ng-bootstrap';
import {UtilsModule} from '@utils/utils.module';
import {AutosizeModule} from 'ngx-autosize';

import {MarkdownEditComponent} from './markdown-edit/markdown-edit.component';

@NgModule({
  declarations: [MarkdownEditComponent],
  exports: [MarkdownEditComponent],
  imports: [CommonModule, UtilsModule, FormsModule, AutosizeModule, NgbNavModule],
})
export class MarkdownEditModule {}
