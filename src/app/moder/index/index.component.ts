import { Component, AfterViewInit } from '@angular/core';
import { PageEnvService } from '../../services/page-env.service';

@Component({
  selector: 'app-moder-index',
  templateUrl: './index.component.html'
})
export class ModerIndexComponent implements AfterViewInit {
  constructor(private pageEnv: PageEnvService) {}

  ngAfterViewInit() {
    setTimeout(
      () =>
        this.pageEnv.set({
          layout: {isAdminPage: true},
          pageId: 67
        }),
      0
    );
  }
}
