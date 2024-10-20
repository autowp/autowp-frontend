import {Component, inject, OnInit} from '@angular/core';
import {PageEnvService} from '@services/page-env.service';
import {EMPTY} from 'rxjs';
import {catchError} from 'rxjs/operators';

import {APIAttrsService} from '../../api/attrs/attrs.service';
import {ToastsService} from '../../toasts/toasts.service';

@Component({
  selector: 'app-moder-attrs',
  templateUrl: './attrs.component.html',
})
export class ModerAttrsComponent implements OnInit {
  private readonly attrsService = inject(APIAttrsService);
  private readonly pageEnv = inject(PageEnvService);
  private readonly toastService = inject(ToastsService);

  protected readonly attributes$ = this.attrsService.getAttributes$(null, null).pipe(
    catchError((response: unknown) => {
      this.toastService.handleError(response);
      return EMPTY;
    }),
  );

  protected readonly zones$ = this.attrsService.zones$.pipe(
    catchError((response: unknown) => {
      this.toastService.handleError(response);
      return EMPTY;
    }),
  );

  ngOnInit(): void {
    setTimeout(
      () =>
        this.pageEnv.set({
          layout: {isAdminPage: true},
          pageId: 100,
        }),
      0,
    );
  }
}
