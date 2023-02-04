import {Component} from '@angular/core';
import {PageEnvService} from '../../services/page-env.service';
import {getPerspectiveTranslation} from '../../utils/translations';
import {AutowpClient} from '@grpc/spec.pbsc';
import {Empty} from '@ngx-grpc/well-known-types';
import {PerspectivePage} from '@grpc/spec.pb';
import {ToastsService} from '../../toasts/toasts.service';

@Component({
  selector: 'app-moder-perspectives',
  templateUrl: './perspectives.component.html',
})
export class ModerPerspectivesComponent {
  public pages: PerspectivePage[];

  constructor(private grpc: AutowpClient, private pageEnv: PageEnvService, private toastService: ToastsService) {
    setTimeout(
      () =>
        this.pageEnv.set({
          layout: {isAdminPage: true},
          pageId: 202,
        }),
      0
    );

    this.grpc.getPerspectivePages(new Empty()).subscribe({
      next: (response) => {
        this.pages = response.items;
      },
      error: (response: unknown) => this.toastService.handleError(response),
    });
  }

  public getPerspectiveTranslation(id: string): string {
    return getPerspectiveTranslation(id);
  }
}
