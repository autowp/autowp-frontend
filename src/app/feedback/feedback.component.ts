import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { ReCaptchaService } from '../services/recaptcha';
import { PageEnvService } from '../services/page-env.service';
import {ToastsService} from '../toasts/toasts.service';
import {AutowpClient} from '../../../generated/spec.pbsc';
import {APICreateFeedbackRequest} from '../../../generated/spec.pb';
import {InvalidParams} from '../utils/invalid-params.pipe';
import {extractFieldViolations, fieldViolations2InvalidParams} from '../grpc';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html'
})
export class FeedbackComponent {
  public form = {
    name: '',
    email: '',
    message: '',
    captcha: ''
  };
  public recaptchaKey: string;
  public showCaptcha = true;
  public invalidParams: InvalidParams;

  constructor(
    private grpc: AutowpClient,
    private router: Router,
    private reCaptchaService: ReCaptchaService,
    private pageEnv: PageEnvService,
    private toastService: ToastsService
  ) {
    this.reCaptchaService.get().subscribe(
      response => {
        this.recaptchaKey = response.publicKey;
      },
      response => this.toastService.response(response)
    );

    setTimeout(
      () =>
        this.pageEnv.set({
          layout: {
            needRight: false
          },
          nameTranslated: $localize `Feedback`,
          pageId: 89
        }),
      0
    );
  }

  public submit() {
    this.grpc.createFeedback(new APICreateFeedbackRequest(this.form)).subscribe(
      () => {
        this.router.navigate(['/feedback/sent']);
      },
      response => {

        const fieldViolations = extractFieldViolations(response);
        this.invalidParams = fieldViolations2InvalidParams(fieldViolations);

        this.showCaptcha = !!this.invalidParams.captcha;

        // this.toastService.response(response);
      }
    );
  }


}
