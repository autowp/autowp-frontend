import {Component, AfterViewInit} from '@angular/core';
import {PageEnvService} from '@services/page-env.service';
import {ItemType} from '@grpc/spec.pb';

@Component({
  selector: 'app-moder-index',
  templateUrl: './index.component.html',
})
export class ModerIndexComponent implements AfterViewInit {
  public readonly ItemType = ItemType;

  constructor(private pageEnv: PageEnvService) {}

  ngAfterViewInit() {
    setTimeout(
      () =>
        this.pageEnv.set({
          layout: {isAdminPage: true},
          pageId: 67,
        }),
      0
    );
  }
}
