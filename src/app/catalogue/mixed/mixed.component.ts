import {AsyncPipe} from '@angular/common';
import {Component, inject} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {
  APIItem,
  GetPicturesRequest,
  ItemFields,
  ItemListOptions,
  ListItemsRequest,
  Pages,
  Picture,
  PictureFields,
  PictureItemOptions,
  PicturesOptions,
  PictureStatus,
} from '@grpc/spec.pb';
import {ItemsClient, PicturesClient} from '@grpc/spec.pbsc';
import {LanguageService} from '@services/language';
import {PageEnvService} from '@services/page-env.service';
import {combineLatest, EMPTY, Observable, of} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, map, shareReplay, switchMap, tap} from 'rxjs/operators';

import {chunkBy} from '../../chunk';
import {PaginatorComponent} from '../../paginator/paginator/paginator.component';
import {Thumbnail2Component} from '../../thumbnail/thumbnail2/thumbnail2.component';
import {BrandPerspectivePageData} from '../catalogue.module';
import {ToastsService} from '../../toasts/toasts.service';

@Component({
  imports: [RouterLink, Thumbnail2Component, PaginatorComponent, AsyncPipe],
  selector: 'app-catalogue-mixed',
  templateUrl: './mixed.component.html',
})
export class CatalogueMixedComponent {
  private readonly pageEnv = inject(PageEnvService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly itemsClient = inject(ItemsClient);
  readonly #picturesClient = inject(PicturesClient);
  readonly #languageService = inject(LanguageService);
  private readonly toastService = inject(ToastsService);

  protected readonly brand$: Observable<APIItem> = this.route.paramMap.pipe(
    map((params) => params.get('brand')),
    distinctUntilChanged(),
    debounceTime(10),
    switchMap((catname) => {
      if (!catname) {
        this.router.navigate(['/error-404'], {
          skipLocationChange: true,
        });
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
    map((response) => (response.items?.length ? response.items[0] : null)),
    switchMap((brand) => {
      if (!brand) {
        this.router.navigate(['/error-404'], {
          skipLocationChange: true,
        });
        return EMPTY;
      }
      return of(brand);
    }),
    shareReplay({bufferSize: 1, refCount: false}),
  );

  private readonly page$ = this.route.queryParamMap.pipe(
    map((queryParams) => parseInt(queryParams.get('page') ?? '', 10)),
    distinctUntilChanged(),
    debounceTime(10),
  );

  protected readonly data$ = (this.route.data as Observable<BrandPerspectivePageData>).pipe(
    tap((data) => {
      this.pageEnv.set({
        pageId: data.page_id,
        title: data.title,
      });
    }),
    shareReplay({bufferSize: 1, refCount: false}),
  );

  protected readonly pictures$: Observable<{paginator: Pages | undefined; pictures: Picture[][]}> = combineLatest([
    this.page$,
    this.brand$,
    this.data$,
  ]).pipe(
    switchMap(([page, brand, data]) =>
      this.#picturesClient.getPictures(
        new GetPicturesRequest({
          options: new PicturesOptions({
            pictureItem: new PictureItemOptions({
              itemId: brand.id,
              perspectiveId: data.perspective_id,
              excludePerspectiveId: data.perspective_exclude_id ? [+data.perspective_exclude_id] : undefined,
            }),
            status: PictureStatus.PICTURE_STATUS_ACCEPTED,
          }),
          fields: new PictureFields({
            thumbMedium: true,
            nameText: true,
            nameHtml: true,
            votes: true,
            views: true,
            commentsCount: true,
            moderVote: true,
          }),
          limit: 12,
          page,
          language: this.#languageService.language,
          order: GetPicturesRequest.Order.RESOLUTION_DESC,
          paginator: true,
        }),
      ),
    ),
    catchError((err: unknown) => {
      this.toastService.handleError(err);
      return EMPTY;
    }),
    map((response) => ({
      paginator: response.paginator,
      pictures: chunkBy(response.items || [], 4),
    })),
    shareReplay({bufferSize: 1, refCount: false}),
  );
}
