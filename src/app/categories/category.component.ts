import { Component, Injectable, OnInit, OnDestroy } from '@angular/core';
import { ItemService, APIItem } from '../services/item';
import { Subscription } from 'rxjs';
import { PageEnvService } from '../services/page-env.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap, map, tap, switchMapTo } from 'rxjs/operators';
import { ACLService } from '../services/acl.service';
import { APIPaginator } from '../services/api.service';

@Component({
  selector: 'app-categories-category',
  templateUrl: './category.component.html'
})
@Injectable()
export class CategoriesCategoryComponent implements OnInit, OnDestroy {
  private sub: Subscription;
  public category: APIItem;
  public items: APIItem[] = [];
  public isModer = false;
  public canAddCar = false;
  public paginator: APIPaginator;

  constructor(
    private itemService: ItemService,
    private pageEnv: PageEnvService,
    private route: ActivatedRoute,
    private acl: ACLService
  ) {}

  ngOnInit(): void {

    this.acl.inheritsRole('moder').subscribe(isModer => this.isModer = isModer);
    this.acl.isAllowed('car', 'add').subscribe(canAddCar => this.canAddCar = canAddCar);

    this.sub = this.route.paramMap.pipe(
      switchMap(params => {
        return this.itemService
          .getItems({
            fields: 'name_html,name_only,catname',
            limit: 1,
            type_id: 3, // category
            catname: params.get('category')
          });
      }),
      map(response => response.items.length > 0 ? response.items[0] : null),
      tap(category => {
        this.pageEnv.set({
          layout: {
            needRight: false
          },
          name: 'page/23/name',
          title: category.name_text,
          pageId: 23,
          args: {
            CATEGORY_SHORT_NAME: category.name_only,
            CATEGORY_NAME: category.name_only,
            CATEGORY_CATNAME: category.catname
          }
        });
      }),
      switchMapTo(this.route.queryParamMap,
        (category, query) => ({category, query})
      ),
      switchMap(data => {
        return this.itemService
          .getItems({
            fields: [
              'catname,name_html,name_default,description,has_text,produced',
              'design,engine_vehicles',
              'can_edit_specs,specs_url,more_pictures_url',
              'twins_groups',
              'preview_pictures.picture.thumb_medium,childs_count,total_pictures,preview_pictures.picture.name_text'
            ].join(','),
            limit: 7,
            page: parseInt(data.query.get('page'), 10),
            parent_id: data.category.id,
            order: 'categories_first'
          });
      }, (data, response) => ({
        category: data.category,
        items: response.items,
        paginator: response.paginator
      }))
    ).subscribe(data => {
      this.category = data.category;
      this.items = data.items;
      this.paginator = data.paginator;
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  public havePhoto(item: APIItem) {
    if (item.preview_pictures) {
      for (const picture of item.preview_pictures) {
        if (picture.picture) {
          return true;
        }
      }
    }
    return false;
  }

  public canHavePhoto(item: APIItem) {
    return [1, 2, 5, 6, 7].indexOf(item.item_type_id) !== -1;
  }
}
