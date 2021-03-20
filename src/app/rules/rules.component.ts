import { Component, Injectable } from '@angular/core';
import { PageEnvService } from '../services/page-env.service';

@Component({
  selector: 'app-rules',
  templateUrl: './rules.component.html'
})
@Injectable()
export class RulesComponent {
  constructor(private pageEnv: PageEnvService) {
    setTimeout(
      () =>
        this.pageEnv.set({
          layout: {
            needRight: true
          },
          nameTranslated: $localize `Rules`,
          pageId: 106
        }),
      0
    );
  }
}
