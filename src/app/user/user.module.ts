import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {UserComponent} from './user/user.component';

@NgModule({
  declarations: [UserComponent],
  exports: [UserComponent],
  imports: [CommonModule, RouterModule.forChild([])],
})
export class UserModule {}
