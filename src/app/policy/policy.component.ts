import { Component, Injectable } from '@angular/core';
import { PageEnvService } from '../services/page-env.service';

@Component({
  selector: 'app-policy',
  templateUrl: './policy.component.html'
})
@Injectable()
export class PolicyComponent {
  constructor(private pageEnv: PageEnvService) {
    setTimeout(
      () =>
        this.pageEnv.set({
          layout: {
            needRight: true
          },
          nameTranslated: $localize `Index page`,
          pageId: 1
        }),
      0
    );
  }
}
