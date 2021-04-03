import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThumbnailComponent } from './thumbnail/thumbnail.component';
import { UserModule } from '../user/user.module';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { APIPerspectiveModule } from '../api/perspective/perspective.module';

@NgModule({
  declarations: [ThumbnailComponent],
  imports: [
    CommonModule,
    UserModule,
    RouterModule.forChild([]),
    FormsModule,
    APIPerspectiveModule
  ],
  exports: [ThumbnailComponent]
})
export class ThumbnailModule { }
