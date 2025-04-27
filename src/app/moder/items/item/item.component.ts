import {AsyncPipe} from '@angular/common';
import {ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, signal} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {
  APIItem,
  APITreeItem,
  GetTreeRequest,
  ItemFields,
  ItemParentCacheListOptions,
  ItemRequest,
  ItemType,
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
import {BehaviorSubject, combineLatest, EMPTY, Observable, of, throwError} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, map, shareReplay, switchMap, tap} from 'rxjs/operators';

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
  visible: boolean;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
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
export class ModerItemsItemComponent {
  readonly #auth = inject(AuthService);
  readonly #route = inject(ActivatedRoute);
  readonly #router = inject(Router);
  readonly #pageEnv = inject(PageEnvService);
  readonly #toastService = inject(ToastsService);
  readonly #itemsClient = inject(ItemsClient);
  readonly #picturesClient = inject(PicturesClient);
  readonly #languageService = inject(LanguageService);
  readonly #cdr = inject(ChangeDetectorRef);

  protected readonly reloadItem$ = new BehaviorSubject<void>(void 0);

  protected readonly specsAllowed = signal(false);
  protected readonly canEditSpecifications$ = this.#auth.authenticated$;

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

  protected readonly activeTab$ = this.#route.queryParamMap.pipe(
    map((params) => params.get('tab')),
    distinctUntilChanged(),
    debounceTime(30),
    map((tab) => (tab ? tab : 'meta')),
  );

  readonly #itemID: Observable<string> = this.#route.paramMap.pipe(
    map((params) => params.get('id') ?? ''),
    distinctUntilChanged(),
    debounceTime(30),
  );

  protected readonly item$: Observable<APIItem> = combineLatest([this.#itemID, this.reloadItem$]).pipe(
    switchMap(([id]) =>
      this.#itemsClient.item(
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
      ),
    ),
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
    tap((item) => {
      this.#pageEnv.set({
        layout: {isAdminPage: true},
        pageId: 78,
        title: item.nameText,
      });

      const typeID = item.itemTypeId;

      this.specsAllowed.set([ItemType.ITEM_TYPE_ENGINE, ItemType.ITEM_TYPE_VEHICLE].includes(typeID));

      this.nameTab.count = item.itemLanguageCount;
      this.logoTab.count = item.logo ? 1 : 0;
      this.catalogueTab.count = item.parentsCount + item.childsCount;
      this.vehiclesTab.count = item.engineVehiclesCount;
      this.picturesTab.count = item.exactPicturesCount;
      this.linksTab.count = item.linksCount;

      this.metaTab.visible = true;
      this.nameTab.visible = true;
      this.catalogueTab.visible = ![ItemType.ITEM_TYPE_COPYRIGHT, ItemType.ITEM_TYPE_MUSEUM].includes(typeID);
      this.treeTab.visible = ![ItemType.ITEM_TYPE_COPYRIGHT, ItemType.ITEM_TYPE_MUSEUM].includes(typeID);
      this.linksTab.visible = [ItemType.ITEM_TYPE_BRAND, ItemType.ITEM_TYPE_MUSEUM, ItemType.ITEM_TYPE_PERSON].includes(
        typeID,
      );
      this.logoTab.visible = typeID === ItemType.ITEM_TYPE_BRAND;
      this.vehiclesTab.visible = typeID === ItemType.ITEM_TYPE_ENGINE;
      this.picturesTab.visible = [
        ItemType.ITEM_TYPE_BRAND,
        ItemType.ITEM_TYPE_COPYRIGHT,
        ItemType.ITEM_TYPE_ENGINE,
        ItemType.ITEM_TYPE_FACTORY,
        ItemType.ITEM_TYPE_MUSEUM,
        ItemType.ITEM_TYPE_PERSON,
        ItemType.ITEM_TYPE_VEHICLE,
      ].includes(typeID);
      this.#cdr.markForCheck();
    }),
    shareReplay({bufferSize: 1, refCount: false}),
  );

  protected readonly tree$: Observable<APITreeItem> = this.item$.pipe(
    switchMap((item) =>
      this.#itemsClient.getTree(new GetTreeRequest({id: item.id, language: this.#languageService.language})),
    ),
  );

  protected readonly randomPicture$ = this.item$.pipe(
    switchMap((item) =>
      this.#picturesClient.getPicture(
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
      ),
    ),
    catchError((error: unknown) => {
      if (error instanceof GrpcStatusEvent && error.statusCode == 5) {
        // NOT_FOUND
        return of(undefined);
      }
      console.error(error);
      return throwError(() => error);
    }),
  );

  protected toggleSubscription(item: APIItem) {
    const newValue = !item.subscription;
    this.#itemsClient
      .setUserItemSubscription(
        new SetUserItemSubscriptionRequest({
          itemId: item.id,
          subscribed: newValue,
        }),
      )
      .subscribe(() => {
        item.subscription = newValue;
        this.#cdr.markForCheck();
      });
  }

  protected getItemTypeTranslation(id: number, type: string) {
    return getItemTypeTranslation(id, type);
  }
}
