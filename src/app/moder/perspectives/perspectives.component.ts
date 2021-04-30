import { Component} from '@angular/core';
import { PageEnvService } from '../../services/page-env.service';
import { getPerspectiveTranslation } from '../../utils/translations';
import {AutowpClient} from '../../../../generated/spec.pbsc';
import {Empty} from '@ngx-grpc/well-known-types';
import {PerspectivePage} from '../../../../generated/spec.pb';

@Component({
  selector: 'app-moder-perspectives',
  templateUrl: './perspectives.component.html'
})
export class ModerPerspectivesComponent {
  public pages: PerspectivePage[];

  constructor(private grpc: AutowpClient, private pageEnv: PageEnvService) {
    setTimeout(
      () =>
        this.pageEnv.set({
          layout: {
            isAdminPage: true,
            needRight: false
          },
          nameTranslated: $localize `Perspectives`,
          pageId: 202
        }),
      0
    );

    this.grpc.getPerspectivePages(new Empty()).subscribe(
      response => {
        this.pages = response.items;
      },
      response => console.log(response)
    );
  }

  public getPerspectiveTranslation(id: string): string {
    return getPerspectiveTranslation(id);
  }
}
