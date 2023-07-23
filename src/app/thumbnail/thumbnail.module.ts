import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

import {APIPerspectiveModule} from '../api/perspective/perspective.module';
import {UserModule} from '../user/user.module';
import {ThumbnailComponent} from './thumbnail/thumbnail.component';

@NgModule({
  declarations: [ThumbnailComponent],
  exports: [ThumbnailComponent],
  imports: [CommonModule, UserModule, RouterModule.forChild([]), FormsModule, APIPerspectiveModule],
})
export class ThumbnailModule {}
