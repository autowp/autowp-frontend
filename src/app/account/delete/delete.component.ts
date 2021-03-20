import { Component, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { PageEnvService } from '../../services/page-env.service';
import {ToastsService} from '../../toasts/toasts.service';
import { APIService } from '../../services/api.service';

@Component({
  selector: 'app-account-delete',
  templateUrl: './delete.component.html'
})
@Injectable()
export class AccountDeleteComponent {
  public form = {
    password_old: ''
  };
  public invalidParams: any;

  constructor(
    private api: APIService,
    private router: Router,
    private auth: AuthService,
    private pageEnv: PageEnvService,
    private toastService: ToastsService
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
    this.api.request<void>('PUT', 'user/me', {body: {
      password_old: this.form.password_old,
      deleted: 1
    }}).subscribe(
      () => {
        this.auth.signOut();
        this.router.navigate(['/account/delete/deleted']);
      },
      response => {
        if (response.status === 400) {
          this.invalidParams = response.error.invalid_params;
        } else {
          this.toastService.response(response);
        }
      }
    );
  }
}
