import {Component, OnInit} from '@angular/core';
import {APIUser} from '@services/user';
import {PageEnvService} from '@services/page-env.service';
import {ToastsService} from '../../toasts/toasts.service';
import {APIService} from '@services/api.service';
import {environment} from '@environment/environment';

@Component({
  selector: 'app-account-email',
  templateUrl: './email.component.html',
})
export class AccountEmailComponent implements OnInit {
  protected email: string | null = null;

  protected readonly changeEmailUrl =
    environment.keycloak.url + '/realms/' + environment.keycloak.realm + '/account/#/personal-info';

  constructor(
    private readonly api: APIService,
    private readonly pageEnv: PageEnvService,
    private readonly toastService: ToastsService
  ) {}

  ngOnInit(): void {
    setTimeout(() => this.pageEnv.set({pageId: 55}), 0);
    this.api.request<APIUser>('GET', 'user/me', {params: {fields: 'email'}}).subscribe({
      next: (response) => {
        this.email = response.email;
      },
      error: (response: unknown) => this.toastService.handleError(response),
    });
  }
}
