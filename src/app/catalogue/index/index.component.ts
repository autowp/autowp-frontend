import {AsyncPipe} from '@angular/common';
import {Component, inject} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {
  APIGetItemLinksRequest,
  APIItem,
  APIItemLink,
  GetBrandSectionsRequest,
  GetPicturesRequest,
  ItemFields,
  ItemListOptions,
  ItemParentCacheListOptions,
  ItemType,
  ListItemsRequest,
  Picture,
  PictureFields,
  PictureItemOptions,
  PicturePathRequest,
  PicturesOptions,
  PictureStatus,
} from '@grpc/spec.pb';
import {ItemsClient, PicturesClient} from '@grpc/spec.pbsc';
import {ACLService, Privilege, Resource} from '@services/acl.service';
import {ItemService} from '@services/item';
import {LanguageService} from '@services/language';
import {PageEnvService} from '@services/page-env.service';
import {MarkdownComponent} from '@utils/markdown/markdown.component';
import {getCatalogueSectionsTranslation} from '@utils/translations';
import {combineLatest, EMPTY, Observable, of} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, map, shareReplay, switchMap, tap} from 'rxjs/operators';

import {chunk, chunkBy} from '../../chunk';
import {Thumbnail2Component} from '../../thumbnail/thumbnail2/thumbnail2.component';
import {ToastsService} from '../../toasts/toasts.service';
import {CatalogueService} from '../catalogue-service';

interface APIBrandSectionGroup {
  count: number;
  name: string;
  routerLink: string[];
}

interface PictureRoute {
  picture: Picture;
  route: null | string[];
}

@Component({
  imports: [MarkdownComponent, RouterLink, Thumbnail2Component, AsyncPipe],
  selector: 'app-catalogue-index',
  templateUrl: './index.component.html',
})
export class CatalogueIndexComponent {
  private readonly pageEnv = inject(PageEnvService);
  private readonly itemService = inject(ItemService);
  private readonly route = inject(ActivatedRoute);
  private readonly acl = inject(ACLService);
  private readonly router = inject(Router);
  private readonly catalogue = inject(CatalogueService);
  private readonly itemsClient = inject(ItemsClient);
  readonly #languageService = inject(LanguageService);
  readonly #toastService = inject(ToastsService);
  readonly #picturesClient = inject(PicturesClient);

  protected readonly ItemType = ItemType;

  protected readonly isModer$ = this.acl
    .isAllowed$(Resource.GLOBAL, Privilege.MODERATE)
    .pipe(shareReplay({bufferSize: 1, refCount: false}));

  protected readonly brand$: Observable<APIItem> = combineLatest([
    this.isModer$,
    this.route.paramMap.pipe(
      map((params) => params.get('brand')),
      distinctUntilChanged(),
      debounceTime(10),
    ),
  ]).pipe(
    switchMap(([isModer, catname]) => {
      if (!catname) {
        this.router.navigate(['/error-404'], {
          skipLocationChange: true,
        });
        return EMPTY;
      }

      const fields = new ItemFields({
        descendantTwinsGroupsCount: true,
        description: true,
        fullName: true,
        logo120: true,
        mostsActive: true,
        nameOnly: true,
        nameText: true,
      });
      if (isModer) {
        fields.inboxPicturesCount = true;
        fields.commentsAttentionsCount = true;
      }

      return this.itemsClient.list(
        new ListItemsRequest({
          fields,
          language: this.#languageService.language,
          limit: 1,
          options: new ItemListOptions({
            catname,
          }),
        }),
      );
    }),
    catchError((response: unknown) => {
      this.#toastService.handleError(response);
      return EMPTY;
    }),
    switchMap((response) => {
      if (!response.items || response.items.length <= 0) {
        this.router.navigate(['/error-404'], {
          skipLocationChange: true,
        });
        return EMPTY;
      }

      return of(response.items[0]);
    }),
    tap((brand) => {
      this.pageEnv.set({
        pageId: 10,
        title: brand.nameText,
      });
    }),
    shareReplay({bufferSize: 1, refCount: false}),
  );

  protected readonly pictures$ = this.brand$.pipe(
    switchMap((brand) =>
      this.#picturesClient.getPictures(
        new GetPicturesRequest({
          fields: new PictureFields({
            commentsCount: true,
            moderVote: true,
            nameHtml: true,
            nameText: true,
            path: new PicturePathRequest({parentId: brand.id}),
            thumbMedium: true,
            views: true,
            votes: true,
          }),
          language: this.#languageService.language,
          limit: 12,
          options: new PicturesOptions({
            pictureItem: new PictureItemOptions({
              itemParentCacheAncestor: new ItemParentCacheListOptions({parentId: brand.id}),
            }),
            status: PictureStatus.PICTURE_STATUS_ACCEPTED,
          }),
          order: GetPicturesRequest.Order.LIKES,
        }),
      ),
    ),
    map((response) => {
      const pictures: PictureRoute[] = (response.items || []).map((pic) => ({
        picture: pic,
        route: this.catalogue.picturePathToRoute(pic),
      }));

      return chunkBy(pictures, 4);
    }),
  );

  protected readonly links$ = this.brand$.pipe(
    switchMap((brand) => this.itemsClient.getItemLinks(new APIGetItemLinksRequest({itemId: '' + brand.id}))),
    map((response) => {
      const official: APIItemLink[] = [];
      const club: APIItemLink[] = [];
      const other: APIItemLink[] = [];
      (response.items ? response.items : []).forEach((item) => {
        switch (item.type) {
          case 'club':
            club.push(item);
            break;
          case 'official':
            official.push(item);
            break;
          default:
            other.push(item);
            break;
        }
      });
      return {club, official, other};
    }),
  );

  protected readonly factories$ = this.brand$.pipe(
    switchMap((brand) =>
      this.itemService.getItems$({
        factories_of_brand: +brand.id,
        fields: 'name_html,exact_picture.thumb_medium',
        limit: 4,
        type_id: ItemType.ITEM_TYPE_FACTORY,
      }),
    ),
    map((response) => response.items),
  );

  protected readonly sections$: Observable<
    {halfChunks: APIBrandSectionGroup[][][]; name: string; routerLink: string[]}[]
  > = this.brand$.pipe(
    switchMap((brand) =>
      this.itemsClient.getBrandSections(
        new GetBrandSectionsRequest({
          itemId: brand.id,
          language: this.#languageService.language,
        }),
      ),
    ),
    map((response) =>
      (response.sections || []).map((section) => ({
        halfChunks: chunk(section.groups || [], 2).map((halfChunk) => chunk(halfChunk, 2)),
        name: getCatalogueSectionsTranslation(section.name),
        routerLink: section.routerLink,
      })),
    ),
  );
}
