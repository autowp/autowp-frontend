import {Component, inject, OnInit} from '@angular/core';
import {FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {APICreateFeedbackRequest} from '@grpc/spec.pb';
import {AutowpClient} from '@grpc/spec.pbsc';
import {GrpcStatusEvent} from '@ngx-grpc/common';
import {PageEnvService} from '@services/page-env.service';
import {ReCaptchaService} from '@services/recaptcha';
import {InvalidParams, InvalidParamsPipe} from '@utils/invalid-params.pipe';
import {MarkdownComponent} from '@utils/markdown/markdown.component';
import {RecaptchaModule} from 'ng-recaptcha-2';

import {extractFieldViolations, fieldViolations2InvalidParams} from '../grpc';
import {ToastsService} from '../toasts/toasts.service';

const CAPTCHA = 'captcha';

@Component({
  imports: [RouterLink, FormsModule, ReactiveFormsModule, RecaptchaModule, MarkdownComponent, InvalidParamsPipe],
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
})
export class FeedbackComponent implements OnInit {
  readonly #grpc = inject(AutowpClient);
  readonly #router = inject(Router);
  readonly #reCaptchaService = inject(ReCaptchaService);
  readonly #pageEnv = inject(PageEnvService);
  readonly #toastService = inject(ToastsService);
  readonly #fb = inject(NonNullableFormBuilder);

  protected recaptchaKey?: string;
  protected invalidParams?: InvalidParams;

  protected readonly form = this.#fb.group({
    captcha: '',
    email: ['', [Validators.required, Validators.maxLength(255), Validators.email]],
    message: ['', [Validators.required, Validators.maxLength(65536)]],
    name: ['', [Validators.required, Validators.maxLength(255)]],
  });

  ngOnInit(): void {
    this.form.removeControl(CAPTCHA as never);

    this.#reCaptchaService.get$().subscribe({
      error: (response: unknown) => this.#toastService.handleError(response),
      next: (response) => {
        this.recaptchaKey = response.publicKey;
      },
    });

    setTimeout(() => this.#pageEnv.set({pageId: 89}), 0);
  }

  protected submit() {
    const formValue = this.form.value;
    this.#grpc
      .createFeedback(
        new APICreateFeedbackRequest({
          captcha: formValue.captcha,
          email: formValue.email,
          message: formValue.message,
          name: formValue.name,
        }),
      )
      .subscribe({
        error: (response: unknown) => {
          if (response instanceof GrpcStatusEvent) {
            const fieldViolations = extractFieldViolations(response);
            this.invalidParams = fieldViolations2InvalidParams(fieldViolations);

            if (this.invalidParams['captcha']) {
              if (!this.form.get(CAPTCHA)) {
                const control = this.#fb.control('', Validators.required);
                this.form.addControl(CAPTCHA, control);
              }
            } else {
              this.form.removeControl(CAPTCHA as never);
            }
          } else {
            this.#toastService.handleError(response);
          }
        },
        next: () => {
          this.#router.navigate(['/feedback/sent']);
        },
      });
  }

  protected resolved(captchaResponse: null | string) {
    if (captchaResponse) {
      this.form.get(CAPTCHA)?.setValue(captchaResponse);
    }
  }
}
