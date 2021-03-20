import { Component, Injectable } from '@angular/core';
import { PageEnvService } from '../../../services/page-env.service';

@Component({
  selector: 'app-account-delete-deleted',
  templateUrl: './deleted.component.html'
})
@Injectable()
export class AccountDeletedComponent {
  constructor(private pageEnv: PageEnvService) {
    setTimeout(
      () =>
        this.pageEnv.set({
          layout: {
            needRight: true
          },
          nameTranslated: $localize `Message sent`,
          pageId: 93
        }),
      0
    );
  }
}
