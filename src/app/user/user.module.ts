import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {UserComponent} from './user/user.component';
import {User2Component} from './user2/user2.component';

@NgModule({
  declarations: [UserComponent, User2Component],
  exports: [UserComponent, User2Component],
  imports: [CommonModule, RouterModule.forChild([])],
})
export class UserModule {}
