import {Component} from '@angular/core';
import {APIUser} from '../../services/user';
import {PageEnvService} from '../../services/page-env.service';
import {ToastsService} from '../../toasts/toasts.service';
import {APIService} from '../../services/api.service';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-account-email',
  templateUrl: './email.component.html',
})
export class AccountEmailComponent {
  public email: string | null = null;

  public changeEmailUrl =
    environment.keycloak.url + '/realms/' + environment.keycloak.realm + '/account/#/personal-info';

  constructor(private api: APIService, private pageEnv: PageEnvService, private toastService: ToastsService) {
    setTimeout(() => this.pageEnv.set({pageId: 55}), 0);
    this.api.request<APIUser>('GET', 'user/me', {params: {fields: 'email'}}).subscribe({
      next: (response) => {
        this.email = response.email;
      },
      error: (response) => this.toastService.response(response),
    });
  }
}
