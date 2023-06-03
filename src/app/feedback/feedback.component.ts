import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ReCaptchaService} from '@services/recaptcha';
import {PageEnvService} from '@services/page-env.service';
import {ToastsService} from '../toasts/toasts.service';
import {AutowpClient} from '@grpc/spec.pbsc';
import {APICreateFeedbackRequest} from '@grpc/spec.pb';
import {InvalidParams} from '@utils/invalid-params.pipe';
import {extractFieldViolations, fieldViolations2InvalidParams} from '../grpc';
import {FormBuilder, Validators} from '@angular/forms';
import {GrpcStatusEvent} from '@ngx-grpc/common';

const CAPTCHA = 'captcha';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
})
export class FeedbackComponent implements OnInit {
  protected recaptchaKey: string;
  protected invalidParams: InvalidParams;

  protected readonly form = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(255)]],
    email: ['', [Validators.required, Validators.maxLength(255), Validators.email]],
    message: ['', [Validators.required, Validators.maxLength(65536)]],
    captcha: '',
  });

  constructor(
    private readonly grpc: AutowpClient,
    private readonly router: Router,
    private readonly reCaptchaService: ReCaptchaService,
    private readonly pageEnv: PageEnvService,
    private readonly toastService: ToastsService,
    private readonly fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form.removeControl(CAPTCHA);

    this.reCaptchaService.get$().subscribe({
      next: (response) => {
        this.recaptchaKey = response.publicKey;
      },
      error: (response: unknown) => this.toastService.handleError(response),
    });

    setTimeout(() => this.pageEnv.set({pageId: 89}), 0);
  }

  protected submit() {
    this.grpc.createFeedback(new APICreateFeedbackRequest(this.form.value)).subscribe({
      next: () => {
        this.router.navigate(['/feedback/sent']);
      },
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
    });
  }

  protected resolved(captchaResponse: string) {
    this.form.get(CAPTCHA).setValue(captchaResponse);
  }
}
