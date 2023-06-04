import {Component, OnInit} from '@angular/core';
import {APIUser} from '@services/user';
import {PageEnvService} from '@services/page-env.service';
import {ToastsService} from '../../toasts/toasts.service';
import {APIService} from '@services/api.service';
import {environment} from '@environment/environment';
import {EMPTY, Observable} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

@Component({
  selector: 'app-account-email',
  templateUrl: './email.component.html',
})
export class AccountEmailComponent implements OnInit {
  protected readonly email$: Observable<string | null> = this.api
    .request<APIUser>('GET', 'user/me', {params: {fields: 'email'}})
    .pipe(
      catchError((error: unknown) => {
        this.toastService.handleError(error);
        return EMPTY;
      }),
      map((response) => response.email)
    );

  protected readonly changeEmailUrl =
    environment.keycloak.url + '/realms/' + environment.keycloak.realm + '/account/#/personal-info';

  constructor(
    private readonly api: APIService,
    private readonly pageEnv: PageEnvService,
    private readonly toastService: ToastsService
  ) {}

  ngOnInit(): void {
    setTimeout(() => this.pageEnv.set({pageId: 55}), 0);
  }
}
