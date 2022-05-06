import {Component, OnDestroy, OnInit} from '@angular/core';
import {APIItem, ItemService} from '../services/item';
import {Observable, of, Subscription} from 'rxjs';
import {PageEnvService} from '../services/page-env.service';
import {ActivatedRoute} from '@angular/router';
import {map, switchMap, tap} from 'rxjs/operators';
import {ACLService, Privilege, Resource} from '../services/acl.service';
import {APIPaginator} from '../services/api.service';
import {APIItemParent, APIItemParentGetResponse, ItemParentService} from '../services/item-parent';
import {APIPicture, APIPictureGetResponse, PictureService} from '../services/picture';
import {CatagoriesService} from './service';
import { getItemTypeTranslation } from '../utils/translations';
import {ItemType} from '../../../generated/spec.pb';

interface PathItem {
  routerLink: string[];
  item: APIItem;
  loaded: boolean;
  childs: APIItem[];
  parent_id: number;
}

interface PictureRoute {
  picture: APIPicture;
  route: string[];
}

interface ItemParentRoute {
  item: APIItemParent;
  parentRouterLink: string[];
}

function currentRouterLink(category: APIItem, current: APIItem, pathCatnames: string[]): string[] {
  if (current.item_type_id === ItemType.ITEM_TYPE_CATEGORY) {
    return ['/category', current.catname];
  }

  return ['/category', category.catname].concat(pathCatnames);
}

function getCurrentRouterLinkPrefix(category: APIItem, current: APIItem, pathCatnames: string[]): string[] {
  if (! category) {
    return null;
  }

  if (current.item_type_id === ItemType.ITEM_TYPE_CATEGORY) {
    return ['/category', current.catname];
  }

  return [
    '/category',
    category.catname
  ].concat(pathCatnames);
}

function itemRouterLink(category: APIItem, pathCatnames: string[], itemParent: APIItemParent): string[] {
  if (itemParent.item.item_type_id === ItemType.ITEM_TYPE_CATEGORY) {
    return ['/category', itemParent.item.catname];
  }

  return ['/category', category.catname].concat(pathCatnames, [
    itemParent.catname
  ]);
}

@Component({
  selector: 'app-categories-category-item',
  templateUrl: './category-item.component.html'
})
export class CategoriesCategoryItemComponent implements OnInit, OnDestroy {
  private sub: Subscription;
  public current: APIItem;
  public category: APIItem;
  public items: ItemParentRoute[] = [];
  public isModer$ = this.acl.isAllowed(Resource.GLOBAL, Privilege.MODERATE);
  public canAddCar$ = this.acl.isAllowed(Resource.CAR, Privilege.ADD);
  public paginator: APIPaginator;
  public path: PathItem[];
  public pictures: PictureRoute[];
  public item: APIItem;
  public currentRouterLinkPrefix: string[];

  constructor(
    private itemService: ItemService,
    private itemParentService: ItemParentService,
    private pictureService: PictureService,
    private pageEnv: PageEnvService,
    private route: ActivatedRoute,
    private acl: ACLService,
    private categoriesService: CatagoriesService
  ) {}

  ngOnInit(): void {
    this.sub = this.categoriesService.categoryPipe(this.route)
      .pipe(
        tap(data => {
          this.current = data.current;
          this.category = data.category;
          this.path = data.pathItems;
          this.pageEnv.set({
            layout: {
              needRight: false
            },
            nameTranslated: data.current.name_text,
            pageId: 22
          });
        }),
        switchMap(data => this.route.queryParamMap.pipe(
          map(query => ({
            category: data.category,
            current: data.current,
            pathCatnames: data.pathCatnames,
            page: parseInt(query.get('page'), 10)
          }))
        )),
        switchMap(
          data => this.getItemParents(data.category, data.current, data.pathCatnames, data.page).pipe(
              map(response => ({
                items: response.items,
                category: data.category,
                current: data.current,
                pathCatnames: data.pathCatnames
              }))
            )
        ),
        switchMap(data => {
          this.pictures = null;
          this.item = null;

          if (data.current.item_type_id === ItemType.ITEM_TYPE_CATEGORY) {
            return of(null);
          }

          if (data.items.length > 0) {
            return this.getPictures(data.category, data.current, data.pathCatnames);
          }

          return this.getItems(data.category, data.current, data.pathCatnames);
        })
      )
      .subscribe();
  }

  private getItems(category: APIItem, current: APIItem, pathCatnames: string[]): Observable<APIItem> {
    return this.itemService
      .getItem(current.id, {
        fields: [
          'catname,name_html,name_default,description,has_text,produced,accepted_pictures_count',
          'design,engine_vehicles',
          'can_edit_specs,specs_route',
          'twins_groups',
          'childs_count,total_pictures,preview_pictures.picture.name_text'
        ].join(',')
      })
      .pipe(
        tap(item => {
          this.item = item;
          this.currentRouterLinkPrefix = getCurrentRouterLinkPrefix(category, current, pathCatnames);
        })
      );
  }

  private getItemParents(category: APIItem, current: APIItem, pathCatnames: string[], page: number): Observable<APIItemParentGetResponse> {
    return this.itemParentService
      .getItems({
        fields: [
          'item.name_html,item.name_default,item.description,item.has_text,item.produced,item.accepted_pictures_count',
          'item.design,item.engine_vehicles',
          'item.can_edit_specs,item.specs_route',
          'item.twins_groups',
          'item.childs_count,item.total_pictures,item.preview_pictures.picture.name_text'
        ].join(','),
        limit: 7,
        page,
        parent_id: current.id,
        order: 'categories_first'
      })
      .pipe(
        tap(response => {
          this.items = response.items.map(itemParent => ({
            item: itemParent,
            parentRouterLink: itemRouterLink(category, pathCatnames, itemParent)
          }));
          this.paginator = response.paginator;
        })
      );
  }

  private getPictures(category: APIItem, current: APIItem, pathCatnames: string[]): Observable<APIPictureGetResponse> {
    return this.pictureService
      .getPictures({
        exact_item_id: current.id,
        limit: 4,
        fields: 'thumb_medium,name_text'
      })
      .pipe(
        tap(response => {
          this.pictures = response.pictures.map(pic => ({
            picture: pic,
            route: currentRouterLink(category, current, pathCatnames).concat(['pictures', pic.identity])
          }));
        })
      );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  public dropdownOpenChange(item: PathItem) {
    if (!item.loaded) {

      this.itemService.getItems({
        fields: 'catname,name_html',
        parent_id: item.parent_id,
        no_parent: item.parent_id ? null : true,
        limit: 50,
        type_id: 3
      }).subscribe(response => {
        item.loaded = true;
        item.childs = response.items;
      });
    }
  }

  public getItemTypeTranslation(id: number, type: string) {
    return getItemTypeTranslation(id, type);
  }
}
