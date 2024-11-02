import {AsyncPipe} from '@angular/common';
import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {APIItem as GRPCAPIItem, ItemFields, ItemListOptions, ItemType, ListItemsRequest} from '@grpc/spec.pb';
import {ItemsClient} from '@grpc/spec.pbsc';
import {ACLService, Privilege, Resource} from '@services/acl.service';
import {APIPaginator} from '@services/api.service';
import {APIItem, ItemService} from '@services/item';
import {LanguageService} from '@services/language';
import {PageEnvService} from '@services/page-env.service';
import {combineLatest, Observable, of} from 'rxjs';
import {debounceTime, distinctUntilChanged, map, shareReplay, switchMap, tap} from 'rxjs/operators';

import {chunkBy} from '../chunk';
import {PaginatorComponent} from '../paginator/paginator/paginator.component';
import {TwinsSidebarComponent} from './sidebar.component';

interface ChunkedGroup {
  childs: APIItem[][];
  hasMoreImages: boolean;
  item: APIItem;
}

@Component({
  imports: [RouterLink, PaginatorComponent, TwinsSidebarComponent, AsyncPipe],
  selector: 'app-twins',
  standalone: true,
  templateUrl: './twins.component.html',
})
export class TwinsComponent implements OnInit {
  private readonly itemService = inject(ItemService);
  private readonly route = inject(ActivatedRoute);
  private readonly pageEnv = inject(PageEnvService);
  private readonly acl = inject(ACLService);
  private readonly itemsClient = inject(ItemsClient);
  private readonly languageService = inject(LanguageService);

  protected readonly canEdit$ = this.acl.isAllowed$(Resource.CAR, Privilege.EDIT);

  protected readonly page$ = this.route.queryParamMap.pipe(
    map((query) => parseInt(query.get('page') ?? '', 10)),
    distinctUntilChanged(),
    debounceTime(10),
  );

  protected readonly currentBrandCatname$ = this.route.paramMap.pipe(
    map((params) => params.get('brand')),
    distinctUntilChanged(),
    debounceTime(10),
    shareReplay({bufferSize: 1, refCount: false}),
  );

  protected readonly brand$: Observable<GRPCAPIItem | null> = this.currentBrandCatname$.pipe(
    switchMap((brand) => {
      if (!brand) {
        return of(null);
      }

      return this.itemsClient
        .list(
          new ListItemsRequest({
            fields: new ItemFields({
              nameOnly: true,
            }),
            language: this.languageService.language,
            limit: 1,
            options: new ItemListOptions({
              catname: brand,
              typeId: ItemType.ITEM_TYPE_BRAND,
            }),
          }),
        )
        .pipe(map((response) => (response?.items && response.items.length > 0 ? response.items[0] : null)));
    }),
    tap((brand) => {
      setTimeout(() => {
        if (brand) {
          this.pageEnv.set({
            pageId: 153,
            title: brand.nameOnly,
          });
        } else {
          this.pageEnv.set({pageId: 25});
        }
      }, 0);
    }),
    shareReplay({bufferSize: 1, refCount: false}),
  );

  protected readonly data$: Observable<{
    groups: ChunkedGroup[];
    paginator: APIPaginator;
  }> = combineLatest([this.page$, this.brand$]).pipe(
    switchMap(([page, brand]) =>
      this.itemService.getItems$({
        fields:
          'name_text,name_html,has_child_specs,accepted_pictures_count,comments_topic_stat,childs.name_html,' +
          'childs.front_picture.thumb_medium,childs.front_picture.name_text',
        have_common_childs_with: brand ? +brand.id : null,
        limit: 20,
        page: page,
        type_id: ItemType.ITEM_TYPE_TWINS,
      }),
    ),
    map((response) => ({
      groups: response.items.map((group) => ({
        childs: chunkBy(group.childs ? group.childs : [], 3),
        hasMoreImages: TwinsComponent.hasMoreImages(group),
        item: group,
      })),
      paginator: response.paginator,
    })),
  );

  private static hasMoreImages(group: APIItem): boolean {
    let count = 0;
    if (group.childs) {
      for (const item of group.childs) {
        if (item.front_picture) {
          count++;
        }
      }
    }
    return (group.accepted_pictures_count ?? 0) > count;
  }

  ngOnInit(): void {
    setTimeout(
      () =>
        this.pageEnv.set({
          pageId: 25,
        }),
      0,
    );
  }
}
