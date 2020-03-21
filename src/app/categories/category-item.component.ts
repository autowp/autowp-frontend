import { Component, Injectable, OnInit, OnDestroy } from '@angular/core';
import { ItemService, APIItem } from '../services/item';
import { Subscription, of } from 'rxjs';
import { PageEnvService } from '../services/page-env.service';
import { ActivatedRoute } from '@angular/router';
import {switchMap, tap, map} from 'rxjs/operators';
import { ACLService } from '../services/acl.service';
import { APIPaginator } from '../services/api.service';
import { APIItemParent, ItemParentService } from '../services/item-parent';
import { PictureService, APIPicture } from '../services/picture';
import { CatagoriesService } from './service';

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

@Component({
  selector: 'app-categories-category-item',
  templateUrl: './category-item.component.html'
})
@Injectable()
export class CategoriesCategoryItemComponent implements OnInit, OnDestroy {
  private sub: Subscription;
  public current: APIItem;
  public category: APIItem;
  private pathCatnames: string[] = [];
  public items: ItemParentRoute[] = [];
  public isModer = false;
  public canAddCar = false;
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
    this.acl
      .inheritsRole('moder')
      .subscribe(isModer => (this.isModer = isModer));
    this.acl
      .isAllowed('car', 'add')
      .subscribe(canAddCar => (this.canAddCar = canAddCar));

    this.sub = this.categoriesService.categoryPipe(this.route)
      .pipe(
        tap(data => {
          this.current = data.current;
          this.category = data.category;
          this.path = data.pathItems;
          this.pathCatnames = data.pathCatnames;
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
            current: data.current,
            page: parseInt(query.get('page'), 10)
          }))
        )),
        switchMap(
          data => this.itemParentService
            .getItems({
              fields: [
                'item.name_html,item.name_default,item.description,item.has_text,item.produced,item.accepted_pictures_count',
                'item.design,item.engine_vehicles',
                'item.can_edit_specs,item.specs_route',
                'item.twins_groups',
                'item.childs_count,item.total_pictures,item.preview_pictures.picture.name_text'
              ].join(','),
              limit: 7,
              page: data.page,
              parent_id: data.current.id,
              order: 'categories_first'
            })
            .pipe(
              tap(response => {
                const items: ItemParentRoute[] = [];
                for (const itemParent of response.items) {
                  items.push({
                    item: itemParent,
                    parentRouterLink: this.itemRouterLink(itemParent)
                  });
                }
                this.items = items;
                this.paginator = response.paginator;
              }),
              map(response => ({
                items: response.items,
                current: data.current
              }))
            )
        ),
        switchMap(data => {
          this.pictures = null;
          this.item = null;

          if (data.current.item_type_id === 3) {
            return of(null);
          }

          if (data.items.length > 0) {
            return this.pictureService
              .getPictures({
                exact_item_id: data.current.id,
                limit: 4,
                fields: 'thumb_medium,name_text'
              })
              .pipe(
                tap(response => {
                  const pictures: PictureRoute[] = [];
                  for (const pic of response.pictures) {
                    pictures.push({
                      picture: pic,
                      route: this.pictureRouterLink(pic)
                    });
                  }

                  this.pictures = pictures;
                })
              );
          }

          return this.itemService
            .getItem(data.current.id, {
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
                this.currentRouterLinkPrefix = this.getCurrentRouterLinkPrefix();
              })
            );
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  private pictureRouterLink(picture: APIPicture): string[] {
    if (!this.category) {
      return null;
    }

    return this.currentRouterLink().concat(['pictures', picture.identity]);
  }

  private currentRouterLink(): string[] {
    if (this.current.item_type_id === 3) {
      return ['/category', this.current.catname];
    }

    return ['/category', this.category.catname].concat(this.pathCatnames);
  }

  private itemRouterLink(itemParent: APIItemParent): string[] {
    if (itemParent.item.item_type_id === 3) {
      return ['/category', itemParent.item.catname];
    }

    return ['/category', this.category.catname].concat(this.pathCatnames, [
      itemParent.catname
    ]);
  }

  private getCurrentRouterLinkPrefix(): string[] {
    if (! this.category) {
      return null;
    }

    if (this.current.item_type_id === 3) {
      return ['/category', this.current.catname];
    }

    return [
      '/category',
      this.category.catname
    ].concat(this.pathCatnames);
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

}
