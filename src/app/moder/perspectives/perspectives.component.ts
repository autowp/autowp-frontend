import { Component, Injectable } from '@angular/core';
import {
  APIPerspectivePage,
  APIPerspectivePageGetResponse,
  APIService
} from '../../services/api.service';
import { PageEnvService } from '../../services/page-env.service';
import { getPerspectiveTranslation } from '../../utils/translations';

@Component({
  selector: 'app-moder-perspectives',
  templateUrl: './perspectives.component.html'
})
@Injectable()
export class ModerPerspectivesComponent {
  public pages: APIPerspectivePage[];

  constructor(private api: APIService, private pageEnv: PageEnvService) {
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

    this.api
      .request<APIPerspectivePageGetResponse>('GET', 'perspective-page', {
        params: {
          fields: 'groups.perspectives'
        }
      })
      .subscribe(
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
