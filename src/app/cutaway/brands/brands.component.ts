import {AsyncPipe} from '@angular/common';
import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {
  APIItem,
  ItemFields,
  ItemListOptions,
  ItemParentCacheListOptions,
  ItemsRequest,
  ItemType,
  PictureFields,
  PictureItemListOptions,
  PictureItemType,
  PictureListOptions,
  PictureStatus,
  PreviewPicturesRequest,
} from '@grpc/spec.pb';
import {ItemsClient} from '@grpc/spec.pbsc';
import {LanguageService} from '@services/language';
import {PageEnvService} from '@services/page-env.service';
import {
  CatalogueListItem2,
  CatalogueListItem2Component,
  CatalogueListItemPicture2,
} from '@utils/list-item/list-item2.component';
import {EMPTY} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, map, switchMap} from 'rxjs/operators';

import {PaginatorComponent} from '../../paginator/paginator/paginator.component';
import {ToastsService} from '../../toasts/toasts.service';

@Component({
  imports: [RouterLink, PaginatorComponent, AsyncPipe, CatalogueListItem2Component],
  selector: 'app-cutaway-brands',
  templateUrl: './brands.component.html',
})
export class CutawayBrandsComponent implements OnInit {
  readonly #route = inject(ActivatedRoute);
  readonly #pageEnv = inject(PageEnvService);
  readonly #toastService = inject(ToastsService);
  readonly #languageService = inject(LanguageService);
  readonly #itemsClient = inject(ItemsClient);

  protected readonly query$ = this.#route.queryParamMap.pipe(
    map((params) => parseInt(params.get('page') ?? '', 10)),
    distinctUntilChanged(),
    debounceTime(30),
    switchMap((page) =>
      this.#itemsClient.list(
        new ItemsRequest({
          fields: new ItemFields({
            descendantPicturesCount: true,
            description: true,
            hasText: true,
            nameDefault: true,
            nameHtml: true,
            previewPictures: new PreviewPicturesRequest({
              perspectiveId: 9,
              picture: new PictureFields({nameText: true}),
              typeId: PictureItemType.PICTURE_ITEM_CONTENT,
            }),
          }),
          language: this.#languageService.language,
          limit: 12,
          options: new ItemListOptions({
            descendant: new ItemParentCacheListOptions({
              pictureItemsByItemId: new PictureItemListOptions({
                perspectiveId: 9,
                pictures: new PictureListOptions({
                  status: PictureStatus.PICTURE_STATUS_ACCEPTED,
                }),
                typeId: PictureItemType.PICTURE_ITEM_CONTENT,
              }),
            }),
            typeId: ItemType.ITEM_TYPE_BRAND,
          }),
          order: ItemsRequest.Order.AGE,
          page,
        }),
      ),
    ),
    catchError((response: unknown) => {
      this.#toastService.handleError(response);
      return EMPTY;
    }),
    map((response) => ({
      items: this.prepareItems(response.items || []),
      paginator: response.paginator,
    })),
  );

  ngOnInit(): void {
    setTimeout(() => this.#pageEnv.set({pageId: 201}), 0);
  }

  private prepareItems(items: APIItem[]): CatalogueListItem2[] {
    return items.map((item) => {
      const itemRouterLink = ['/cutaway/brands', item.catname];

      const pictures: CatalogueListItemPicture2[] = (item.previewPictures?.pictures || []).map((picture) => ({
        picture: picture ? picture : null,
        routerLink: picture ? ['/picture', picture.identity] : undefined,
        thumb: picture ? picture.thumbMedium : null,
      }));

      return {
        acceptedPicturesCount: undefined,
        canEditSpecs: item.canEditSpecs,
        childsCounts: null,
        description: item.description,
        design: null,
        details: {
          count: item.descendantPicturesCount ?? 0,
          routerLink: itemRouterLink,
        },
        engine_vehicles: undefined,
        hasText: item.hasText,
        id: item.id,
        itemTypeId: item.itemTypeId,
        nameDefault: item.nameDefault,
        nameHtml: item.nameHtml,
        picturesRouterLink: itemRouterLink,
        previewPictures: {
          largeFormat: !!item.previewPictures?.largeFormat,
          pictures,
        },
        produced: null,
        producedExactly: null,
        specsRouterLink: null,
      };
    });
  }
}
