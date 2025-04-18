import {AsyncPipe} from '@angular/common';
import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {
  APIItem,
  APITreeItem,
  GetTreeRequest,
  ItemFields,
  ItemParentCacheListOptions,
  ItemRequest,
  ItemType,
  Picture,
  PictureFields,
  PictureItemListOptions,
  PictureListOptions,
  PicturesRequest,
  SetUserItemSubscriptionRequest,
} from '@grpc/spec.pb';
import {ItemsClient, PicturesClient} from '@grpc/spec.pbsc';
import {GrpcStatusEvent} from '@ngx-grpc/common';
import {AuthService} from '@services/auth.service';
import {LanguageService} from '@services/language';
import {PageEnvService} from '@services/page-env.service';
import {getItemTypeTranslation} from '@utils/translations';
import {BehaviorSubject, combineLatest, EMPTY, Observable, of, Subscription, throwError} from 'rxjs';
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
export class ModerItemsItemComponent implements OnDestroy, OnInit {
  readonly #auth = inject(AuthService);
  readonly #route = inject(ActivatedRoute);
  readonly #router = inject(Router);
  readonly #pageEnv = inject(PageEnvService);
  readonly #toastService = inject(ToastsService);
  readonly #itemsClient = inject(ItemsClient);
  readonly #picturesClient = inject(PicturesClient);
  readonly #languageService = inject(LanguageService);

  #routeSub?: Subscription;
  protected loading = 0;

  protected reloadItem$ = new BehaviorSubject<void>(void 0);

  protected item: APIItem | null = null;
  protected specsAllowed = false;
  protected readonly canEditSpecifications$ = this.#auth.authenticated$;

  protected tree?: APITreeItem;

  protected randomPicture: null | Picture = null;

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

  readonly #itemID: Observable<string> = this.#route.paramMap.pipe(
    map((params) => params.get('id') ?? ''),
    distinctUntilChanged(),
    debounceTime(30),
  );

  readonly #item: Observable<APIItem> = combineLatest([this.#itemID, this.reloadItem$]).pipe(
    switchMap(([id]) => {
      this.loading++;
      return this.#itemsClient.item(
        new ItemRequest({
          fields: new ItemFields({
            childsCount: true,
            engineVehiclesCount: true,
            exactPicturesCount: true,
            fullName: true,
            itemLanguageCount: true,
            linksCount: true,
            location: true,
            logo: true,
            meta: true,
            nameDefault: true,
            nameHtml: true,
            nameText: true,
            parentsCount: true,
            specificationsCount: true,
            subscription: true,
          }),
          id,
        }),
      );
    }),
    finalize(() => {
      this.loading--;
    }),
    catchError((err: unknown) => {
      this.#toastService.handleError(err);
      this.#router.navigate(['/error-404'], {
        skipLocationChange: true,
      });
      return EMPTY;
    }),
    switchMap((item) => {
      if (!item) {
        this.#router.navigate(['/error-404'], {
          skipLocationChange: true,
        });
        return EMPTY;
      }
      return of(item);
    }),
  );

  ngOnInit(): void {
    this.#routeSub = this.#item
      .pipe(
        tap((item) => {
          this.item = item;

          const typeID = item.itemTypeId;

          this.specsAllowed = [ItemType.ITEM_TYPE_VEHICLE, ItemType.ITEM_TYPE_ENGINE].indexOf(typeID) !== -1;

          this.nameTab.count = item.itemLanguageCount;
          this.logoTab.count = item.logo ? 1 : 0;
          this.catalogueTab.count = item.parentsCount + item.childsCount;
          this.vehiclesTab.count = item.engineVehiclesCount;
          this.picturesTab.count = item.exactPicturesCount;
          this.linksTab.count = item.linksCount;

          this.metaTab.visible = true;
          this.nameTab.visible = true;
          this.catalogueTab.visible = [ItemType.ITEM_TYPE_MUSEUM, ItemType.ITEM_TYPE_COPYRIGHT].indexOf(typeID) === -1;
          this.treeTab.visible = [ItemType.ITEM_TYPE_MUSEUM, ItemType.ITEM_TYPE_COPYRIGHT].indexOf(typeID) === -1;
          this.linksTab.visible =
            [ItemType.ITEM_TYPE_BRAND, ItemType.ITEM_TYPE_MUSEUM, ItemType.ITEM_TYPE_PERSON].indexOf(typeID) !== -1;
          this.logoTab.visible = typeID === ItemType.ITEM_TYPE_BRAND;
          this.vehiclesTab.visible = typeID === ItemType.ITEM_TYPE_ENGINE;
          this.picturesTab.visible =
            [
              ItemType.ITEM_TYPE_ENGINE,
              ItemType.ITEM_TYPE_VEHICLE,
              ItemType.ITEM_TYPE_BRAND,
              ItemType.ITEM_TYPE_FACTORY,
              ItemType.ITEM_TYPE_MUSEUM,
              ItemType.ITEM_TYPE_PERSON,
              ItemType.ITEM_TYPE_COPYRIGHT,
            ].indexOf(typeID) !== -1;
        }),
        switchMap((item) => {
          this.loading++;
          return this.#picturesClient
            .getPicture(
              new PicturesRequest({
                fields: new PictureFields({thumbMedium: true}),
                limit: 1,
                options: new PictureListOptions({
                  pictureItem: new PictureItemListOptions({
                    itemParentCacheAncestor: new ItemParentCacheListOptions({
                      parentId: item.id,
                    }),
                  }),
                }),
                order: PicturesRequest.Order.ORDER_ADD_DATE_DESC,
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
          this.#pageEnv.set({
            layout: {isAdminPage: true},
            pageId: 78,
            title: item.nameText,
          });
          this.randomPicture = picture;
        }),
        switchMap(() => this.#route.queryParamMap),
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
    if (this.#routeSub) {
      this.#routeSub.unsubscribe();
    }
  }

  private initTreeTab() {
    if (this.item) {
      this.#itemsClient
        .getTree(new GetTreeRequest({id: this.item.id, language: this.#languageService.language}))
        .subscribe({
          next: (response) => {
            this.tree = response;
          },
        });
    }
  }

  protected toggleSubscription() {
    if (this.item) {
      const newValue = !this.item.subscription;
      this.#itemsClient
        .setUserItemSubscription(
          new SetUserItemSubscriptionRequest({
            itemId: this.item.id,
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
