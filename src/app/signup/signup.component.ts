import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { ReCaptchaService } from '../services/recaptcha';
import { PageEnvService } from '../services/page-env.service';
import {ToastsService} from '../toasts/toasts.service';
import {UsersClient} from '../../../generated/spec.pbsc';
import {APICreateUserRequest} from '../../../generated/spec.pb';
import {extractFieldViolations, fieldVolations2InvalidParams} from '../grpc';
import {GrpcStatusEvent} from '@ngx-grpc/common';
import {LanguageService} from '../services/language';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html'
})
export class SignupComponent {
  public recaptchaKey: string;
  public showCaptcha = false;
  public form = {
    email: '',
    name: '',
    password: '',
    passwordConfirm: '',
    captcha: ''
  };
  public invalidParams: any;

  constructor(
    private router: Router,
    private reCaptchaService: ReCaptchaService,
    private pageEnv: PageEnvService,
    private toastService: ToastsService,
    private usersGrpc: UsersClient,
    private languageService: LanguageService
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
            needRight: true
          },
          nameTranslated: $localize `Registration`,
          pageId: 52
        }),
      0
    );
  }

  public submit() {
    this.usersGrpc.createUser(new APICreateUserRequest({...this.form, language: this.languageService.language})).subscribe(
      () => {
        this.router.navigate(['/signup/ok']);
      },
      (response: GrpcStatusEvent) => {
        this.toastService.grpcErrorResponse(response);
        if (response.statusCode === 3) {
          const fieldViolations = extractFieldViolations(response);
          this.invalidParams = fieldVolations2InvalidParams(fieldViolations);

          this.showCaptcha = !!this.invalidParams.captcha;
        }
      }
    );
  }
}
