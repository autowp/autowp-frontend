import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { ReCaptchaService } from '../services/recaptcha';
import { PageEnvService } from '../services/page-env.service';
import {ToastsService} from '../toasts/toasts.service';
import {AutowpClient} from '../../../generated/spec.pbsc';
import {APICreateFeedbackRequest, ErrorDetails} from '../../../generated/spec.pb';
import {GrpcStatusEvent} from '@ngx-grpc/common';
import {Status} from '../../../generated/google/rpc/status.pb';
import {BadRequest} from '../../../generated/google/rpc/error-details.pb';
import FieldViolation = BadRequest.FieldViolation;
import {InvalidParams} from '../utils/invalid-params.pipe';

const stringToUint8Array = (str: string): Uint8Array => {
  const buf = new ArrayBuffer(str.length);
  const bufView = new Uint8Array(buf);
  for (let i = 0; i < str.length; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return bufView;
};

const extractFieldViolations = (response: any): FieldViolation[] => {
  if (! (response instanceof GrpcStatusEvent)) {
    return [];
  }

  const statusEncoded = response.metadata.get('grpc-status-details-bin');
  if (! statusEncoded) {
    return [];
  }

  const statusDecoded = stringToUint8Array(atob(statusEncoded))
  const status = Status.deserializeBinary(statusDecoded);

  const fieldViolations: FieldViolation[] = [];
  status.details.forEach(detail => {
    const deserialized = ErrorDetails.deserializeBinary(detail.serializeBinary());
    deserialized.debugInfo.stackEntries.forEach(value => {
      const fieldViolation = FieldViolation.deserializeBinary(stringToUint8Array(value));
      fieldViolations.push(fieldViolation)
    });
  });

  return fieldViolations;
}

const fieldVolations2InvalidParams = (fvs: FieldViolation[]) : InvalidParams => {
  const result: InvalidParams = {};

  fvs.forEach(fv => {
    if (! result[fv.field]) {
      result[fv.field] = {};
    }
    result[fv.field][fv.description] = fv.description;
  });

  return result;
}

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
      response => {
        this.router.navigate(['/feedback/sent']);
      },
      response => {

        const fieldViolations = extractFieldViolations(response);
        this.invalidParams = fieldVolations2InvalidParams(fieldViolations);

        this.showCaptcha = !!this.invalidParams.captcha;

        // this.toastService.response(response);
      }
    );
  }


}
