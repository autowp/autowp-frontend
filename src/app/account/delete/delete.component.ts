import {Component, inject, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {APIDeleteUserRequest} from '@grpc/spec.pb';
import {UsersClient} from '@grpc/spec.pbsc';
import {GrpcStatusEvent} from '@ngx-grpc/common';
import {AuthService} from '@services/auth.service';
import {PageEnvService} from '@services/page-env.service';
import {InvalidParams, InvalidParamsPipe} from '@utils/invalid-params.pipe';
import {MarkdownComponent} from '@utils/markdown/markdown.component';
import {EMPTY} from 'rxjs';
import {switchMap} from 'rxjs/operators';

import {extractFieldViolations, fieldViolations2InvalidParams} from '../../grpc';
import {ToastsService} from '../../toasts/toasts.service';

@Component({
  imports: [MarkdownComponent, FormsModule, InvalidParamsPipe],
  selector: 'app-account-delete',
  templateUrl: './delete.component.html',
})
export class AccountDeleteComponent implements OnInit {
  readonly #router = inject(Router);
  readonly #auth = inject(AuthService);
  readonly #pageEnv = inject(PageEnvService);
  readonly #toastService = inject(ToastsService);
  readonly #usersGrpc = inject(UsersClient);

  protected readonly form = {
    password_old: '',
  };
  protected invalidParams?: InvalidParams;

  ngOnInit(): void {
    setTimeout(() => this.#pageEnv.set({pageId: 137}), 0);
  }

  protected submit() {
    this.#auth.user$
      .pipe(
        switchMap((user) =>
          user
            ? this.#usersGrpc.deleteUser(
                new APIDeleteUserRequest({
                  password: this.form.password_old,
                  userId: user.id,
                }),
              )
            : EMPTY,
        ),
      )
      .subscribe({
        error: (response: unknown) => {
          this.#toastService.handleError(response);
          if (response instanceof GrpcStatusEvent && response.statusCode === 3) {
            const fieldViolations = extractFieldViolations(response);
            this.invalidParams = fieldViolations2InvalidParams(fieldViolations);
          }
        },
        next: () => {
          this.#auth.signOut$().subscribe();
          this.#router.navigate(['/account/delete/deleted']);
        },
      });
  }
}
