import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { ReCaptchaService } from '../services/recaptcha';
import { PageEnvService } from '../services/page-env.service';
import {ToastsService} from '../toasts/toasts.service';
import { APIService } from '../services/api.service';

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
  public invalidParams: any;

  constructor(
    private api: APIService,
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
    this.api.request<void>('POST', 'feedback', {body: this.form}).subscribe(
      () => {
        this.router.navigate(['/feedback/sent']);
      },
      response => {
        if (response.status === 400) {
          this.invalidParams = response.error.invalid_params;

          this.showCaptcha = response.error.invalid_params.captcha;
        } else {
          this.toastService.response(response);
        }
      }
    );
  }
}
