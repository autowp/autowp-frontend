import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SigninRoutingModule } from './signin-routing.module';
import { SignInComponent } from './signin.component';
import { UtilsModule } from '../utils/utils.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [SignInComponent],
  imports: [
    CommonModule,
    SigninRoutingModule,
    UtilsModule,
    FormsModule
  ]
})
export class SigninModule {}
