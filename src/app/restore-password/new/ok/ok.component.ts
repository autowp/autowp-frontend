import { Component} from '@angular/core';
import { PageEnvService } from '../../../services/page-env.service';

@Component({
  selector: 'app-restore-password-new-ok',
  templateUrl: './ok.component.html'
})
export class RestorePasswordNewOkComponent {
  constructor(private pageEnv: PageEnvService) {
    setTimeout(
      () =>
        this.pageEnv.set({
          layout: {
            needRight: true
          },
          nameTranslated: $localize `New password saved`,
          pageId: 135
        }),
      0
    );
  }
}
