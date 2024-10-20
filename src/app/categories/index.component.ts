import {Component, inject, OnInit} from '@angular/core';
import {ItemType} from '@grpc/spec.pb';
import {ItemService} from '@services/item';
import {PageEnvService} from '@services/page-env.service';
import {map} from 'rxjs/operators';

import {chunkBy} from '../chunk';

@Component({
  selector: 'app-categories-index',
  templateUrl: './index.component.html',
})
export class CategoriesIndexComponent implements OnInit {
  private readonly itemService = inject(ItemService);
  private readonly pageEnv = inject(PageEnvService);

  protected readonly items$ = this.itemService
    .getItems$({
      fields: 'name_html,front_picture.thumb_medium,descendants_count',
      limit: 30,
      no_parent: true,
      type_id: ItemType.ITEM_TYPE_CATEGORY, // category
    })
    .pipe(map((response) => chunkBy(response.items, 4)));

  ngOnInit(): void {
    setTimeout(() => this.pageEnv.set({pageId: 22}), 0);
  }
}
