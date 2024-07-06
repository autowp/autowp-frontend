import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UtilsModule} from '@utils/utils.module';
import {RecaptchaFormsModule, RecaptchaModule} from 'ng-recaptcha-2';

import {ToastsModule} from '../toasts/toasts.module';
import {FeedbackComponent} from './feedback.component';
import {FeedbackRoutingModule} from './feedback-routing.module';
import {FeedbackSentComponent} from './sent/sent.component';

@NgModule({
  declarations: [FeedbackComponent, FeedbackSentComponent],
  imports: [
    CommonModule,
    FeedbackRoutingModule,
    UtilsModule,
    FormsModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    ToastsModule,
    ReactiveFormsModule,
  ],
})
export class FeedbackModule {}
