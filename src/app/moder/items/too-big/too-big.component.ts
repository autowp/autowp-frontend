import { Component} from '@angular/core';
import { ItemService, APIItem } from '../../../services/item';
import { PageEnvService } from '../../../services/page-env.service';

@Component({
  selector: 'app-moder-items-too-big',
  templateUrl: './too-big.component.html'
})
export class ModerItemsTooBigComponent {
  public loading = false;
  public items: APIItem[];

  constructor(
    private itemService: ItemService,
    private pageEnv: PageEnvService
  ) {
    this.loading = true;
    setTimeout(
      () =>
        this.pageEnv.set({
          pageId: 131,
          layout: {isAdminPage: true},
        }),
      0
    );

    this.itemService
      .getItems({
        order: 'childs_count',
        limit: 100,
        fields: 'childs_count,name_html'
      })
      .subscribe({
        next: response => {
          this.items = response.items;
          this.loading = false;
        },
        error: () => {
          this.loading = false;
        }
      });
  }
}
