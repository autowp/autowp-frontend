import { Component, Injectable } from '@angular/core';
import { PageEnvService } from '../../services/page-env.service';

@Component({
  selector: 'app-signup-ok',
  templateUrl: './ok.component.html'
})
@Injectable()
export class SignupOkComponent {
  constructor(private pageEnv: PageEnvService) {
    setTimeout(
      () =>
        this.pageEnv.set({
          layout: {
            needRight: true
          },
          nameTranslated: $localize `Successful registration`,
          pageId: 53
        }),
      0
    );
  }
}
