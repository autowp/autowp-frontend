import { Component} from '@angular/core';
import { PageEnvService } from '../../services/page-env.service';

@Component({
  selector: 'app-restore-password-sent',
  templateUrl: './sent.component.html'
})
export class RestorePasswordSentComponent {
  constructor(private pageEnv: PageEnvService) {
    setTimeout(
      () =>
        this.pageEnv.set({
          layout: {
            needRight: true
          },
          nameTranslated: $localize `Password recovery`,
          pageId: 60
        }),
      0
    );
  }
}
