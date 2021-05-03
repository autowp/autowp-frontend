import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user/user.component';
import { RouterModule } from '@angular/router';
import {User2Component} from './user2/user2.component';

@NgModule({
  declarations: [UserComponent, User2Component],
  imports: [
    CommonModule,
    RouterModule.forChild([])
  ],
  exports: [UserComponent, User2Component]
})
export class UserModule { }
