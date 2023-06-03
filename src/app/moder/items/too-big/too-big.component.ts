import {Component, OnInit} from '@angular/core';
import {ItemService, APIItem} from '@services/item';
import {PageEnvService} from '@services/page-env.service';

@Component({
  selector: 'app-moder-items-too-big',
  templateUrl: './too-big.component.html',
})
export class ModerItemsTooBigComponent implements OnInit {
  protected loading = false;
  protected items: APIItem[];

  constructor(private readonly itemService: ItemService, private readonly pageEnv: PageEnvService) {}

  ngOnInit(): void {
    setTimeout(
      () =>
        this.pageEnv.set({
          pageId: 131,
          layout: {isAdminPage: true},
        }),
      0
    );

    this.loading = true;

    this.itemService
      .getItems$({
        order: 'childs_count',
        limit: 100,
        fields: 'childs_count,name_html',
      })
      .subscribe({
        next: (response) => {
          this.items = response.items;
          this.loading = false;
        },
        error: () => {
          this.loading = false;
        },
      });
  }
}
