import {Component} from '@angular/core';
import {APIItem, ItemService} from '@services/item';
import {PageEnvService} from '@services/page-env.service';
import {ActivatedRoute, Router} from '@angular/router';
import {debounceTime, distinctUntilChanged, map, shareReplay, switchMap, tap} from 'rxjs/operators';
import {combineLatest, EMPTY, Observable, of} from 'rxjs';
import {APIPaginator} from '@services/api.service';
import {ItemParentService} from '@services/item-parent';
import {CatalogueListItem, CatalogueListItemPicture} from '@utils/list-item/list-item.component';
import {ACLService, Privilege, Resource} from '@services/acl.service';
import {CatalogueService} from '../catalogue-service';
import {APIPicture, PictureService} from '@services/picture';
import {getItemTypeTranslation} from '@utils/translations';

@Component({
  selector: 'app-catalogue-vehicles',
  templateUrl: './vehicles.component.html',
})
export class CatalogueVehiclesComponent {
  public isModer$ = this.acl.isAllowed$(Resource.GLOBAL, Privilege.MODERATE);
  public canAddItem$ = this.acl.isAllowed$(Resource.CAR, Privilege.ADD);
  public canAcceptPicture$ = this.acl.isAllowed$(Resource.PICTURE, Privilege.ACCEPT);

  private catalogue$ = this.isModer$.pipe(
    switchMap((isModer) => this.catalogueService.resolveCatalogue$(this.route, isModer, '')),
    switchMap((data) => {
      if (!data || !data.brand || !data.path || data.path.length <= 0) {
        this.router.navigate(['/error-404'], {
          skipLocationChange: true,
        });
        return EMPTY;
      }
      return of(data);
    }),
    shareReplay(1)
  );

  public brand$ = this.catalogue$.pipe(map(({brand}) => brand));

  private routerLink$ = this.catalogue$.pipe(
    map(({brand, path}) => {
      const routerLink = ['/', brand.catname];

      for (const node of path) {
        routerLink.push(node.catname);
      }
      return routerLink;
    }),
    shareReplay(1)
  );

  public menu$ = combineLatest([this.catalogue$, this.routerLink$]).pipe(
    map(([{type}, routerLink]) => ({type, routerLink}))
  );

  public breadcrumbs$ = this.catalogue$.pipe(map(({brand, path}) => CatalogueService.pathToBreadcrumbs(brand, path)));

  public item$ = this.catalogue$.pipe(
    switchMap(({path}) => {
      const last = path[path.length - 1];

      if (last.item.is_group) {
        return of(last.item);
      }

      return this.itemService.getItem$(last.item_id, {
        fields: [
          'name_html,name_default,description,text,has_text,produced,accepted_pictures_count,inbox_pictures_count',
          'engine_vehicles,can_edit_specs,specs_route,has_child_specs,has_specs,twins_groups.name_html,design',
          'total_pictures,preview_pictures.picture.name_text,childs_counts,categories.name_html',
        ].join(','),
      });
    }),
    tap((item) => {
      this.pageEnv.set({
        pageId: 33,
        title: item.name_text,
      });
    }),
    shareReplay(1)
  );

  private page$ = this.route.queryParamMap.pipe(
    map((params) => parseInt(params.get('page'), 10)),
    distinctUntilChanged(),
    debounceTime(10)
  );

  public items$: Observable<{
    items: CatalogueListItem[];
    paginator: APIPaginator;
  }> = combineLatest([this.item$, this.routerLink$]).pipe(
    switchMap(([item, routerLink]) => {
      if (!item.is_group) {
        return of({
          items: [CatalogueVehiclesComponent.convertItem(item, routerLink)],
          paginator: null as APIPaginator,
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
              page,
              parent_id: item.id,
              type_id: CatalogueVehiclesComponent.resolveTypeId(type),
              order: 'type_auto',
            })
          )
        )
        .pipe(
          map((response) => ({
            paginator: response.paginator,
            items: response.items.map((item) => {
              const itemRouterLink = [...routerLink, item.catname];

              const pictures: CatalogueListItemPicture[] = item.item.preview_pictures.pictures.map((picture) => ({
                picture: picture ? picture.picture : null,
                thumb: picture ? picture.thumb : null,
                routerLink:
                  picture && picture.picture ? itemRouterLink.concat(['pictures', picture.picture.identity]) : [],
              }));

              return {
                id: item.item.id,
                preview_pictures: {
                  pictures,
                  large_format: item.item.preview_pictures.large_format,
                },
                item_type_id: item.item.item_type_id,
                produced: item.item.produced,
                produced_exactly: item.item.produced_exactly,
                name_html: item.item.name_html,
                name_default: item.item.name_default,
                design: item.item.design,
                description: item.item.description,
                engine_vehicles: item.item.engine_vehicles,
                has_text: item.item.has_text,
                accepted_pictures_count: item.item.accepted_pictures_count,
                can_edit_specs: item.item.can_edit_specs,
                picturesRouterLink: itemRouterLink.concat(['pictures']),
                specsRouterLink:
                  item.item.has_specs || item.item.has_child_specs ? itemRouterLink.concat(['specifications']) : null,
                details: {
                  routerLink: itemRouterLink,
                  count: item.item.childs_count,
                },
                childs_counts: item.item.childs_counts,
                categories: item.item.categories,
                twins_groups: item.item.twins_groups,
              };
            }),
          }))
        );
    }),
    shareReplay(1)
  );

  public otherPictures$: Observable<{
    pictures: APIPicture[];
    count: number;
    routerLink: string[];
  }> = this.catalogue$.pipe(
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
                  status: 'accepted',
                  fields: 'owner,thumb_medium,moder_vote,votes,views,comments_count,name_html,name_text',
                  limit: 4,
                  order: 3,
                }),
                this.routerLink$,
              ])
            ),
            map(([response, routerLink]) => {
              if (response.pictures.length <= 0) {
                return null;
              }
              return {
                pictures: response.pictures,
                count: response.paginator.totalItemCount,
                routerLink: routerLink.concat(['exact', 'pictures']),
              };
            })
          );
        })
      );
    })
  );

  constructor(
    private pageEnv: PageEnvService,
    private itemService: ItemService,
    private itemParentService: ItemParentService,
    private route: ActivatedRoute,
    private acl: ACLService,
    private catalogueService: CatalogueService,
    private pictureService: PictureService,
    private router: Router
  ) {}

  private static convertItem(item: APIItem, routerLink: string[]): CatalogueListItem {
    const pictures: CatalogueListItemPicture[] = item.preview_pictures.pictures.map((picture) => ({
      picture: picture ? picture.picture : null,
      thumb: picture ? picture.thumb : null,
      routerLink: picture && picture.picture ? routerLink.concat(['pictures', picture.picture.identity]) : [],
    }));

    return {
      id: item.id,
      preview_pictures: {
        pictures,
        large_format: item.preview_pictures.large_format,
      },
      item_type_id: item.item_type_id,
      produced: item.produced,
      produced_exactly: item.produced_exactly,
      name_html: item.name_html,
      name_default: item.name_default,
      design: item.design,
      description: null,
      engine_vehicles: item.engine_vehicles,
      has_text: false,
      accepted_pictures_count: item.accepted_pictures_count,
      can_edit_specs: item.can_edit_specs,
      picturesRouterLink: routerLink.concat(['pictures']),
      specsRouterLink: item.has_specs || item.has_child_specs ? routerLink.concat(['specifications']) : null,
      details: {
        routerLink,
        count: item.childs_count,
      },
      childs_counts: item.childs_counts,
      categories: item.categories,
      twins_groups: item.twins_groups,
    };
  }

  private static resolveTypeId(type: string) {
    switch (type) {
      case 'tuning':
        return 1;
      case 'sport':
        return 2;
    }
    return 0;
  }

  public getItemTypeTranslation(id: number, type: string) {
    return getItemTypeTranslation(id, type);
  }
}
