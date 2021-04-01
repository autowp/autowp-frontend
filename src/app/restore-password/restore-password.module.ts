import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestorePasswordRoutingModule } from './restore-password-routing.module';
import { RestorePasswordComponent } from './restore-password.component';
import { RestorePasswordSentComponent } from './sent/sent.component';
import { RestorePasswordNewComponent } from './new/new.component';
import { RestorePasswordNewOkComponent } from './new/ok/ok.component';
import {RecaptchaFormsModule, RecaptchaModule} from 'ng-recaptcha';
import { UtilsModule } from '../utils/utils.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    RestorePasswordComponent,
    RestorePasswordSentComponent,
    RestorePasswordNewComponent,
    RestorePasswordNewOkComponent
  ],
  imports: [
    CommonModule,
    RestorePasswordRoutingModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    UtilsModule,
    FormsModule
  ]
})
export class RestorePasswordModule {}
