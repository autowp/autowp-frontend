import {Component, Injectable, OnDestroy, OnInit} from '@angular/core';
import {APIItem, ItemService} from '../../services/item';
import {PageEnvService} from '../../services/page-env.service';
import {ActivatedRoute} from '@angular/router';
import {debounceTime, distinctUntilChanged, map, switchMap, tap} from 'rxjs/operators';
import {Subscription, throwError} from 'rxjs';
import {APIPaginator} from '../../services/api.service';
import {APIItemParent, ItemParentService} from '../../services/item-parent';
import {CatalogueListItem, CatalogueListItemPicture} from '../list-item/list-item.component';
import {ACLService} from '../../services/acl.service';
import {CatalogueService} from '../catalogue-service';





@Component({
  selector: 'app-catalogue-vehicles',
  templateUrl: './vehicles.component.html'
})
@Injectable()
export class CatalogueVehiclesComponent implements OnInit, OnDestroy {

  constructor(
    private pageEnv: PageEnvService,
    private itemService: ItemService,
    private itemParentService: ItemParentService,
    private route: ActivatedRoute,
    private acl: ACLService,
    private catalogueService: CatalogueService
  ) {
  }
  public brand: APIItem;
  private sub: Subscription;
  public items: CatalogueListItem[];
  public paginator: APIPaginator;
  public path: APIItemParent[] = [];
  public item: APIItem;
  public isModer: boolean;
  public canAddItem: boolean;
  public canAcceptPicture: boolean;

  private static convertItem(item: APIItem, routerLink: string[]): CatalogueListItem {
    const pictures: CatalogueListItemPicture[] = [];
    for (const picture of item.preview_pictures) {
      pictures.push({
        picture: picture.picture,
        routerLink: picture.picture ? routerLink.concat(['pictures', picture.picture.identity]) : []
      });
    }

    return {
      id: item.id,
      preview_pictures: pictures,
      item_type_id: item.item_type_id,
      produced: item.produced,
      produced_exactly: item.produced_exactly,
      name_html: item.name_html,
      name_default: item.name_default,
      design: item.design,
      description: null,
      engine_vehicles: item.engine_vehicles,
      has_text: false,
      childs_count: item.childs_count,
      accepted_pictures_count: item.accepted_pictures_count,
      can_edit_specs: item.can_edit_specs,
      routerLink: routerLink,
      picturesRouterLink: routerLink.concat(['pictures'])
    };
  }

  ngOnInit(): void {

    this.acl
      .isAllowed('car', 'add')
      .subscribe(canAddItem => (this.canAddItem = canAddItem));
    this.acl
      .isAllowed('picture', 'accept')
      .subscribe(canAcceptPicture => (this.canAcceptPicture = canAcceptPicture));


    this.sub = this.acl.inheritsRole('moder').pipe(
      tap(isModer => (this.isModer = isModer)),
      switchMap(isModer => this.catalogueService.resolveCatalogue(this.route, isModer)),
      tap(data => {
        console.log('resolve', data);
        this.brand = data.brand;
        if (data.brand) {
          this.pageEnv.set({
            layout: {
              needRight: false
            },
            pageId: 33,
            name: data.brand.name_text
          });
        }
        this.path = data.path;
      }),
      switchMap(data => {
        if (!data.path) {
          return throwError('path is undefined');
        }
        if (data.path.length <= 0) {
          return throwError('path is empty');
        }

        const last = data.path[data.path.length - 1];
        if (last.item.is_group) {
          return this.getPage().pipe(
            switchMap(page => this.loadGroup(last, page))
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
        'catname,name_html,name_default,description,text,has_text,produced,accepted_pictures_count',
        'engine_vehicles,can_edit_specs,specs_url,twins_groups',
        'preview_pictures.picture.thumb_medium,total_pictures,preview_pictures.picture.name_text'
      ].join(',')
    }).pipe(
      tap(item => {

        const routerLink = ['/', this.brand.catname];

        for (const node of this.path) {
          routerLink.push(node.catname);
        }

        this.item = item;
        console.log('item.text', item.text);
        this.items = [CatalogueVehiclesComponent.convertItem(item, routerLink)];
      })
    );
  }

  private loadGroup(last: APIItemParent, page: number) {
    return this.itemParentService
      .getItems({
        fields: [
          'item.catname,item.name_html,item.name_default,item.description,item.has_text,item.produced,item.accepted_pictures_count',
          'item.engine_vehicles,item.can_edit_specs,item.specs_url,item.twins_groups',
          'item.preview_pictures.picture.thumb_medium,item.childs_count,item.total_pictures,item.preview_pictures.picture.name_text'
        ].join(','),
        item_type_id: 1,
        limit: 7,
        page: +page,
        parent_id: last.item_id,
        order: 'type_auto'
      }).pipe(
        tap(response => {
          const items: CatalogueListItem[] = [];

          const routerLink = ['/', this.brand.catname];

          for (const node of this.path) {
            routerLink.push(node.catname);
          }

          for (const item of response.items) {

            const itemRouterLink = [...routerLink];
            itemRouterLink.push(item.catname);

            const pictures: CatalogueListItemPicture[] = [];
            for (const picture of item.item.preview_pictures) {
              pictures.push({
                picture: picture.picture,
                routerLink: picture.picture ? itemRouterLink.concat(['pictures', picture.picture.identity]) : []
              });
            }
            items.push({
              id: item.item.id,
              preview_pictures: pictures,
              item_type_id: item.item.item_type_id,
              produced: item.item.produced,
              produced_exactly: item.item.produced_exactly,
              name_html: item.item.name_html,
              name_default: item.item.name_default,
              design: null,
              description: item.item.description,
              engine_vehicles: item.item.engine_vehicles,
              has_text: item.item.has_text,
              childs_count: item.item.childs_count,
              accepted_pictures_count: item.item.accepted_pictures_count,
              can_edit_specs: item.item.can_edit_specs,
              routerLink: itemRouterLink,
              picturesRouterLink: itemRouterLink.concat(['pictures'])
            });
          }

          this.item = last.item;

          this.items = items;
          this.paginator = response.paginator;
        })
    );
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
