import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {ShareComponent} from './share.component';

@NgModule({
  declarations: [ShareComponent],
  exports: [ShareComponent],
  imports: [CommonModule],
})
export class ShareModule {}
