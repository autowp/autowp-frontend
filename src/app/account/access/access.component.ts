import { Component} from '@angular/core';
import { PageEnvService } from '../../services/page-env.service';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-account-access',
  templateUrl: './access.component.html'
})
export class AccountAccessComponent {

  public changePasswordUrl = environment.keycloak.url + '/realms/' + environment.keycloak.realm + '/account/#/security/device-activity';

  constructor(
    private pageEnv: PageEnvService,
  ) {
    setTimeout(
      () =>
        this.pageEnv.set({
          layout: {
            needRight: false
          },
          nameTranslated: $localize `Access Control`,
          pageId: 133
        }),
      0
    );
  }

}
