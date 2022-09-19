import { Component, OnInit} from '@angular/core';
import {ItemService, APIItem, APIItemsGetResponse} from '../services/item';
import {of, combineLatest, Observable} from 'rxjs';
import { PageEnvService } from '../services/page-env.service';
import {tap, switchMap, map, distinctUntilChanged, debounceTime, shareReplay} from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { chunkBy } from '../chunk';
import {ACLService, Privilege, Resource} from '../services/acl.service';
import {APIPaginator} from '../services/api.service';

interface ChunkedGroup {
  item: APIItem;
  childs: APIItem[][];
  hasMoreImages: boolean;
}

@Component({
  selector: 'app-twins',
  templateUrl: './twins.component.html'
})
export class TwinsComponent implements OnInit {
  public canEdit$ = this.acl.isAllowed(Resource.CAR, Privilege.EDIT);

  private page$ = this.route.queryParamMap.pipe(
    map(query => parseInt(query.get('page'), 10)),
    distinctUntilChanged(),
    debounceTime(10)
  );

  public currentBrandCatname$ = this.route.paramMap.pipe(
    map(params => params.get('brand')),
    distinctUntilChanged(),
    debounceTime(10),
    shareReplay(1)
  );

  public brand$: Observable<APIItem|null> = this.currentBrandCatname$.pipe(
    switchMap(brand => {
      if (!brand) {
        return of(null as APIItemsGetResponse);
      }

      return this.itemService.getItems({
        catname: brand,
        fields: 'name_only,catname',
        limit: 1,
        type_id: 5 // brand
      });
    }),
    map(response =>
      response && response.items.length > 0 ? response.items[0] : null
    ),
    tap(brand => {
      setTimeout(() => {
        if (brand) {
          this.pageEnv.set({
            nameTranslated: brand.name_only,
            pageId: 153
          });
        } else {
          this.pageEnv.set({pageId: 25});
        }
      }, 0);
    }),
    shareReplay(1)
  );

  public data$: Observable<{
    groups: ChunkedGroup[],
    paginator: APIPaginator
  }> = combineLatest([this.page$, this.brand$]).pipe(
    switchMap(([page, brand]) => this.itemService.getItems({
      type_id: 4,
      limit: 20,
      fields:
        'name_text,name_html,has_child_specs,accepted_pictures_count,comments_topic_stat,childs.name_html,' +
        'childs.front_picture.thumb_medium,childs.front_picture.name_text',
      page: page,
      have_common_childs_with: brand ? brand.id : null
    })),
    map(response => ({
      groups: response.items.map(group => ({
        item: group,
        childs: chunkBy(group.childs, 3),
        hasMoreImages: TwinsComponent.hasMoreImages(group)
      })),
      paginator: response.paginator
    }))
  );

  constructor(
    private itemService: ItemService,
    private route: ActivatedRoute,
    private pageEnv: PageEnvService,
    private acl: ACLService
  ) {}

  private static hasMoreImages(group: APIItem): boolean {
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

  ngOnInit(): void {
    setTimeout(
      () =>
        this.pageEnv.set({
          pageId: 25
        }),
      0
    );
  }
}
