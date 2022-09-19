import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { ReCaptchaService } from '../services/recaptcha';
import { PageEnvService } from '../services/page-env.service';
import {ToastsService} from '../toasts/toasts.service';
import {AutowpClient} from '../../../generated/spec.pbsc';
import {APICreateFeedbackRequest} from '../../../generated/spec.pb';
import {InvalidParams} from '../utils/invalid-params.pipe';
import {extractFieldViolations, fieldViolations2InvalidParams} from '../grpc';
import {FormBuilder, Validators} from '@angular/forms';

const CAPTCHA = 'captcha';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html'
})
export class FeedbackComponent implements OnInit {
  public recaptchaKey: string;
  public invalidParams: InvalidParams;

  public form = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(255)]],
    email: ['', [Validators.required, Validators.maxLength(255), Validators.email]],
    message: ['', [Validators.required, Validators.maxLength(65536)]],
    captcha: ''
  });

  constructor(
    private grpc: AutowpClient,
    private router: Router,
    private reCaptchaService: ReCaptchaService,
    private pageEnv: PageEnvService,
    private toastService: ToastsService,
    private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.form.removeControl(CAPTCHA);

    this.reCaptchaService.get().subscribe({
      next: response => {
        this.recaptchaKey = response.publicKey;
      },
      error: response => this.toastService.response(response)
    });

    setTimeout(
      () =>
        this.pageEnv.set({
          layout: {
            needRight: false
          },
          pageId: 89
        }),
      0
    );
  }

  public submit() {
    this.grpc.createFeedback(new APICreateFeedbackRequest(this.form.value)).subscribe({
      next: () => {
        this.router.navigate(['/feedback/sent']);
      },
      error: response => {

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
        // this.toastService.response(response);
      }
    });
  }

  resolved(captchaResponse: string) {
    this.form.get(CAPTCHA).setValue(captchaResponse);
  }
}
