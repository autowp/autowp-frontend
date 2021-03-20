import { Component, Injectable } from '@angular/core';
import { PageEnvService } from '../../../services/page-env.service';

@Component({
  selector: 'app-donate-vod-success',
  templateUrl: './success.component.html'
})
@Injectable()
export class DonateVodSuccessComponent {
  constructor(private pageEnv: PageEnvService) {
    setTimeout(
      () =>
        this.pageEnv.set({
          layout: {
            needRight: true
          },
          nameTranslated: $localize `Donate`,
          pageId: 196
        }),
      0
    );
  }
}
