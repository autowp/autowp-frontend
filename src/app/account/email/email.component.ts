import { Component} from '@angular/core';
import { APIUser } from '../../services/user';
import { PageEnvService } from '../../services/page-env.service';
import {ToastsService} from '../../toasts/toasts.service';
import { APIService } from '../../services/api.service';
import {AutowpClient} from '../../../../generated/spec.pbsc';
import {APIEmailChangeRequest} from '../../../../generated/spec.pb';
import {InvalidParams} from '../../utils/invalid-params.pipe';
import {extractFieldViolations, fieldVolations2InvalidParams} from '../../grpc';

@Component({
  selector: 'app-account-email',
  templateUrl: './email.component.html'
})
export class AccountEmailComponent {
  public email: string | null = null;
  public newEmail: string | null = null;
  public invalidParams: InvalidParams;
  public sent = false;

  constructor(
    private api: APIService,
    private pageEnv: PageEnvService,
    private toastService: ToastsService,
    private grpc: AutowpClient
  ) {
    setTimeout(
      () =>
        this.pageEnv.set({
          layout: {
            needRight: false
          },
          nameTranslated: $localize `My e-mail`,
          pageId: 55
        }),
      0
    );
    this.api.request<APIUser>('GET', 'user/me', {params: {fields: 'email'}}).subscribe(
      response => {
        this.email = response.email;
        this.newEmail = response.email;
      },
      response => this.toastService.response(response)
    );
  }

  public submit() {
    this.invalidParams = {};

    this.grpc.emailChange(new APIEmailChangeRequest({email: this.newEmail})).subscribe(
      () => {
        this.sent = true;
      },
      response => {
        this.toastService.grpcErrorResponse(response);
        if (response.statusCode === 3) {
          const fieldViolations = extractFieldViolations(response);
          this.invalidParams = fieldVolations2InvalidParams(fieldViolations);
        }
      }
    );
  }
}
