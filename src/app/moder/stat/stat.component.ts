import {Component} from '@angular/core';
import {PageEnvService} from '../../services/page-env.service';
import {ToastsService} from '../../toasts/toasts.service';
import {APIService} from '../../services/api.service';

interface StatItem {
  name: string;
  value: number;
  total: number;
}

interface APIStatGlobalSummary {
  items: StatItem[];
}

@Component({
  selector: 'app-moder-stat',
  templateUrl: './stat.component.html',
})
export class ModerStatComponent {
  public items: StatItem[] = [];

  constructor(private api: APIService, private pageEnv: PageEnvService, private toastService: ToastsService) {
    setTimeout(
      () =>
        this.pageEnv.set({
          layout: {isAdminPage: true},
          pageId: 119,
        }),
      0
    );

    this.api.request<APIStatGlobalSummary>('GET', 'stat/global-summary').subscribe({
      next: (response) => {
        this.items = response.items;
      },
      error: (response: unknown) => this.toastService.handleError(response),
    });
  }
}
