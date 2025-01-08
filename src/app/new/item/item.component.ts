import {AsyncPipe, DatePipe} from '@angular/common';
import {Component, inject} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {Date as GrpcDate} from '@grpc/google/type/date.pb';
import {
  GetPicturesRequest,
  ItemFields,
  ItemParentCacheListOptions,
  ItemRequest,
  PictureFields,
  PictureItemOptions,
  PicturesOptions,
  PictureStatus,
} from '@grpc/spec.pb';
import {ItemsClient, PicturesClient} from '@grpc/spec.pbsc';
import {LanguageService} from '@services/language';
import {PageEnvService} from '@services/page-env.service';
import {combineLatest, EMPTY} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, map, shareReplay, switchMap, tap} from 'rxjs/operators';

import {PaginatorComponent} from '../../paginator/paginator/paginator.component';
import {Thumbnail2Component} from '../../thumbnail/thumbnail2/thumbnail2.component';
import {ToastsService} from '../../toasts/toasts.service';

const parseDate = (date: string): GrpcDate => {
  const parts = date.split('-');
  const year = parts.length > 0 ? parseInt(parts[0], 10) : 0;
  const month = parts.length > 1 ? parseInt(parts[1], 10) : 0;
  const day = parts.length > 2 ? parseInt(parts[2], 10) : 0;

  return new GrpcDate({day, month, year});
};

@Component({
  imports: [RouterLink, Thumbnail2Component, PaginatorComponent, AsyncPipe, DatePipe],
  selector: 'app-new-item',
  templateUrl: './item.component.html',
})
export class NewItemComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly pageEnv = inject(PageEnvService);
  private readonly toastService = inject(ToastsService);
  private readonly itemsClient = inject(ItemsClient);
  readonly #picturesClient = inject(PicturesClient);
  readonly #languageService = inject(LanguageService);

  private readonly itemID$ = this.route.paramMap.pipe(
    map((params) => params.get('item_id') ?? ''),
    distinctUntilChanged(),
    debounceTime(10),
    shareReplay({bufferSize: 1, refCount: false}),
  );

  protected readonly date$ = this.route.paramMap.pipe(
    map((params) => params.get('date')),
    distinctUntilChanged(),
    debounceTime(10),
  );

  private readonly page$ = this.route.queryParamMap.pipe(
    map((query) => parseInt(query.get('page') ?? '', 10)),
    distinctUntilChanged(),
    debounceTime(30),
  );

  protected readonly item$ = this.itemID$.pipe(
    switchMap((itemID) =>
      this.itemsClient.item(
        new ItemRequest({
          fields: new ItemFields({
            nameHtml: true,
            nameText: true,
          }),
          id: itemID,
          language: this.#languageService.language,
        }),
      ),
    ),
    catchError((err: unknown) => {
      this.toastService.handleError(err);
      return EMPTY;
    }),
    tap((item) => {
      this.pageEnv.set({
        pageId: 210,
        title: item.nameText,
      });
    }),
    shareReplay({bufferSize: 1, refCount: false}),
  );

  protected readonly pictures$ = combineLatest([this.itemID$, this.date$, this.page$]).pipe(
    switchMap(([itemID, date, page]) =>
      this.#picturesClient.getPictures(
        new GetPicturesRequest({
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
          options: new PicturesOptions({
            acceptDate: date ? parseDate(date) : undefined,
            pictureItem: new PictureItemOptions({
              itemParentCacheAncestor: new ItemParentCacheListOptions({parentId: itemID}),
            }),
            status: PictureStatus.PICTURE_STATUS_ACCEPTED,
          }),
          order: GetPicturesRequest.Order.ADD_DATE_DESC,
          page,
          paginator: true,
        }),
      ),
    ),
    catchError((err: unknown) => {
      this.toastService.handleError(err);
      return EMPTY;
    }),
  );
}
