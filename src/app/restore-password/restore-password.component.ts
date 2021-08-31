import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { ReCaptchaService } from '../services/recaptcha';
import { PageEnvService } from '../services/page-env.service';
import {ToastsService} from '../toasts/toasts.service';
import {UsersClient} from '../../../generated/spec.pbsc';
import {APIPasswordRecoveryRequest} from '../../../generated/spec.pb';
import {extractFieldViolations, fieldVolations2InvalidParams} from '../grpc';
import {GrpcStatusEvent} from '@ngx-grpc/common';
import {InvalidParams} from '../utils/invalid-params.pipe';

@Component({
  selector: 'app-restore-password',
  templateUrl: './restore-password.component.html'
})
export class RestorePasswordComponent {
  public recaptchaKey: string;
  public showCaptcha = false;
  public form = {
    email: '',
    captcha: ''
  };
  public invalidParams: InvalidParams;

  constructor(
    private router: Router,
    private reCaptchaService: ReCaptchaService,
    private pageEnv: PageEnvService,
    private toastService: ToastsService,
    private grpc: UsersClient
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
          nameTranslated: $localize `Password recovery`,
          pageId: 60
        }),
      0
    );
  }

  public submit() {
    this.grpc.passwordRecovery(new APIPasswordRecoveryRequest(this.form)).subscribe(
      () => {
        this.router.navigate(['/restore-password/sent']);
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
