import {Component} from '@angular/core';
import {APIItem, ItemService} from '@services/item';
import {combineLatest, Observable, of} from 'rxjs';
import {PageEnvService} from '@services/page-env.service';
import {ActivatedRoute} from '@angular/router';
import {debounceTime, distinctUntilChanged, map, shareReplay, switchMap, tap} from 'rxjs/operators';
import {ACLService, Privilege, Resource} from '@services/acl.service';
import {ItemParentService} from '@services/item-parent';
import {APIPicture, PictureService} from '@services/picture';
import {CategoriesService} from '../../service';
import {ItemType} from '@grpc/spec.pb';

interface PictureRoute {
  picture: APIPicture;
  route: string[];
}

@Component({
  selector: 'app-categories-category-item',
  templateUrl: './item.component.html',
})
export class CategoriesCategoryItemComponent {
  public isModer$ = this.acl.isAllowed$(Resource.GLOBAL, Privilege.MODERATE);

  private categoryData$ = this.categoriesService.categoryPipe$(this.route.parent).pipe(
    tap(({current}) => {
      this.pageEnv.set({
        title: current.name_text,
        pageId: 22,
      });
    }),
    shareReplay(1)
  );

  private page$ = this.route.queryParamMap.pipe(
    map((query) => parseInt(query.get('page'), 10)),
    distinctUntilChanged(),
    debounceTime(10)
  );

  public itemParents$ = combineLatest([this.categoryData$, this.page$]).pipe(
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
          page,
          parent_id: current.id,
          order: 'categories_first',
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
          }))
        )
    ),
    shareReplay(1)
  );

  public pictures$: Observable<PictureRoute[]> = combineLatest([this.categoryData$, this.itemParents$]).pipe(
    switchMap(([{current, category, pathCatnames}, itemParents]) => {
      if (current.item_type_id === ItemType.ITEM_TYPE_CATEGORY || itemParents.items.length <= 0) {
        return of([]);
      }

      return this.pictureService
        .getPictures$({
          exact_item_id: current.id,
          limit: 4,
          fields: 'thumb_medium,name_text',
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
            }))
          )
        );
    })
  );

  public currentRouterLinkPrefix$ = this.categoryData$.pipe(
    map(({current, category, pathCatnames}) => {
      if (!category) {
        return null;
      }

      if (current.item_type_id === ItemType.ITEM_TYPE_CATEGORY) {
        return ['/category', current.catname];
      }

      return ['/category', category.catname, ...pathCatnames];
    })
  );

  public item$: Observable<APIItem> = combineLatest([this.categoryData$, this.itemParents$]).pipe(
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
    })
  );

  public current$: Observable<APIItem> = this.categoryData$.pipe(
    map(({current}) => current),
    shareReplay(1)
  );

  constructor(
    private itemService: ItemService,
    private itemParentService: ItemParentService,
    private pictureService: PictureService,
    private pageEnv: PageEnvService,
    private route: ActivatedRoute,
    private acl: ACLService,
    private categoriesService: CategoriesService
  ) {}
}
