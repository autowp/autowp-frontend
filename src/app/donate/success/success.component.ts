import { Component} from '@angular/core';
import { PageEnvService } from '../../services/page-env.service';

@Component({
  selector: 'app-donate-success',
  templateUrl: './success.component.html'
})
export class DonateSuccessComponent {
  constructor(private pageEnv: PageEnvService) {
    setTimeout(
      () =>
        this.pageEnv.set({
          layout: {
            needRight: true
          },
          pageId: 196
        }),
      0
    );
  }
}
