import {Component, OnInit} from '@angular/core';
import {APIItem, ItemService} from '@services/item';
import {PageEnvService} from '@services/page-env.service';

@Component({
  selector: 'app-moder-items-too-big',
  templateUrl: './too-big.component.html',
})
export class ModerItemsTooBigComponent implements OnInit {
  protected loading = false;
  protected items: APIItem[] = [];

  constructor(
    private readonly itemService: ItemService,
    private readonly pageEnv: PageEnvService,
  ) {}

  ngOnInit(): void {
    setTimeout(
      () =>
        this.pageEnv.set({
          layout: {isAdminPage: true},
          pageId: 131,
        }),
      0,
    );

    this.loading = true;

    this.itemService
      .getItems$({
        fields: 'childs_count,name_html',
        limit: 100,
        order: 'childs_count',
      })
      .subscribe({
        error: () => {
          this.loading = false;
        },
        next: (response) => {
          this.items = response.items;
          this.loading = false;
        },
      });
  }
}
