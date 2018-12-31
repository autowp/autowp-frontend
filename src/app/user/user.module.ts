import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user/user.component';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [UserComponent],
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    RouterModule.forChild([])
  ],
  exports: [UserComponent]
})
export class UserModule { }
