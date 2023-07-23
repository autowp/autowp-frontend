import {Component, OnInit} from '@angular/core';
import {environment} from '@environment/environment';
import {PageEnvService} from '@services/page-env.service';

@Component({
  selector: 'app-account-access',
  templateUrl: './access.component.html',
})
export class AccountAccessComponent implements OnInit {
  protected readonly changePasswordUrl =
    environment.keycloak.url + '/realms/' + environment.keycloak.realm + '/account/#/security/device-activity';

  constructor(private readonly pageEnv: PageEnvService) {}

  ngOnInit(): void {
    setTimeout(() => this.pageEnv.set({pageId: 133}), 0);
  }
}
