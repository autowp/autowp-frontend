import { Component, Injectable, OnInit, OnDestroy } from '@angular/core';
import { ItemService, APIItem } from '../services/item';
import { Subscription } from 'rxjs';
import { PageEnvService } from '../services/page-env.service';
import { chunkBy } from '../chunk';

@Component({
  selector: 'app-categories-index',
  templateUrl: './index.component.html'
})
@Injectable()
export class CategoriesIndexComponent implements OnInit, OnDestroy {
  private sub: Subscription;
  public items: APIItem[][] = [];

  constructor(
    private itemService: ItemService,
    private pageEnv: PageEnvService
  ) {}

  ngOnInit(): void {
    setTimeout(
      () =>
        this.pageEnv.set({
          layout: {
            needRight: false
          },
          name: 'page/22/name',
          pageId: 22
        }),
      0
    );

    this.sub = this.itemService
      .getItems({
        fields: 'name_html,catname,front_picture.thumb_medium,descendants_count',
        limit: 30,
        type_id: 3, // category
        no_parent: true,
        order: 'name_nat'
      })
      .subscribe(response => {
        this.items = chunkBy(response.items, 4);
      });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
