import {AfterViewInit, Component} from '@angular/core';
import {ItemType} from '@grpc/spec.pb';
import {PageEnvService} from '@services/page-env.service';

@Component({
  selector: 'app-moder-index',
  templateUrl: './index.component.html',
})
export class ModerIndexComponent implements AfterViewInit {
  protected readonly ItemType = ItemType;

  constructor(private readonly pageEnv: PageEnvService) {}

  ngAfterViewInit() {
    setTimeout(
      () =>
        this.pageEnv.set({
          layout: {isAdminPage: true},
          pageId: 67,
        }),
      0,
    );
  }
}
