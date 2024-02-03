import {Component} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {ItemFields, ItemType, ListItemsRequest} from '@grpc/spec.pb';
import {ItemsClient} from '@grpc/spec.pbsc';
import {ACLService, Privilege, Resource} from '@services/acl.service';
import {APIItem} from '@services/item';
import {LanguageService} from '@services/language';
import {PageEnvService} from '@services/page-env.service';
import {getItemTypeTranslation} from '@utils/translations';
import {Observable} from 'rxjs';
import {map, shareReplay, tap} from 'rxjs/operators';

import {CategoriesService} from '../service';

interface PathItem {
  childs: {active: boolean; nameHtml: string; routerLink: string[]}[];
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
    shareReplay(1),
  );

  protected readonly current$: Observable<APIItem> = this.categoryData$.pipe(
    map(({current}) => current),
    shareReplay(1),
  );

  protected readonly category$: Observable<{queryParams: Params; title: string}> = this.categoryData$.pipe(
    map(({category}) => ({
      queryParams: {item_type_id: category.item_type_id, parent_id: category.id},
      title: getItemTypeTranslation(category.item_type_id, 'add-sub-item'),
    })),
    shareReplay(1),
  );

  protected readonly path$: Observable<PathItem[]> = this.categoryData$.pipe(
    map(({pathItems}) =>
      pathItems.map((pi) => ({
        childs: [],
        item: pi.item,
        loaded: pi.loaded,
        parent_id: pi.parent_id,
        routerLink: pi.routerLink,
      })),
    ),
    shareReplay(1),
  );

  protected readonly layoutParams$ = this.pageEnv.layoutParams$.asObservable();

  constructor(
    private readonly pageEnv: PageEnvService,
    private readonly route: ActivatedRoute,
    private readonly acl: ACLService,
    private readonly categoriesService: CategoriesService,
    private readonly itemsClient: ItemsClient,
    private readonly languageService: LanguageService,
  ) {}

  protected dropdownOpenChange(item: PathItem) {
    if (!item.loaded) {
      this.itemsClient
        .list(
          new ListItemsRequest({
            fields: new ItemFields({
              nameHtml: true,
            }),
            language: this.languageService.language,
            limit: 50,
            noParent: item.parent_id ? null : true,
            parent: new ListItemsRequest({
              id: '' + item.parent_id,
            }),
            typeId: ItemType.ITEM_TYPE_CATEGORY,
          }),
        )
        .subscribe((response) => {
          item.loaded = true;
          item.childs = response.items.map((i) => ({
            active: i.id === item.item.id.toString(),
            nameHtml: i.nameHtml,
            routerLink: ['/category', i.catname],
          }));
        });
    }
  }

  protected readonly ItemType = ItemType;
}
