import {Component, Injectable, OnDestroy, OnInit} from '@angular/core';
import {APIItem, ItemService} from '../../services/item';
import {PageEnvService} from '../../services/page-env.service';
import {ActivatedRoute, Router} from '@angular/router';
import {debounceTime, distinctUntilChanged, map, switchMap, tap} from 'rxjs/operators';
import {EMPTY, Subscription} from 'rxjs';
import {APIPaginator} from '../../services/api.service';
import {APIItemParent, ItemParentService} from '../../services/item-parent';
import {CatalogueListItem, CatalogueListItemPicture} from '../../utils/list-item/list-item.component';
import {ACLService, Privilege, Resource} from '../../services/acl.service';
import {Breadcrumbs, CatalogueService} from '../catalogue-service';
import {APIPicture, PictureService} from '../../services/picture';

@Component({
  selector: 'app-catalogue-vehicles',
  templateUrl: './vehicles.component.html'
})
@Injectable()
export class CatalogueVehiclesComponent implements OnInit, OnDestroy {

  public brand: APIItem;
  private sub: Subscription;
  public items: CatalogueListItem[];
  public paginator: APIPaginator;
  public path: APIItemParent[] = [];
  public breadcrumbs: Breadcrumbs[] = [];
  public item: APIItem;
  public type = 'default';
  public isModer: boolean;
  public canAddItem: boolean;
  public canAcceptPicture: boolean;
  public otherPictures: APIPicture[] = [];
  public otherPicturesCount: number;
  public otherPicturesRouterLink: string[];
  public routerLink: string[];

  constructor(
    private pageEnv: PageEnvService,
    private itemService: ItemService,
    private itemParentService: ItemParentService,
    private route: ActivatedRoute,
    private acl: ACLService,
    private catalogueService: CatalogueService,
    private pictureService: PictureService,
    private router: Router
  ) {
  }

  private static convertItem(item: APIItem, routerLink: string[]): CatalogueListItem {
    const pictures: CatalogueListItemPicture[] = item.preview_pictures.pictures.map(picture => ({
      picture: picture ? picture.picture : null,
      thumb: picture ? picture.thumb : null,
      routerLink: picture && picture.picture ? routerLink.concat(['pictures', picture.picture.identity]) : []
    }));

    return {
      id: item.id,
      preview_pictures: {
        pictures,
        large_format: item.preview_pictures.large_format
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
        count: item.childs_count
      },
      childs_counts: item.childs_counts,
      categories: item.categories,
      twins_groups: item.twins_groups
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

  ngOnInit(): void {

    this.acl
      .isAllowed(Resource.CAR, Privilege.ADD)
      .subscribe(canAddItem => (this.canAddItem = canAddItem));
    this.acl
      .isAllowed(Resource.PICTURE, Privilege.ACCEPT)
      .subscribe(canAcceptPicture => (this.canAcceptPicture = canAcceptPicture));


    this.sub = this.acl.isAllowed(Resource.GLOBAL, Privilege.MODERATE).pipe(
      tap(isModer => (this.isModer = isModer)),
      switchMap(isModer => this.catalogueService.resolveCatalogue(this.route, isModer, '')),
      switchMap(data => {
        if (! data || ! data.brand || !data.path || data.path.length <= 0) {
          this.router.navigate(['/error-404'], {
            skipLocationChange: true
          });
          return EMPTY;
        }

        this.brand = data.brand;

        this.path = data.path;
        this.breadcrumbs = CatalogueService.pathToBreadcrumbs(data.brand, data.path);
        this.type = data.type;

        const routerLink = ['/', this.brand.catname];

        for (const node of this.path) {
          routerLink.push(node.catname);
        }

        this.routerLink = routerLink;

        const last = data.path[data.path.length - 1];
        this.item = last.item;

        this.pageEnv.set({
          layout: {
            needRight: false
          },
          pageId: 33,
          name: this.item.name_text
        });

        if (last.item.is_group) {
          return this.getPage().pipe(
            switchMap(page => this.loadGroup(last, data.type, page))
          );
        } else {
          return this.loadItem(last);
        }
      })
    ).subscribe();
  }

  private loadItem(last: APIItemParent) {
    return this.itemService.getItem(last.item_id, {
      fields: [
        'name_html,name_default,description,text,has_text,produced,accepted_pictures_count,inbox_pictures_count',
        'engine_vehicles,can_edit_specs,specs_route,has_child_specs,has_specs,twins_groups.name_html,design',
        'total_pictures,preview_pictures.picture.name_text,childs_counts,categories.name_html'
      ].join(',')
    }).pipe(
      tap(item => {
        this.item = item;
        this.items = [CatalogueVehiclesComponent.convertItem(item, this.routerLink)];
      })
    );
  }

  private loadGroup(last: APIItemParent, type: string, page: number) {
    const typeID = CatalogueVehiclesComponent.resolveTypeId(type);
    return this.itemParentService.getItems({
      fields: [
        'item.name_html,item.name_default,item.description,item.has_text,item.produced,item.accepted_pictures_count',
        'item.engine_vehicles,item.can_edit_specs,item.specs_route,item.twins_groups.name_html,item.has_specs,item.has_child_specs,item.design',
        'item.childs_count,item.total_pictures,item.preview_pictures.picture.name_text',
        'item.inbox_pictures_count,item.childs_counts,item.categories.name_html'
      ].join(','),
      limit: 7,
      page: +page,
      parent_id: last.item_id,
      type_id: typeID,
      order: 'type_auto'
    }).pipe(
      tap(response => {
        this.items = response.items.map(item => {
          const itemRouterLink = [...this.routerLink];
          itemRouterLink.push(item.catname);

          const pictures: CatalogueListItemPicture[] = item.item.preview_pictures.pictures.map(picture => ({
            picture: picture ? picture.picture : null,
            thumb: picture ? picture.thumb : null,
            routerLink: picture && picture.picture ? itemRouterLink.concat(['pictures', picture.picture.identity]) : []
          }));

          return {
            id: item.item.id,
            preview_pictures: {
              pictures,
              large_format: item.item.preview_pictures.large_format
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
            specsRouterLink: item.item.has_specs || item.item.has_child_specs ? itemRouterLink.concat(['specifications']) : null,
            details: {
              routerLink: itemRouterLink,
              count: item.item.childs_count
            },
            childs_counts: item.item.childs_counts,
            categories: item.item.categories,
            twins_groups: item.item.twins_groups
          };
        });

        this.paginator = response.paginator;
      }),
      switchMap(response => this.getOtherPictures(last.item_id, typeID, response.paginator.current, response.paginator.last)),
      tap(picResponse => {
        this.otherPictures = picResponse.pictures;
        this.otherPicturesCount = picResponse.paginator.totalItemCount;
        this.otherPicturesRouterLink = this.routerLink.concat(['exact', 'pictures']);
      })
    );
  }

  private getOtherPictures(itemID: number, typeID: number, page: number, lastPage: number) {
    if (page < lastPage || typeID !== 0) {
      this.otherPictures = [];
      this.otherPicturesCount = 0;
      this.otherPicturesRouterLink = [];
      return EMPTY;
    }

    return this.pictureService.getPictures({
      exact_item_id: itemID,
      status: 'accepted',
      fields: 'owner,thumb_medium,moder_vote,votes,views,comments_count,name_html,name_text',
      limit: 4,
      order: 3
    });
  }

  private getPage() {
    return this.route.queryParamMap.pipe(
      map(params => +params.get('page')),
      distinctUntilChanged(),
      debounceTime(10)
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
