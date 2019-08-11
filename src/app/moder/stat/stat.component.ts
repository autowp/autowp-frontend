import { Component, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PageEnvService } from '../../services/page-env.service';
import {ToastsService} from '../../toasts/toasts.service';

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
  templateUrl: './stat.component.html'
})
@Injectable()
export class ModerStatComponent {
  public items: StatItem[] = [];

  constructor(private http: HttpClient, private pageEnv: PageEnvService, private toastService: ToastsService) {
    setTimeout(
      () =>
        this.pageEnv.set({
          layout: {
            isAdminPage: true,
            needRight: false
          },
          name: 'page/119/name',
          pageId: 119
        }),
      0
    );

    this.http.get<APIStatGlobalSummary>('/api/stat/global-summary').subscribe(
      response => {
        this.items = response.items;
      },
      response => this.toastService.response(response)
    );
  }
}
