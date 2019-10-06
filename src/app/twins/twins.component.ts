import { Component, Injectable, OnInit, OnDestroy } from '@angular/core';
import { APIPaginator } from '../services/api.service';
import { ItemService, APIItem } from '../services/item';
import { Subscription, of } from 'rxjs';
import { PageEnvService } from '../services/page-env.service';
import { tap, switchMap, map} from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { chunkBy } from '../chunk';
import { ACLService } from '../services/acl.service';

@Component({
  selector: 'app-twins',
  templateUrl: './twins.component.html'
})
@Injectable()
export class TwinsComponent implements OnInit, OnDestroy {
  private sub: Subscription;
  public paginator: APIPaginator;
  public groups: APIItem[] = [];
  public canEdit = false;
  public currentBrandCatname: string;
  public brand: APIItem;

  constructor(
    private itemService: ItemService,
    private route: ActivatedRoute,
    private pageEnv: PageEnvService,
    private acl: ACLService
  ) {}

  ngOnInit(): void {
    setTimeout(
      () =>
        this.pageEnv.set({
          layout: {
            needRight: false
          },
          name: 'page/25/name',
          pageId: 25
        }),
      0
    );

    this.acl
      .isAllowed('twins', 'edit')
      .subscribe(canEdit => (this.canEdit = canEdit));

    this.sub = this.route.params
      .pipe(
        switchMap(route => {
          this.currentBrandCatname = route.brand;

          if (!route.brand) {
            return of(null);
          }
          return this.itemService.getItems({
            catname: route.brand,
            fields: 'name_only,catname',
            limit: 1,
            type_id: 5 // brand
          });
        }),
        map(response =>
          response && response.items.length > 0 ? response.items[0] : null
        ),
        tap(brand => {
          this.brand = brand;
          setTimeout(() => {
            if (brand) {
              this.pageEnv.set({
                layout: {
                  needRight: false
                },
                nameTranslated: brand.name_only,
                pageId: 153
              });
            } else {
              this.pageEnv.set({
                layout: {
                  needRight: false
                },
                name: 'page/25/name',
                pageId: 25
              });
            }
          }, 0);
        }),
        switchMap(brand => this.route.queryParams.pipe(
          map(query => ({
            brand: brand,
            query: query
          }))
        )),
        switchMap(params => {
          return this.itemService.getItems({
            type_id: 4,
            limit: 20,
            fields:
              'name_text,name_html,has_child_specs,accepted_pictures_count,comments_topic_stat,childs.name_html,' +
              'childs.front_picture.thumb_medium,childs.front_picture.name_text',
            page: params.query.page,
            have_common_childs_with: params.brand ? params.brand.id : null
          });
        }),
        tap(response => {
          this.groups = response.items;
          this.paginator = response.paginator;
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  public chunk(items: APIItem[]): APIItem[][] {
    return chunkBy(items, 3);
  }

  public hasMoreImages(group: APIItem): boolean {
    let count = 0;
    if (group.childs) {
      for (const item of group.childs) {
        if (item.front_picture) {
          count++;
        }
      }
    }
    return group.accepted_pictures_count > count;
  }
}
