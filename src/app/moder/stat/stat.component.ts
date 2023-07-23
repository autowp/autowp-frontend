import {Component, OnInit} from '@angular/core';
import {APIService} from '@services/api.service';
import {PageEnvService} from '@services/page-env.service';
import {EMPTY, Observable} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

import {ToastsService} from '../../toasts/toasts.service';

interface StatItem {
  name: string;
  total: number;
  value: number;
}

interface APIStatGlobalSummary {
  items: StatItem[];
}

@Component({
  selector: 'app-moder-stat',
  templateUrl: './stat.component.html',
})
export class ModerStatComponent implements OnInit {
  protected readonly items$: Observable<StatItem[]> = this.api
    .request<APIStatGlobalSummary>('GET', 'stat/global-summary')
    .pipe(
      catchError((response: unknown) => {
        this.toastService.handleError(response);
        return EMPTY;
      }),
      map((response) => response.items)
    );

  constructor(
    private readonly api: APIService,
    private readonly pageEnv: PageEnvService,
    private readonly toastService: ToastsService
  ) {}

  ngOnInit(): void {
    setTimeout(
      () =>
        this.pageEnv.set({
          layout: {isAdminPage: true},
          pageId: 119,
        }),
      0
    );
  }
}
