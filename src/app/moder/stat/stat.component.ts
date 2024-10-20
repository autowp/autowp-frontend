import {Component, inject, OnInit} from '@angular/core';
import {ItemsClient} from '@grpc/spec.pbsc';
import {Empty} from '@ngx-grpc/well-known-types';
import {PageEnvService} from '@services/page-env.service';
import {EMPTY} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

import {ToastsService} from '../../toasts/toasts.service';

@Component({
  selector: 'app-moder-stat',
  templateUrl: './stat.component.html',
})
export class ModerStatComponent implements OnInit {
  private readonly pageEnv = inject(PageEnvService);
  private readonly toastService = inject(ToastsService);
  private readonly itemsClient = inject(ItemsClient);

  protected readonly items$ = this.itemsClient.getStats(new Empty()).pipe(
    catchError((response: unknown) => {
      this.toastService.handleError(response);
      return EMPTY;
    }),
    map((response) => response.values),
  );

  ngOnInit(): void {
    setTimeout(
      () =>
        this.pageEnv.set({
          layout: {isAdminPage: true},
          pageId: 119,
        }),
      0,
    );
  }
}
