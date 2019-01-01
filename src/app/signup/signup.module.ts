import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignupRoutingModule } from './signup-routing.module';
import { SignupOkComponent } from './ok/ok.component';
import { SignupComponent } from './signup.component';
import { RecaptchaModule } from 'ng-recaptcha';
import { RecaptchaFormsModule } from 'ng-recaptcha/forms';
import { UtilsModule } from '../utils/utils.module';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [SignupComponent, SignupOkComponent],
  imports: [
    CommonModule,
    SignupRoutingModule,
    RecaptchaModule.forRoot(),
    RecaptchaFormsModule,
    UtilsModule,
    FormsModule,
    TranslateModule
  ]
})
export class SignupModule {}
