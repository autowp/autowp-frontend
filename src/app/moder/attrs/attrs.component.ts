import {Component, OnInit} from '@angular/core';
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

  constructor(
    private readonly attrsService: APIAttrsService,
    private readonly pageEnv: PageEnvService,
    private readonly toastService: ToastsService,
  ) {}

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
