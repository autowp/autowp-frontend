import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThumbnailComponent } from './thumbnail/thumbnail.component';
import { UserModule } from '../user/user.module';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [ThumbnailComponent],
  imports: [
    CommonModule,
    UserModule,
    RouterModule.forChild([]),
    FormsModule,
    TranslateModule
  ],
  exports: [ThumbnailComponent]
})
export class ThumbnailModule { }
