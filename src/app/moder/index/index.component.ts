import {AfterViewInit, Component, inject} from '@angular/core';
import {RouterLink} from '@angular/router';
import {ItemType} from '@grpc/spec.pb';
import {PageEnvService} from '@services/page-env.service';

@Component({
  imports: [RouterLink],
  selector: 'app-moder-index',
  templateUrl: './index.component.html',
})
export class ModerIndexComponent implements AfterViewInit {
  private readonly pageEnv = inject(PageEnvService);

  protected readonly ItemType = ItemType;

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
