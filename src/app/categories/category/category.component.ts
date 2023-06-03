import {Component} from '@angular/core';
import {APIItem, ItemService} from '@services/item';
import {Observable} from 'rxjs';
import {PageEnvService} from '@services/page-env.service';
import {ActivatedRoute} from '@angular/router';
import {map, shareReplay, tap} from 'rxjs/operators';
import {ACLService, Privilege, Resource} from '@services/acl.service';
import {CatagoriesService} from '../service';
import {getItemTypeTranslation} from '@utils/translations';
import {ItemType} from '@grpc/spec.pb';

interface PathItem {
  routerLink: string[];
  item: APIItem;
  loaded: boolean;
  childs: APIItem[];
  parent_id: number;
}

@Component({
  selector: 'app-categories-category',
  templateUrl: './category.component.html',
})
export class CategoriesCategoryComponent {
  public isModer$ = this.acl.isAllowed$(Resource.GLOBAL, Privilege.MODERATE);
  public canAddCar$ = this.acl.isAllowed$(Resource.CAR, Privilege.ADD);

  private categoryData$ = this.categoriesService.categoryPipe$(this.route).pipe(
    tap(({current}) => {
      setTimeout(() => {
        this.pageEnv.set({
          title: current.name_text,
          pageId: 22,
        });
      }, 0);
    }),
    shareReplay(1)
  );

  public current$: Observable<APIItem> = this.categoryData$.pipe(
    map(({current}) => current),
    shareReplay(1)
  );

  public category$: Observable<APIItem> = this.categoryData$.pipe(
    map(({category}) => category),
    shareReplay(1)
  );

  public path$: Observable<PathItem[]> = this.categoryData$.pipe(
    map(({pathItems}) => pathItems),
    shareReplay(1)
  );

  public layoutParams$ = this.pageEnv.layoutParams$.asObservable();

  constructor(
    private itemService: ItemService,
    private pageEnv: PageEnvService,
    private route: ActivatedRoute,
    private acl: ACLService,
    private categoriesService: CategoriesService
  ) {}

  public dropdownOpenChange(item: PathItem) {
    if (!item.loaded) {
      this.itemService
        .getItems$({
          fields: 'catname,name_html',
          parent_id: item.parent_id,
          no_parent: item.parent_id ? null : true,
          limit: 50,
          type_id: ItemType.ITEM_TYPE_CATEGORY,
        })
        .subscribe((response) => {
          item.loaded = true;
          item.childs = response.items;
        });
    }
  }

  public getItemTypeTranslation(id: number, type: string) {
    return getItemTypeTranslation(id, type);
  }
}
