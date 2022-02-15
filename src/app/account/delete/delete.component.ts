import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { PageEnvService } from '../../services/page-env.service';
import {ToastsService} from '../../toasts/toasts.service';
import {UsersClient} from '../../../../generated/spec.pbsc';
import {APIDeleteUserRequest} from '../../../../generated/spec.pb';
import {extractFieldViolations, fieldViolations2InvalidParams} from '../../grpc';
import {InvalidParams} from '../../utils/invalid-params.pipe';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-account-delete',
  templateUrl: './delete.component.html'
})
export class AccountDeleteComponent {
  public form = {
    password_old: ''
  };
  public invalidParams: InvalidParams;

  constructor(
    private router: Router,
    private auth: AuthService,
    private pageEnv: PageEnvService,
    private toastService: ToastsService,
    private usersGrpc: UsersClient
  ) {
    setTimeout(
      () =>
        this.pageEnv.set({
          layout: {
            needRight: false
          },
          nameTranslated: $localize `Account delete`,
          pageId: 137
        }),
      0
    );
  }

  public submit() {
    this.auth.getUser().pipe(
      switchMap(user => this.usersGrpc.deleteUser(new APIDeleteUserRequest({
        userId: user.id,
        password: this.form.password_old
      })))
    ).subscribe(
      () => {
        this.auth.signOut();
        this.router.navigate(['/account/delete/deleted']);
      },
      response => {
        this.toastService.grpcErrorResponse(response);
        if (response.statusCode === 3) {
          const fieldViolations = extractFieldViolations(response);
          this.invalidParams = fieldViolations2InvalidParams(fieldViolations);
        }
      }
    );
  }
}
