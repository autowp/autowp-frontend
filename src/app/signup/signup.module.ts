import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignupRoutingModule } from './signup-routing.module';
import { SignupOkComponent } from './ok/ok.component';
import { SignupComponent } from './signup.component';
import {RecaptchaFormsModule, RecaptchaModule} from 'ng-recaptcha';
import { UtilsModule } from '../utils/utils.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [SignupComponent, SignupOkComponent],
  imports: [
    CommonModule,
    SignupRoutingModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    UtilsModule,
    FormsModule
  ]
})
export class SignupModule {}
