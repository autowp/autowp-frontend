import {AsyncPipe} from '@angular/common';
import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {ACLService, Privilege, Resource} from '@services/acl.service';
import {APIService} from '@services/api.service';
import {APIItem, ItemService} from '@services/item';
import {PageEnvService} from '@services/page-env.service';
import {getItemTypeTranslation} from '@utils/translations';
import {EMPTY, of, Subscription, throwError} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, finalize, map, switchMap, tap} from 'rxjs/operators';

import {ToastsService} from '../../../toasts/toasts.service';
import {ModerItemsItemCatalogueComponent} from './catalogue/catalogue.component';
import {ModerItemsItemLinksComponent} from './links/links.component';
import {ModerItemsItemLogoComponent} from './logo/logo.component';
import {ModerItemsItemMetaComponent} from './meta/meta.component';
import {ModerItemsItemNameComponent} from './name/name.component';
import {ModerItemsItemPicturesComponent} from './pictures/pictures.component';
import {ModerItemsItemTreeComponent} from './tree/tree.component';
import {ModerItemsItemVehiclesComponent} from './vehicles/vehicles.component';
import {ItemsClient, PicturesClient} from '@grpc/spec.pbsc';
import {
  GetPicturesRequest,
  ItemParentCacheListOptions,
  Picture,
  PictureFields,
  PictureItemOptions,
  PicturesOptions,
  SetUserItemSubscriptionRequest,
} from '@grpc/spec.pb';
import {GrpcStatusEvent} from '@ngx-grpc/common';

export interface APIItemTreeItem {
  childs: APIItemTreeItem[];
  id: number;
  name: string;
  type: number;
}

export interface APIItemTreeGetResponse {
  item: APIItemTreeItem;
}

interface Tab {
  count: number;
  initialized?: boolean;
  visible: boolean;
}

@Component({
  imports: [
    RouterLink,
    ModerItemsItemMetaComponent,
    ModerItemsItemNameComponent,
    ModerItemsItemLogoComponent,
    ModerItemsItemCatalogueComponent,
    ModerItemsItemVehiclesComponent,
    ModerItemsItemTreeComponent,
    ModerItemsItemPicturesComponent,
    ModerItemsItemLinksComponent,
    AsyncPipe,
  ],
  selector: 'app-moder-items-item',
  templateUrl: './item.component.html',
})
export class ModerItemsItemComponent implements OnInit, OnDestroy {
  private readonly api = inject(APIService);
  private readonly acl = inject(ACLService);
  private readonly itemService = inject(ItemService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly pageEnv = inject(PageEnvService);
  private readonly toastService = inject(ToastsService);
  private readonly itemsClient = inject(ItemsClient);
  readonly #picturesClient = inject(PicturesClient);

  private routeSub?: Subscription;
  protected loading = 0;

  protected item: APIItem | null = null;
  protected specsAllowed = false;
  protected readonly canEditSpecifications$ = this.acl.isAllowed$(Resource.SPECIFICATIONS, Privilege.EDIT);

  protected tree?: APIItemTreeItem;

  protected randomPicture: Picture | null = null;

  protected readonly metaTab: Tab = {
    count: 0,
    visible: true,
  };
  protected readonly nameTab: Tab = {
    count: 0,
    visible: true,
  };
  protected readonly logoTab: Tab = {
    count: 0,
    visible: true,
  };
  protected readonly catalogueTab: Tab = {
    count: 0,
    visible: true,
  };
  protected readonly vehiclesTab: Tab = {
    count: 0,
    visible: true,
  };
  protected readonly treeTab: Tab = {
    count: 0,
    visible: true,
  };
  protected readonly picturesTab: Tab = {
    count: 0,
    visible: true,
  };
  protected readonly linksTab: Tab = {
    count: 0,
    visible: true,
  };

  protected activeTab = 'meta';

  ngOnInit(): void {
    this.routeSub = this.route.paramMap
      .pipe(
        map((params) => parseInt(params.get('id') ?? '', 10)),
        distinctUntilChanged(),
        debounceTime(30),
        switchMap((id) => {
          this.loading++;
          return this.itemService.getItem$(id, {
            fields: [
              'name_text',
              'name_html',
              'name',
              'is_concept',
              'name_default',
              'subscription',
              'begin_year',
              'begin_month',
              'end_year',
              'end_month',
              'today',
              'begin_model_year',
              'end_model_year',
              'produced',
              'spec_id',
              'childs_count',
              'full_name',
              'catname',
              'lat',
              'lng',
              'pictures_count',
              'specifications_count',
              'links_count',
              'parents_count',
              'item_language_count',
              'engine_vehicles_count',
              'logo',
            ].join(','),
          });
        }),
        finalize(() => {
          this.loading--;
        }),
        catchError((err: unknown) => {
          this.toastService.handleError(err);
          this.router.navigate(['/error-404'], {
            skipLocationChange: true,
          });
          return of(null);
        }),
        switchMap((item) => {
          if (!item) {
            this.router.navigate(['/error-404'], {
              skipLocationChange: true,
            });
            return EMPTY;
          }
          return of(item);
        }),
        tap((item) => {
          this.item = item;

          const typeID = item.item_type_id;

          this.specsAllowed = [1, 2].indexOf(typeID) !== -1;

          this.nameTab.count = item.item_language_count;
          this.logoTab.count = item.logo ? 1 : 0;
          this.catalogueTab.count = item.parents_count + item.childs_count;
          this.vehiclesTab.count = item.engine_vehicles_count;
          this.picturesTab.count = item.pictures_count;
          this.linksTab.count = item.links_count;

          this.metaTab.visible = true;
          this.nameTab.visible = true;
          this.catalogueTab.visible = [7, 9].indexOf(typeID) === -1;
          this.treeTab.visible = [7, 9].indexOf(typeID) === -1;
          this.linksTab.visible = [5, 7, 8].indexOf(typeID) !== -1;
          this.logoTab.visible = typeID === 5;
          this.vehiclesTab.visible = typeID === 2;
          this.picturesTab.visible = [2, 1, 5, 6, 7, 8, 9].indexOf(typeID) !== -1;
        }),
        switchMap((item) => {
          this.loading++;
          return this.#picturesClient
            .getPicture(
              new GetPicturesRequest({
                options: new PicturesOptions({
                  pictureItem: new PictureItemOptions({
                    itemParentCacheAncestor: new ItemParentCacheListOptions({
                      parentId: '' + item.id,
                    }),
                  }),
                }),
                fields: new PictureFields({thumbMedium: true}),
                order: GetPicturesRequest.Order.ADD_DATE_DESC,
                limit: 1,
              }),
            )
            .pipe(
              catchError((error: unknown) => {
                if (error instanceof GrpcStatusEvent && error.statusCode == 5) {
                  // NOT_FOUND
                  return of(null);
                }
                console.error(error);
                return throwError(() => error);
              }),
              map((picture) => ({
                item,
                picture,
              })),
            );
        }),
        finalize(() => {
          this.loading--;
        }),
        tap(({item, picture}) => {
          this.pageEnv.set({
            layout: {isAdminPage: true},
            pageId: 78,
            title: item.name_text,
          });
          this.randomPicture = picture;
        }),
        switchMap(() => this.route.queryParamMap),
        map((params) => params.get('tab')),
        distinctUntilChanged(),
        debounceTime(30),
        tap((tab) => {
          this.activeTab = tab ? tab : 'meta';

          if (this.activeTab === 'tree') {
            if (!this.treeTab.initialized) {
              this.treeTab.initialized = true;
              this.initTreeTab();
            }
          }
        }),
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }

  private initTreeTab() {
    if (this.item) {
      this.api.request$<APIItemTreeGetResponse>('GET', 'item/' + this.item.id + '/tree').subscribe({
        next: (response) => {
          this.tree = response.item;
        },
      });
    }
  }

  protected toggleSubscription() {
    if (this.item) {
      const newValue = !this.item.subscription;
      this.itemsClient
        .setUserItemSubscription(
          new SetUserItemSubscriptionRequest({
            itemId: this.item.id + '',
            subscribed: newValue,
          }),
        )
        .subscribe(() => {
          if (this.item) {
            this.item.subscription = newValue;
          }
        });
    }
  }

  protected getItemTypeTranslation(id: number, type: string) {
    return getItemTypeTranslation(id, type);
  }
}
