import {Component} from '@angular/core';
import {PerspectivePage} from '@grpc/spec.pb';
import {AutowpClient} from '@grpc/spec.pbsc';
import {Empty} from '@ngx-grpc/well-known-types';
import {PageEnvService} from '@services/page-env.service';
import {getPerspectiveTranslation} from '@utils/translations';

import {ToastsService} from '../../toasts/toasts.service';

@Component({
  selector: 'app-moder-perspectives',
  templateUrl: './perspectives.component.html',
})
export class ModerPerspectivesComponent {
  protected pages: PerspectivePage[];

  constructor(
    private readonly grpc: AutowpClient,
    private readonly pageEnv: PageEnvService,
    private readonly toastService: ToastsService,
  ) {
    setTimeout(
      () =>
        this.pageEnv.set({
          layout: {isAdminPage: true},
          pageId: 202,
        }),
      0,
    );

    this.grpc.getPerspectivePages(new Empty()).subscribe({
      error: (response: unknown) => this.toastService.handleError(response),
      next: (response) => {
        this.pages = response.items;
      },
    });
  }

  protected getPerspectiveTranslation(id: string): string {
    return getPerspectiveTranslation(id);
  }
}
