import {AsyncPipe} from '@angular/common';
import {Component, inject} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {
  APIGetItemLinksRequest,
  APIItem,
  APIItemLink,
  ItemFields,
  ItemListOptions,
  ItemType,
  ListItemsRequest,
} from '@grpc/spec.pb';
import {ItemsClient} from '@grpc/spec.pbsc';
import {ACLService, Privilege, Resource} from '@services/acl.service';
import {APIService} from '@services/api.service';
import {ItemService} from '@services/item';
import {LanguageService} from '@services/language';
import {PageEnvService} from '@services/page-env.service';
import {APIPicture, PictureService} from '@services/picture';
import {getCatalogueSectionsTranslation} from '@utils/translations';
import {combineLatest, EMPTY, Observable, of} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, map, shareReplay, switchMap, tap} from 'rxjs/operators';

import {chunk, chunkBy} from '../../chunk';
import {ThumbnailComponent} from '../../thumbnail/thumbnail/thumbnail.component';
import {ToastsService} from '../../toasts/toasts.service';
import {MarkdownComponent} from '../../utils/markdown/markdown.component';
import {CatalogueService} from '../catalogue-service';

interface APIBrandSectionGroup {
  count: number;
  name: string;
  routerLink: string[];
}

interface APIBrandSection {
  groups: APIBrandSectionGroup[];
  name: string;
  routerLink: string[];
}

interface PictureRoute {
  picture: APIPicture;
  route: null | string[];
}

@Component({
  imports: [MarkdownComponent, RouterLink, ThumbnailComponent, AsyncPipe],
  selector: 'app-catalogue-index',
  standalone: true,
  templateUrl: './index.component.html',
})
export class CatalogueIndexComponent {
  private readonly pageEnv = inject(PageEnvService);
  private readonly itemService = inject(ItemService);
  private readonly route = inject(ActivatedRoute);
  private readonly pictureService = inject(PictureService);
  private readonly acl = inject(ACLService);
  private readonly api = inject(APIService);
  private readonly router = inject(Router);
  private readonly catalogue = inject(CatalogueService);
  private readonly itemsClient = inject(ItemsClient);
  private readonly languageService = inject(LanguageService);
  private readonly toastService = inject(ToastsService);

  protected readonly ItemType = ItemType;

  protected readonly isModer$ = this.acl.isAllowed$(Resource.GLOBAL, Privilege.MODERATE).pipe(shareReplay(1));

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
          language: this.languageService.language,
          limit: 1,
          options: new ItemListOptions({
            catname,
          }),
        }),
      );
    }),
    catchError((response: unknown) => {
      this.toastService.handleError(response);
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
    shareReplay(1),
  );

  protected readonly pictures$ = this.brand$.pipe(
    switchMap((brand) =>
      this.pictureService.getPictures$({
        fields: 'owner,thumb_medium,votes,views,comments_count,name_html,name_text,path',
        item_id: +brand.id,
        limit: 12,
        order: 12,
        status: 'accepted',
      }),
    ),
    map((response) => {
      const pictures: PictureRoute[] = response.pictures.map((pic) => ({
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
    switchMap((brand) => this.api.request<APIBrandSection[]>('GET', 'brands/' + brand.id + '/sections')),
    map((response) =>
      response.map((section) => ({
        halfChunks: chunk(section.groups, 2).map((halfChunk) => chunk(halfChunk, 2)),
        name: getCatalogueSectionsTranslation(section.name),
        routerLink: section.routerLink,
      })),
    ),
  );
}
