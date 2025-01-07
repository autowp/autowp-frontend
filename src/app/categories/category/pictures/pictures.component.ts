import {AsyncPipe} from '@angular/common';
import {Component, inject} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PageEnvService} from '@services/page-env.service';
import {combineLatest, EMPTY, Observable} from 'rxjs';
import {catchError, distinctUntilChanged, map, switchMap, tap} from 'rxjs/operators';

import {chunkBy} from '../../../chunk';
import {PaginatorComponent} from '../../../paginator/paginator/paginator.component';
import {Thumbnail2Component} from '../../../thumbnail/thumbnail2/thumbnail2.component';
import {CategoriesService} from '../../service';
import {
  GetPicturesRequest,
  ItemParentCacheListOptions,
  Pages,
  Picture,
  PictureFields,
  PictureItemOptions,
  PicturesOptions,
  PictureStatus,
} from '@grpc/spec.pb';
import {PicturesClient} from '@grpc/spec.pbsc';
import {LanguageService} from '@services/language';
import {ToastsService} from '../../../toasts/toasts.service';

interface PictureRoute {
  picture: Picture;
  route: string[];
}

@Component({
  imports: [Thumbnail2Component, PaginatorComponent, AsyncPipe],
  selector: 'app-categories-category-pictures',
  templateUrl: './pictures.component.html',
})
export class CategoriesCategoryPicturesComponent {
  private readonly pageEnv = inject(PageEnvService);
  private readonly route = inject(ActivatedRoute);
  private readonly categoriesService = inject(CategoriesService);
  readonly #picturesClient = inject(PicturesClient);
  readonly #languageService = inject(LanguageService);
  readonly #toastService = inject(ToastsService);

  private readonly page$ = this.route.queryParamMap.pipe(
    map((params) => parseInt(params.get('page') ?? '', 10)),
    distinctUntilChanged(),
  );

  protected readonly data$: Observable<{
    paginator: Pages | undefined;
    pictures: PictureRoute[][];
  }> = combineLatest([this.categoriesService.categoryPipe$(this.route.parent!.parent!), this.page$]).pipe(
    switchMap(([{category, current, pathCatnames}, page]) => {
      if (!category) {
        return EMPTY;
      }

      return this.#picturesClient
        .getPictures(
          new GetPicturesRequest({
            options: new PicturesOptions({
              pictureItem: new PictureItemOptions({
                itemParentCacheAncestor: new ItemParentCacheListOptions({parentId: '' + current.id}),
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
            limit: 20,
            page,
            language: this.#languageService.language,
            order: GetPicturesRequest.Order.PERSPECTIVES,
            paginator: true,
          }),
        )
        .pipe(
          catchError((err: unknown) => {
            this.#toastService.handleError(err);
            return EMPTY;
          }),
          map(({paginator, items}) => {
            const pics: PictureRoute[] = (items || []).map((pic) => ({
              picture: pic,
              route: ['/category', category.catname, ...pathCatnames, 'pictures', pic.identity],
            }));

            return {
              paginator,
              pictures: chunkBy(pics, 4),
            };
          }),
        );
    }),
    tap(() => {
      this.pageEnv.set({pageId: 22});
    }),
  );
}
