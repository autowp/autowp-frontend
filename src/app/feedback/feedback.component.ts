import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {APICreateFeedbackRequest} from '@grpc/spec.pb';
import {AutowpClient} from '@grpc/spec.pbsc';
import {GrpcStatusEvent} from '@ngx-grpc/common';
import {PageEnvService} from '@services/page-env.service';
import {ReCaptchaService} from '@services/recaptcha';
import {InvalidParams} from '@utils/invalid-params.pipe';

import {extractFieldViolations, fieldViolations2InvalidParams} from '../grpc';
import {ToastsService} from '../toasts/toasts.service';

const CAPTCHA = 'captcha';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
})
export class FeedbackComponent implements OnInit {
  protected recaptchaKey: string;
  protected invalidParams: InvalidParams;

  protected readonly form = this.fb.group({
    captcha: '',
    email: ['', [Validators.required, Validators.maxLength(255), Validators.email]],
    message: ['', [Validators.required, Validators.maxLength(65536)]],
    name: ['', [Validators.required, Validators.maxLength(255)]],
  });

  constructor(
    private readonly grpc: AutowpClient,
    private readonly router: Router,
    private readonly reCaptchaService: ReCaptchaService,
    private readonly pageEnv: PageEnvService,
    private readonly toastService: ToastsService,
    private readonly fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.form.removeControl(CAPTCHA);

    this.reCaptchaService.get$().subscribe({
      error: (response: unknown) => this.toastService.handleError(response),
      next: (response) => {
        this.recaptchaKey = response.publicKey;
      },
    });

    setTimeout(() => this.pageEnv.set({pageId: 89}), 0);
  }

  protected submit() {
    this.grpc.createFeedback(new APICreateFeedbackRequest(this.form.value)).subscribe({
      error: (response: unknown) => {
        if (response instanceof GrpcStatusEvent) {
          const fieldViolations = extractFieldViolations(response);
          this.invalidParams = fieldViolations2InvalidParams(fieldViolations);

          if (this.invalidParams.captcha) {
            if (!this.form.get(CAPTCHA)) {
              const control = this.fb.control('', Validators.required);
              this.form.addControl(CAPTCHA, control);
            }
          } else {
            this.form.removeControl(CAPTCHA);
          }
        } else {
          this.toastService.handleError(response);
        }
      },
      next: () => {
        this.router.navigate(['/feedback/sent']);
      },
    });
  }

  protected resolved(captchaResponse: string) {
    this.form.get(CAPTCHA).setValue(captchaResponse);
  }
}
