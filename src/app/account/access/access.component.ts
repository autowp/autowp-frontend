import {Component, inject, OnInit} from '@angular/core';
import {RouterLink} from '@angular/router';
import {environment} from '@environment/environment';
import {PageEnvService} from '@services/page-env.service';

@Component({
  imports: [RouterLink],
  selector: 'app-account-access',
  standalone: true,
  templateUrl: './access.component.html',
})
export class AccountAccessComponent implements OnInit {
  private readonly pageEnv = inject(PageEnvService);

  protected readonly changePasswordUrl =
    environment.keycloak.url + '/realms/' + environment.keycloak.realm + '/account/#/security/device-activity';

  ngOnInit(): void {
    setTimeout(() => this.pageEnv.set({pageId: 133}), 0);
  }
}
