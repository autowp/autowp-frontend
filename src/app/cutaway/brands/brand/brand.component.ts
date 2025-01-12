import {AsyncPipe} from '@angular/common';
import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {
  APIItem,
  GetPicturesResponse,
  ItemFields,
  ItemListOptions,
  ItemParentCacheListOptions,
  ListItemsRequest,
  PictureFields,
  PictureItemListOptions,
  PictureListOptions,
  PicturesRequest,
  PictureStatus,
} from '@grpc/spec.pb';
import {ItemsClient, PicturesClient} from '@grpc/spec.pbsc';
import {LanguageService} from '@services/language';
import {PageEnvService} from '@services/page-env.service';
import {combineLatest, EMPTY, Observable, of} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, map, shareReplay, switchMap} from 'rxjs/operators';

import {PaginatorComponent} from '../../../paginator/paginator/paginator.component';
import {Thumbnail2Component} from '../../../thumbnail/thumbnail2/thumbnail2.component';
import {ToastsService} from '../../../toasts/toasts.service';

@Component({
  imports: [RouterLink, Thumbnail2Component, PaginatorComponent, AsyncPipe],
  selector: 'app-cutaway',
  templateUrl: './brand.component.html',
})
export class CutawayBrandsBrandComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly pageEnv = inject(PageEnvService);
  private readonly toastService = inject(ToastsService);
  private readonly itemsClient = inject(ItemsClient);
  readonly #picturesClient = inject(PicturesClient);
  readonly #languageService = inject(LanguageService);

  protected readonly brand$: Observable<APIItem> = this.route.paramMap.pipe(
    map((params) => '' + params.get('brand')),
    distinctUntilChanged(),
    debounceTime(10),
    switchMap((catname) => {
      if (!catname) {
        return EMPTY;
      }
      return this.itemsClient.list(
        new ListItemsRequest({
          fields: new ItemFields({
            nameHtml: true,
            nameText: true,
          }),
          language: this.#languageService.language,
          limit: 1,
          options: new ItemListOptions({
            catname,
          }),
        }),
      );
    }),
    switchMap((response) => (response.items && response.items.length > 0 ? of(response.items[0]) : EMPTY)),
    shareReplay({bufferSize: 1, refCount: false}),
  );

  protected readonly query$: Observable<GetPicturesResponse> = combineLatest([
    this.brand$,
    this.route.queryParamMap,
  ]).pipe(
    switchMap(([brand, params]) =>
      this.#picturesClient.getPictures(
        new PicturesRequest({
          fields: new PictureFields({
            commentsCount: true,
            moderVote: true,
            nameHtml: true,
            nameText: true,
            thumbMedium: true,
            views: true,
            votes: true,
          }),
          language: this.#languageService.language,
          limit: 12,
          options: new PictureListOptions({
            pictureItem: new PictureItemListOptions({
              itemParentCacheAncestor: new ItemParentCacheListOptions({parentId: brand.id}),
              perspectiveId: 9,
            }),
            status: PictureStatus.PICTURE_STATUS_ACCEPTED,
          }),
          order: PicturesRequest.Order.ACCEPT_DATETIME_DESC,
          page: parseInt(params.get('page') ?? '', 10),
          paginator: true,
        }),
      ),
    ),
    catchError((response: unknown) => {
      this.toastService.handleError(response);
      return EMPTY;
    }),
  );

  ngOnInit(): void {
    setTimeout(() => this.pageEnv.set({pageId: 109}), 0);
  }
}
