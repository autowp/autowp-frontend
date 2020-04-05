import { Component, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ReCaptchaService } from '../services/recaptcha';
import { PageEnvService } from '../services/page-env.service';
import {ToastsService} from '../toasts/toasts.service';
import { APIService } from '../services/api.service';

@Component({
  selector: 'app-restore-password',
  templateUrl: './restore-password.component.html'
})
@Injectable()
export class RestorePasswordComponent {
  public recaptchaKey: string;
  public showCaptcha = false;
  public form = {
    email: '',
    captcha: ''
  };
  public invalidParams: any;
  public failure = false;

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
            needRight: false
          },
          name: 'page/60/name',
          pageId: 60
        }),
      0
    );
  }

  public submit() {
    this.api
      .request('POST', 'restore-password/request', {body: this.form})
      .subscribe(
        () => {
          this.router.navigate(['/restore-password/sent']);
        },
        response => {
          this.failure = response.status === 404;
          if (response.status === 400) {
            this.invalidParams = response.error.invalid_params;

            this.showCaptcha = response.error.invalid_params && response.error.invalid_params.captcha;
          } else if (response.status !== 404) {
            this.toastService.response(response);
          }
        }
      );
  }
}
