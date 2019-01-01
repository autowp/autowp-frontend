import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeedbackRoutingModule } from './feedback-routing.module';
import { FeedbackComponent } from './feedback.component';
import { FeedbackSentComponent } from './sent/sent.component';
import { UtilsModule } from '../utils/utils.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { RecaptchaModule } from 'ng-recaptcha';
import { RecaptchaFormsModule } from 'ng-recaptcha/forms';

@NgModule({
  declarations: [FeedbackComponent, FeedbackSentComponent],
  imports: [
    CommonModule,
    FeedbackRoutingModule,
    UtilsModule,
    TranslateModule,
    FormsModule,
    RecaptchaModule.forRoot(),
    RecaptchaFormsModule
  ]
})
export class FeedbackModule { }
