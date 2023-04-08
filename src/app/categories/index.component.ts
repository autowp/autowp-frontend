import {Component, OnInit} from '@angular/core';
import {ItemService} from '@services/item';
import {PageEnvService} from '@services/page-env.service';
import {chunkBy} from '../chunk';
import {map} from 'rxjs/operators';
import {ItemType} from '@grpc/spec.pb';

@Component({
  selector: 'app-categories-index',
  templateUrl: './index.component.html',
})
export class CategoriesIndexComponent implements OnInit {
  public readonly items$ = this.itemService
    .getItems$({
      fields: 'name_html,front_picture.thumb_medium,descendants_count',
      limit: 30,
      type_id: ItemType.ITEM_TYPE_CATEGORY, // category
      no_parent: true,
    })
    .pipe(map((response) => chunkBy(response.items, 4)));

  constructor(private readonly itemService: ItemService, private readonly pageEnv: PageEnvService) {}

  ngOnInit(): void {
    setTimeout(() => this.pageEnv.set({pageId: 22}), 0);
  }
}
