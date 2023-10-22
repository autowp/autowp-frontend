import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ItemType} from '@grpc/spec.pb';
import {ACLService, Privilege, Resource} from '@services/acl.service';
import {APIItem, ItemService} from '@services/item';
import {ItemParentService} from '@services/item-parent';
import {PageEnvService} from '@services/page-env.service';
import {APIPicture, PictureService} from '@services/picture';
import {Observable, combineLatest, of} from 'rxjs';
import {debounceTime, distinctUntilChanged, map, shareReplay, switchMap, tap} from 'rxjs/operators';

import {CategoriesService} from '../../service';

interface PictureRoute {
  picture: APIPicture;
  route: string[];
}

@Component({
  selector: 'app-categories-category-item',
  templateUrl: './item.component.html',
})
export class CategoriesCategoryItemComponent {
  protected readonly isModer$ = this.acl.isAllowed$(Resource.GLOBAL, Privilege.MODERATE);

  private readonly categoryData$ = this.categoriesService.categoryPipe$(this.route.parent).pipe(
    tap(({current}) => {
      this.pageEnv.set({
        pageId: 22,
        title: current.name_text,
      });
    }),
    shareReplay(1),
  );

  private readonly page$ = this.route.queryParamMap.pipe(
    map((query) => parseInt(query.get('page'), 10)),
    distinctUntilChanged(),
    debounceTime(10),
  );

  protected readonly itemParents$ = combineLatest([this.categoryData$, this.page$]).pipe(
    switchMap(([{category, current, pathCatnames}, page]) =>
      this.itemParentService
        .getItems$({
          fields: [
            'item.name_html,item.name_default,item.description,item.has_text,item.produced,item.accepted_pictures_count',
            'item.design,item.engine_vehicles',
            'item.can_edit_specs,item.specs_route',
            'item.twins_groups',
            'item.childs_count,item.total_pictures,item.preview_pictures.picture.name_text',
          ].join(','),
          limit: 7,
          order: 'categories_first',
          page,
          parent_id: current.id,
        })
        .pipe(
          map((response) => ({
            items: response.items.map((itemParent) => ({
              item: itemParent,
              parentRouterLink: [
                '/category',
                ...(itemParent.item.item_type_id === ItemType.ITEM_TYPE_CATEGORY
                  ? [itemParent.item.catname]
                  : [category.catname, ...pathCatnames, itemParent.catname]),
              ],
            })),
            paginator: response.paginator,
          })),
        ),
    ),
    shareReplay(1),
  );

  protected readonly pictures$: Observable<PictureRoute[]> = combineLatest([
    this.categoryData$,
    this.itemParents$,
  ]).pipe(
    switchMap(([{category, current, pathCatnames}, itemParents]) => {
      if (current.item_type_id === ItemType.ITEM_TYPE_CATEGORY || itemParents.items.length <= 0) {
        return of([]);
      }

      return this.pictureService
        .getPictures$({
          exact_item_id: current.id,
          fields: 'thumb_medium,name_text',
          limit: 4,
        })
        .pipe(
          map((response) =>
            response.pictures.map((picture) => ({
              picture,
              route: [
                '/category',
                category.catname,
                ...(current.item_type_id === ItemType.ITEM_TYPE_CATEGORY ? [] : pathCatnames),
                'pictures',
                picture.identity,
              ],
            })),
          ),
        );
    }),
  );

  protected readonly currentRouterLinkPrefix$ = this.categoryData$.pipe(
    map(({category, current, pathCatnames}) => {
      if (!category) {
        return null;
      }

      if (current.item_type_id === ItemType.ITEM_TYPE_CATEGORY) {
        return ['/category', current.catname];
      }

      return ['/category', category.catname, ...pathCatnames];
    }),
  );

  protected readonly item$: Observable<APIItem> = combineLatest([this.categoryData$, this.itemParents$]).pipe(
    switchMap(([{current}, itemParents]) => {
      if (current.item_type_id === ItemType.ITEM_TYPE_CATEGORY || itemParents.items.length > 0) {
        return of(null);
      }

      return this.itemService.getItem$(current.id, {
        fields: [
          'catname,name_html,name_default,description,has_text,produced,accepted_pictures_count',
          'design,engine_vehicles',
          'can_edit_specs,specs_route',
          'twins_groups',
          'childs_count,total_pictures,preview_pictures.picture.name_text',
        ].join(','),
      });
    }),
  );

  protected readonly current$: Observable<APIItem> = this.categoryData$.pipe(
    map(({current}) => current),
    shareReplay(1),
  );

  constructor(
    private readonly itemService: ItemService,
    private readonly itemParentService: ItemParentService,
    private readonly pictureService: PictureService,
    private readonly pageEnv: PageEnvService,
    private readonly route: ActivatedRoute,
    private readonly acl: ACLService,
    private readonly categoriesService: CategoriesService,
  ) {}
}
