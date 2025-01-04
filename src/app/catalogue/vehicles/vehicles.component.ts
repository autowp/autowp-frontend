import {AsyncPipe} from '@angular/common';
import {Component, inject} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {APIItem as GRPCAPIItem, ItemParent} from '@grpc/spec.pb';
import {ACLService, Privilege, Resource} from '@services/acl.service';
import {APIPaginator} from '@services/api.service';
import {APIItem, ItemService} from '@services/item';
import {ItemParentService} from '@services/item-parent';
import {PageEnvService} from '@services/page-env.service';
import {APIPicture, PictureService} from '@services/picture';
import {ItemHeaderComponent} from '@utils/item-header/item-header.component';
import {
  CatalogueListItem,
  CatalogueListItemComponent,
  CatalogueListItemPicture,
} from '@utils/list-item/list-item.component';
import {MarkdownComponent} from '@utils/markdown/markdown.component';
import {getItemTypeTranslation} from '@utils/translations';
import {combineLatest, EMPTY, Observable, of} from 'rxjs';
import {debounceTime, distinctUntilChanged, map, shareReplay, switchMap, tap} from 'rxjs/operators';

import {PaginatorComponent} from '../../paginator/paginator/paginator.component';
import {CatalogueService, convertChildsCounts} from '../catalogue-service';
import {CatalogueItemMenuComponent} from '../item-menu/item-menu.component';

@Component({
  imports: [
    RouterLink,
    ItemHeaderComponent,
    CatalogueItemMenuComponent,
    MarkdownComponent,
    CatalogueListItemComponent,
    PaginatorComponent,
    AsyncPipe,
  ],
  selector: 'app-catalogue-vehicles',
  templateUrl: './vehicles.component.html',
})
export class CatalogueVehiclesComponent {
  private readonly pageEnv = inject(PageEnvService);
  private readonly itemService = inject(ItemService);
  private readonly itemParentService = inject(ItemParentService);
  private readonly route = inject(ActivatedRoute);
  private readonly acl = inject(ACLService);
  private readonly catalogueService = inject(CatalogueService);
  private readonly pictureService = inject(PictureService);
  private readonly router = inject(Router);

  protected readonly isModer$ = this.acl.isAllowed$(Resource.GLOBAL, Privilege.MODERATE);
  protected readonly canAddItem$ = this.acl.isAllowed$(Resource.CAR, Privilege.ADD);
  protected readonly canAcceptPicture$ = this.acl.isAllowed$(Resource.PICTURE, Privilege.ACCEPT);

  private readonly catalogue$: Observable<{brand: GRPCAPIItem; path: ItemParent[]; type: string}> =
    this.catalogueService.resolveCatalogue$(this.route).pipe(
      switchMap((data) => {
        if (!data?.brand || !data.path || data.path.length <= 0) {
          this.router.navigate(['/error-404'], {
            skipLocationChange: true,
          });
          return EMPTY;
        }
        return of(data);
      }),
      shareReplay({bufferSize: 1, refCount: false}),
    );

  protected readonly brand$: Observable<GRPCAPIItem> = this.catalogue$.pipe(map(({brand}) => brand));

  private readonly routerLink$: Observable<string[]> = this.catalogue$.pipe(
    map(({brand, path}) => {
      const routerLink = ['/', brand.catname];

      for (const node of path) {
        routerLink.push(node.catname);
      }
      return routerLink;
    }),
    shareReplay({bufferSize: 1, refCount: false}),
  );

  protected readonly menu$: Observable<{routerLink: string[]; type: string}> = combineLatest([
    this.catalogue$,
    this.routerLink$,
  ]).pipe(map(([{type}, routerLink]) => ({routerLink, type})));

  protected readonly breadcrumbs$ = this.catalogue$.pipe(
    map(({brand, path}) => CatalogueService.pathToBreadcrumbs(brand, path)),
  );

  protected readonly item$: Observable<APIItem> = this.catalogue$.pipe(
    switchMap(({path}) => {
      const last = path[path.length - 1];

      if (last.item?.isGroup) {
        return of({
          alt_names: [],
          accepted_pictures_count: last.item?.acceptedPicturesCount,
          attr_zone_id: +last.item.attrZoneId,
          begin_model_year: 0,
          begin_model_year_fraction: '',
          begin_month: 0,
          begin_year: 0,
          body: '',
          brands: [],
          catname: last.item.catname,
          childs_count: 0,
          childs_counts: convertChildsCounts(last.item.childsCounts || []),
          comments_attentions_count: last.item.commentsAttentionsCount,
          description: last.item.description,
          design: last.item?.design,
          descendants_count: 0,
          end_model_year: 0,
          end_model_year_fraction: '',
          end_month: 0,
          end_year: 0,
          engine_id: +last.item.engineItemId,
          engine_inherit: last.item.engineInherit,
          engine_vehicles_count: 0,
          full_name: '',
          id: +last.item.id,
          item_language_count: 0,
          item_of_day_pictures: [],
          inbox_pictures_count: last.item?.inboxPicturesCount,
          is_concept: last.item.isConceptInherit ? 'inherited' : last.item.isConcept,
          is_group: last.item.isGroup,
          item_type_id: last.item.itemTypeId,
          lat: 0,
          links_count: 0,
          lng: 0,
          name_html: last.item.nameHtml,
          name_only: last.item.nameOnly,
          name_text: last.item.nameText,
          name: '',
          name_default: '',
          parents_count: 0,
          pictures_count: 0,
          other_names: last.item.otherNames,
          preview_pictures: {
            large_format: false,
            pictures: [],
          },
          related_group_pictures: [],
          produced: last.item.produced,
          produced_exactly: last.item.producedExactly,
          spec_id: last.item.specId,
          specs_route: last.item.specsRoute,
          text: last.item.fullText,
          subscription: false,
          today: null,
          twins_groups: [],
          route: [],
        } as APIItem);
      }

      return this.itemService.getItem$(+last.itemId, {
        fields: [
          'name_html,name_default,description,text,has_text,produced,accepted_pictures_count,inbox_pictures_count',
          'engine_vehicles,can_edit_specs,specs_route,has_child_specs,has_specs,twins_groups.name_html,design',
          'total_pictures,preview_pictures.picture.name_text,childs_counts,categories.name_html',
        ].join(','),
      });
    }),
    switchMap((item: APIItem | null) => {
      if (!item) {
        this.router.navigate(['/error-404'], {
          skipLocationChange: true,
        });
        return EMPTY;
      }
      return of(item);
    }),
    tap((item) => {
      this.pageEnv.set({
        pageId: 33,
        title: item.name_text,
      });
    }),
    shareReplay({bufferSize: 1, refCount: false}),
  );

  private readonly page$ = this.route.queryParamMap.pipe(
    map((params) => parseInt(params.get('page') ?? '', 10)),
    distinctUntilChanged(),
    debounceTime(10),
  );

  protected readonly items$: Observable<{
    items: CatalogueListItem[];
    paginator?: APIPaginator;
  }> = combineLatest([this.item$, this.routerLink$]).pipe(
    switchMap(([item, routerLink]) => {
      if (!item.is_group) {
        return of({
          items: [CatalogueVehiclesComponent.convertItem(item, routerLink)],
          paginator: undefined,
        });
      }

      return combineLatest([this.catalogue$, this.page$])
        .pipe(
          switchMap(([{type}, page]) =>
            this.itemParentService.getItems$({
              fields: [
                'item.name_html,item.name_default,item.description,item.has_text,item.produced,item.accepted_pictures_count',
                'item.engine_vehicles,item.can_edit_specs,item.specs_route,item.twins_groups.name_html,item.has_specs,item.has_child_specs,item.design',
                'item.childs_count,item.total_pictures,item.preview_pictures.picture.name_text',
                'item.inbox_pictures_count,item.childs_counts,item.categories.name_html',
              ].join(','),
              limit: 7,
              order: 'type_auto',
              page,
              parent_id: item.id,
              type_id: CatalogueVehiclesComponent.resolveTypeId(type),
            }),
          ),
        )
        .pipe(
          map((response) => ({
            items: response.items.map((item) => {
              const itemRouterLink = [...routerLink, item.catname];

              const pictures: CatalogueListItemPicture[] = item.item.preview_pictures.pictures.map((picture) => ({
                picture: picture?.picture ? picture.picture : null,
                routerLink: picture?.picture ? itemRouterLink.concat(['pictures', picture.picture.identity]) : [],
                thumb: picture ? picture.thumb : null,
              }));

              return {
                accepted_pictures_count: item.item.accepted_pictures_count,
                can_edit_specs: item.item.can_edit_specs,
                categories: item.item.categories,
                childs_counts: item.item.childs_counts,
                description: item.item.description,
                design: item.item.design,
                details: {
                  count: item.item.childs_count,
                  routerLink: itemRouterLink,
                },
                engine_vehicles: item.item.engine_vehicles,
                has_text: item.item.has_text,
                id: item.item.id,
                item_type_id: item.item.item_type_id,
                name_default: item.item.name_default,
                name_html: item.item.name_html,
                picturesRouterLink: itemRouterLink.concat(['pictures']),
                preview_pictures: {
                  large_format: item.item.preview_pictures.large_format,
                  pictures,
                },
                produced: item.item.produced,
                produced_exactly: item.item.produced_exactly,
                specsRouterLink:
                  item.item.has_specs || item.item.has_child_specs ? itemRouterLink.concat(['specifications']) : null,
                twins_groups: item.item.twins_groups,
              } as CatalogueListItem;
            }),
            paginator: response.paginator,
          })),
        );
    }),
    shareReplay({bufferSize: 1, refCount: false}),
  );

  protected readonly otherPictures$: Observable<{
    count: number;
    pictures: APIPicture[];
    routerLink: string[];
  } | null> = this.catalogue$.pipe(
    switchMap(({type}) => {
      if (CatalogueVehiclesComponent.resolveTypeId(type) !== 0) {
        return of(null);
      }

      return this.items$.pipe(
        switchMap((items) => {
          if (!items.paginator || items.paginator.current < items.paginator.last) {
            return of(null);
          }

          return this.item$.pipe(
            switchMap((item) =>
              combineLatest([
                this.pictureService.getPictures$({
                  exact_item_id: item.id,
                  fields: 'owner,thumb_medium,moder_vote,votes,views,comments_count,name_html,name_text',
                  limit: 4,
                  order: 3,
                  status: 'accepted',
                }),
                this.routerLink$,
              ]),
            ),
            map(([response, routerLink]) => {
              if (response.pictures.length <= 0) {
                return null;
              }
              return {
                count: response.paginator.totalItemCount,
                pictures: response.pictures,
                routerLink: routerLink.concat(['exact', 'pictures']),
              };
            }),
          );
        }),
      );
    }),
  );

  private static convertItem(item: APIItem, routerLink: string[]): CatalogueListItem {
    const pictures: CatalogueListItemPicture[] = item.preview_pictures.pictures.map((picture) => ({
      picture: picture?.picture ? picture.picture : null,
      routerLink: picture?.picture ? routerLink.concat(['pictures', picture.picture.identity]) : [],
      thumb: picture ? picture.thumb : null,
    }));

    return {
      accepted_pictures_count: item.accepted_pictures_count,
      can_edit_specs: !!item.can_edit_specs,
      categories: item.categories,
      childs_counts: item.childs_counts ? item.childs_counts : null,
      description: null,
      design: item.design ? item.design : null,
      details: {
        count: item.childs_count,
        routerLink,
      },
      engine_vehicles: item.engine_vehicles,
      has_text: false,
      id: item.id,
      item_type_id: item.item_type_id,
      name_default: item.name_default,
      name_html: item.name_html,
      picturesRouterLink: routerLink.concat(['pictures']),
      preview_pictures: {
        large_format: item.preview_pictures.large_format,
        pictures,
      },
      produced: item.produced,
      produced_exactly: item.produced_exactly,
      specsRouterLink: item.has_specs || item.has_child_specs ? routerLink.concat(['specifications']) : null,
      twins_groups: item.twins_groups,
    };
  }

  private static resolveTypeId(type: string) {
    switch (type) {
      case 'sport':
        return 2;
      case 'tuning':
        return 1;
    }
    return 0;
  }

  protected getItemTypeTranslation(id: number, type: string) {
    return getItemTypeTranslation(id, type);
  }
}
