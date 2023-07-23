import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ItemType} from '@grpc/spec.pb';
import {ACLService, Privilege, Resource} from '@services/acl.service';
import {APIItem, ItemService} from '@services/item';
import {PageEnvService} from '@services/page-env.service';
import {getItemTypeTranslation} from '@utils/translations';
import {Observable} from 'rxjs';
import {map, shareReplay, tap} from 'rxjs/operators';

import {CategoriesService} from '../service';

interface PathItem {
  childs: APIItem[];
  item: APIItem;
  loaded: boolean;
  parent_id: number;
  routerLink: string[];
}

@Component({
  selector: 'app-categories-category',
  templateUrl: './category.component.html',
})
export class CategoriesCategoryComponent {
  protected readonly isModer$ = this.acl.isAllowed$(Resource.GLOBAL, Privilege.MODERATE);
  protected readonly canAddCar$ = this.acl.isAllowed$(Resource.CAR, Privilege.ADD);

  private readonly categoryData$ = this.categoriesService.categoryPipe$(this.route).pipe(
    tap(({current}) => {
      setTimeout(() => {
        this.pageEnv.set({
          pageId: 22,
          title: current.name_text,
        });
      }, 0);
    }),
    shareReplay(1)
  );

  protected readonly current$: Observable<APIItem> = this.categoryData$.pipe(
    map(({current}) => current),
    shareReplay(1)
  );

  protected readonly category$: Observable<APIItem> = this.categoryData$.pipe(
    map(({category}) => category),
    shareReplay(1)
  );

  protected readonly path$: Observable<PathItem[]> = this.categoryData$.pipe(
    map(({pathItems}) => pathItems),
    shareReplay(1)
  );

  protected readonly layoutParams$ = this.pageEnv.layoutParams$.asObservable();

  constructor(
    private readonly itemService: ItemService,
    private readonly pageEnv: PageEnvService,
    private readonly route: ActivatedRoute,
    private readonly acl: ACLService,
    private readonly categoriesService: CategoriesService
  ) {}

  protected dropdownOpenChange(item: PathItem) {
    if (!item.loaded) {
      this.itemService
        .getItems$({
          fields: 'catname,name_html',
          limit: 50,
          no_parent: item.parent_id ? null : true,
          parent_id: item.parent_id,
          type_id: ItemType.ITEM_TYPE_CATEGORY,
        })
        .subscribe((response) => {
          item.loaded = true;
          item.childs = response.items;
        });
    }
  }

  protected getItemTypeTranslation(id: number, type: string) {
    return getItemTypeTranslation(id, type);
  }
}
