import {AsyncPipe} from '@angular/common';
import {Component, inject, OnInit} from '@angular/core';
import {RouterLink} from '@angular/router';
import {PerspectivePage} from '@grpc/spec.pb';
import {AutowpClient} from '@grpc/spec.pbsc';
import {Empty} from '@ngx-grpc/well-known-types';
import {PageEnvService} from '@services/page-env.service';
import {getPerspectiveTranslation} from '@utils/translations';
import {EMPTY, Observable} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

import {ToastsService} from '../../toasts/toasts.service';

@Component({
  imports: [RouterLink, AsyncPipe],
  selector: 'app-moder-perspectives',
  standalone: true,
  templateUrl: './perspectives.component.html',
})
export class ModerPerspectivesComponent implements OnInit {
  private readonly grpc = inject(AutowpClient);
  private readonly pageEnv = inject(PageEnvService);
  private readonly toastService = inject(ToastsService);

  protected readonly pages$: Observable<PerspectivePage[]> = this.grpc.getPerspectivePages(new Empty()).pipe(
    catchError((response: unknown) => {
      this.toastService.handleError(response);
      return EMPTY;
    }),
    map((response) => (response.items ? response.items : [])),
  );

  ngOnInit(): void {
    setTimeout(
      () =>
        this.pageEnv.set({
          layout: {isAdminPage: true},
          pageId: 202,
        }),
      0,
    );
  }

  protected getPerspectiveTranslation(id: string): string {
    return getPerspectiveTranslation(id);
  }
}
