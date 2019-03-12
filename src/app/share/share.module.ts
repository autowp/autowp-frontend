import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShareComponent } from './share.component';

@NgModule({
  declarations: [ShareComponent],
  imports: [
    CommonModule
  ],
  exports: [ShareComponent]
})
export class ShareModule { }
