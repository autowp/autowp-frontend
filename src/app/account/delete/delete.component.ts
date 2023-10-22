import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {APIDeleteUserRequest} from '@grpc/spec.pb';
import {UsersClient} from '@grpc/spec.pbsc';
import {GrpcStatusEvent} from '@ngx-grpc/common';
import {AuthService} from '@services/auth.service';
import {PageEnvService} from '@services/page-env.service';
import {InvalidParams} from '@utils/invalid-params.pipe';
import {switchMap} from 'rxjs/operators';

import {extractFieldViolations, fieldViolations2InvalidParams} from '../../grpc';
import {ToastsService} from '../../toasts/toasts.service';

@Component({
  selector: 'app-account-delete',
  templateUrl: './delete.component.html',
})
export class AccountDeleteComponent implements OnInit {
  protected readonly form = {
    password_old: '',
  };
  protected invalidParams: InvalidParams;

  constructor(
    private readonly router: Router,
    private readonly auth: AuthService,
    private readonly pageEnv: PageEnvService,
    private readonly toastService: ToastsService,
    private readonly usersGrpc: UsersClient,
  ) {}

  ngOnInit(): void {
    setTimeout(() => this.pageEnv.set({pageId: 137}), 0);
  }

  protected submit() {
    this.auth
      .getUser$()
      .pipe(
        switchMap((user) =>
          this.usersGrpc.deleteUser(
            new APIDeleteUserRequest({
              password: this.form.password_old,
              userId: user.id,
            }),
          ),
        ),
      )
      .subscribe({
        error: (response: unknown) => {
          this.toastService.handleError(response);
          if (response instanceof GrpcStatusEvent && response.statusCode === 3) {
            const fieldViolations = extractFieldViolations(response);
            this.invalidParams = fieldViolations2InvalidParams(fieldViolations);
          }
        },
        next: () => {
          this.auth.signOut$();
          this.router.navigate(['/account/delete/deleted']);
        },
      });
  }
}
