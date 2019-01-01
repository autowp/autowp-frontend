import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RestorePasswordRoutingModule } from './restore-password-routing.module';
import { RestorePasswordComponent } from './restore-password.component';
import { RestorePasswordSentComponent } from './sent/sent.component';
import { RestorePasswordNewComponent } from './new/new.component';
import { RestorePasswordNewOkComponent } from './new/ok/ok.component';
import { RecaptchaModule } from 'ng-recaptcha';
import { RecaptchaFormsModule } from 'ng-recaptcha/forms';
import { UtilsModule } from '../utils/utils.module';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

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
    RecaptchaModule.forRoot(),
    RecaptchaFormsModule,
    UtilsModule,
    FormsModule,
    TranslateModule
  ]
})
export class RestorePasswordModule {}
