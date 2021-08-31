import { Component} from '@angular/core';
import { PageEnvService } from '../../services/page-env.service';
import {ToastsService} from '../../toasts/toasts.service';
import {InvalidParams} from '../../utils/invalid-params.pipe';
import {UsersClient} from '../../../../generated/spec.pbsc';
import {APISetPasswordRequest} from '../../../../generated/spec.pb';
import {extractFieldViolations, fieldVolations2InvalidParams} from '../../grpc';
import {GrpcStatusEvent} from '@ngx-grpc/common';

@Component({
  selector: 'app-account-access',
  templateUrl: './access.component.html'
})
export class AccountAccessComponent {
  public invalidParams: InvalidParams = {};
  public form = {
    oldPassword: null,
    newPassword: null,
    newPasswordConfirm: null
  };

  constructor(
    private pageEnv: PageEnvService,
    private toastService: ToastsService,
    private grpc: UsersClient
  ) {
    setTimeout(
      () =>
        this.pageEnv.set({
          layout: {
            needRight: false
          },
          nameTranslated: $localize `Access Control`,
          pageId: 133
        }),
      0
    );
  }

  public submit() {
    this.invalidParams = {};

    this.grpc.setPassword(new APISetPasswordRequest(this.form)).subscribe(
      () => {
        this.form = {
          oldPassword: null,
          newPassword: null,
          newPasswordConfirm: null
        };

        this.toastService.success($localize `Password successfully changed`);
      },
      (response: GrpcStatusEvent) => {
        this.toastService.grpcErrorResponse(response);
        if (response.statusCode === 3) {
          const fieldViolations = extractFieldViolations(response);
          this.invalidParams = fieldVolations2InvalidParams(fieldViolations);
        }
      }
    );
  }
}
