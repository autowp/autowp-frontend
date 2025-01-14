import {AsyncPipe} from '@angular/common';
import {Component, inject} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {
  APIItem,
  GetPicturesRequest,
  ItemFields,
  ItemListOptions,
  ItemParentCacheListOptions,
  ListItemsRequest,
  Picture,
  PictureFields,
  PictureItemOptions,
  PicturePathRequest,
  PicturesOptions,
  PictureStatus,
} from '@grpc/spec.pb';
import {ItemsClient, PicturesClient} from '@grpc/spec.pbsc';
import {LanguageService} from '@services/language';
import {PageEnvService} from '@services/page-env.service';
import {combineLatest, EMPTY, Observable} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, map, shareReplay, switchMap, tap} from 'rxjs/operators';

import {chunkBy} from '../../chunk';
import {PaginatorComponent} from '../../paginator/paginator/paginator.component';
import {Thumbnail2Component} from '../../thumbnail/thumbnail2/thumbnail2.component';
import {ToastsService} from '../../toasts/toasts.service';
import {CatalogueService} from '../catalogue-service';

interface PictureRoute {
  picture: Picture;
  route: null | string[];
}

@Component({
  imports: [RouterLink, Thumbnail2Component, PaginatorComponent, AsyncPipe],
  selector: 'app-catalogue-recent',
  templateUrl: './recent.component.html',
})
export class CatalogueRecentComponent {
  private readonly pageEnv = inject(PageEnvService);
  private readonly route = inject(ActivatedRoute);
  private readonly catalogue = inject(CatalogueService);
  private readonly itemsClient = inject(ItemsClient);
  readonly #languageService = inject(LanguageService);
  readonly #toastService = inject(ToastsService);
  readonly #picturesClient = inject(PicturesClient);

  private readonly page$ = this.route.queryParamMap.pipe(
    map((queryParams) => parseInt(queryParams.get('page') ?? '', 10)),
    distinctUntilChanged(),
    debounceTime(10),
  );

  protected readonly brand$: Observable<APIItem | null> = this.route.paramMap.pipe(
    map((params) => params.get('brand')),
    distinctUntilChanged(),
    debounceTime(10),
    switchMap((catname) => {
      if (!catname) {
        return EMPTY;
      }
      return this.itemsClient
        .list(
          new ListItemsRequest({
            fields: new ItemFields({
              nameHtml: true,
              nameOnly: true,
            }),
            language: this.#languageService.language,
            limit: 1,
            options: new ItemListOptions({
              catname,
            }),
          }),
        )
        .pipe(
          map((response) => (response.items?.length ? response.items[0] : null)),
          tap((brand) => {
            if (brand) {
              this.pageEnv.set({
                pageId: 15,
                title: $localize`Last pictures of ${brand.nameText}`,
              });
            }
          }),
        );
    }),
    shareReplay({bufferSize: 1, refCount: false}),
  );

  protected readonly data$ = combineLatest([this.brand$, this.page$]).pipe(
    switchMap(([brand, page]) =>
      brand
        ? this.#picturesClient.getPictures(
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
              order: GetPicturesRequest.Order.ACCEPT_DATETIME_DESC,
              page,
              paginator: true,
            }),
          )
        : EMPTY,
    ),
    catchError((err: unknown) => {
      this.#toastService.handleError(err);
      return EMPTY;
    }),
    map((response) => {
      const pictures: PictureRoute[] = (response.items || []).map((picture) => ({
        picture,
        route: this.catalogue.picturePathToRoute(picture),
      }));
      return {
        paginator: response.paginator,
        pictures: chunkBy(pictures, 4),
      };
    }),
  );
}
