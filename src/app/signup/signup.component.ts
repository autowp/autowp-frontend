import { Component, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ReCaptchaService } from '../services/recaptcha';
import { PageEnvService } from '../services/page-env.service';
import {ToastsService} from '../toasts/toasts.service';
import { APIService } from '../services/api.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html'
})
@Injectable()
export class SignupComponent {
  public recaptchaKey: string;
  public showCaptcha = false;
  public form = {
    email: '',
    name: '',
    password: '',
    password_confirm: '',
    captcha: ''
  };
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
        this.showCaptcha = !response.success;
      },
      response => this.toastService.response(response)
    );
    setTimeout(
      () =>
        this.pageEnv.set({
          layout: {
            needRight: true
          },
          nameTranslated: $localize `Registration`,
          pageId: 52
        }),
      0
    );
  }

  public submit() {
    this.api.request<void>('POST', 'user', {body: this.form}).subscribe(
      () => {
        this.router.navigate(['/signup/ok']);
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
