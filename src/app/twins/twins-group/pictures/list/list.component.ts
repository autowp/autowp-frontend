import {AsyncPipe} from '@angular/common';
import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {
  APIItem,
  ItemFields,
  ItemParentCacheListOptions,
  ItemRequest,
  PictureFields,
  PictureItemListOptions,
  PictureListOptions,
  PicturesList,
  PicturesRequest,
  PictureStatus,
} from '@grpc/spec.pb';
import {ItemsClient, PicturesClient} from '@grpc/spec.pbsc';
import {LanguageService} from '@services/language';
import {PageEnvService} from '@services/page-env.service';
import {combineLatest, EMPTY, Observable, of} from 'rxjs';
import {catchError, distinctUntilChanged, map, shareReplay, switchMap, tap} from 'rxjs/operators';

import {PaginatorComponent} from '../../../../paginator/paginator/paginator.component';
import {ThumbnailComponent} from '../../../../thumbnail/thumbnail/thumbnail.component';
import {ToastsService} from '../../../../toasts/toasts.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PaginatorComponent, AsyncPipe, ThumbnailComponent],
  selector: 'app-twins-group-pictures-list',
  templateUrl: './list.component.html',
})
export class TwinsGroupPicturesListComponent {
  readonly #route = inject(ActivatedRoute);
  readonly #pageEnv = inject(PageEnvService);
  readonly #toastService = inject(ToastsService);
  readonly #router = inject(Router);
  readonly #itemsClient = inject(ItemsClient);
  readonly #picturesClient = inject(PicturesClient);
  readonly #languageService = inject(LanguageService);

  protected readonly id$: Observable<string> = this.#route.parent!.parent!.paramMap.pipe(
    map((params) => params.get('group') ?? ''),
    distinctUntilChanged(),
    shareReplay({bufferSize: 1, refCount: false}),
  );

  protected readonly group$: Observable<APIItem> = this.id$.pipe(
    switchMap((group) => {
      if (!group) {
        this.#router.navigate(['/error-404'], {
          skipLocationChange: true,
        });
        return EMPTY;
      }
      return this.#itemsClient.item(
        new ItemRequest({
          fields: new ItemFields({
            nameHtml: true,
            nameText: true,
          }),
          id: group,
          language: this.#languageService.language,
        }),
      );
    }),
    tap((group) => {
      setTimeout(
        () =>
          this.#pageEnv.set({
            pageId: 28,
            title: $localize`All pictures of ${group.nameText}`,
          }),
        0,
      );
    }),
    shareReplay({bufferSize: 1, refCount: false}),
  );

  readonly #page$ = this.#route.queryParamMap.pipe(
    map((params) => parseInt(params.get('page') ?? '', 10)),
    distinctUntilChanged(),
  );

  protected readonly data$: Observable<null | PicturesList> = combineLatest([this.#page$, this.id$]).pipe(
    switchMap(([page, groupId]) =>
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
          limit: 24,
          options: new PictureListOptions({
            pictureItem: new PictureItemListOptions({
              itemParentCacheAncestor: new ItemParentCacheListOptions({parentId: groupId}),
            }),
            status: PictureStatus.PICTURE_STATUS_ACCEPTED,
          }),
          order: PicturesRequest.Order.ORDER_PERSPECTIVES,
          page,
          paginator: true,
        }),
      ),
    ),
    catchError((err: unknown) => {
      this.#toastService.handleError(err);
      return of(null);
    }),
  );
}
