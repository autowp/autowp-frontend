import {AsyncPipe} from '@angular/common';
import {Component, inject} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {
  APIGetItemLinksRequest,
  APIItem,
  APIItemLink,
  GetPicturesRequest,
  GetPicturesResponse,
  ItemFields,
  ItemRequest,
  ItemType,
  PictureFields,
  PictureItemOptions,
  PictureItemType,
  PicturesOptions,
  PictureStatus,
} from '@grpc/spec.pb';
import {ItemsClient, PicturesClient} from '@grpc/spec.pbsc';
import {ACLService, Privilege, Resource} from '@services/acl.service';
import {LanguageService} from '@services/language';
import {PageEnvService} from '@services/page-env.service';
import {MarkdownComponent} from '@utils/markdown/markdown.component';
import {combineLatest, EMPTY, Observable, of} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, map, shareReplay, switchMap, tap} from 'rxjs/operators';

import {PaginatorComponent} from '../../../paginator/paginator/paginator.component';
import {Thumbnail2Component} from '../../../thumbnail/thumbnail2/thumbnail2.component';
import {ToastsService} from '../../../toasts/toasts.service';

@Component({
  imports: [MarkdownComponent, Thumbnail2Component, PaginatorComponent, AsyncPipe],
  selector: 'app-persons-person-info',
  templateUrl: './info.component.html',
})
export class PersonsPersonInfoComponent {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly itemsClient = inject(ItemsClient);
  private readonly acl = inject(ACLService);
  private readonly pageEnv = inject(PageEnvService);
  private readonly toastService = inject(ToastsService);
  readonly #picturesClient = inject(PicturesClient);
  readonly #languageService = inject(LanguageService);

  protected readonly isModer$ = this.acl.isAllowed$(Resource.GLOBAL, Privilege.MODERATE);

  private readonly page$ = this.route.queryParamMap.pipe(
    map((params) => parseInt(params.get('page') ?? '', 10)),
    distinctUntilChanged(),
    debounceTime(10),
  );

  private readonly itemID$: Observable<string> = this.route.parent!.paramMap.pipe(
    map((params) => params.get('id') ?? ''),
    distinctUntilChanged(),
    shareReplay({bufferSize: 1, refCount: false}),
  );

  protected readonly item$: Observable<APIItem> = this.itemID$.pipe(
    switchMap((id) =>
      this.itemsClient.item(
        new ItemRequest({
          fields: new ItemFields({
            description: true,
            nameText: true,
          }),
          id,
          language: this.#languageService.language,
        }),
      ),
    ),
    catchError((err: unknown) => {
      this.toastService.handleError(err);
      this.router.navigate(['/error-404'], {
        skipLocationChange: true,
      });
      return EMPTY;
    }),
    switchMap((item) => {
      if (item.itemTypeId !== ItemType.ITEM_TYPE_PERSON) {
        this.router.navigate(['/error-404'], {
          skipLocationChange: true,
        });
        return EMPTY;
      }

      return of(item);
    }),
    tap((item) => {
      this.pageEnv.set({
        pageId: 213,
        title: item.nameText,
      });
    }),
    shareReplay({bufferSize: 1, refCount: false}),
  );

  protected readonly links$: Observable<APIItemLink[]> = this.itemID$.pipe(
    switchMap((itemID) => this.itemsClient.getItemLinks(new APIGetItemLinksRequest({itemId: '' + itemID}))),
    catchError((err: unknown) => {
      this.toastService.handleError(err);
      return of({items: []});
    }),
    map((response) => (response.items ? response.items : [])),
  );

  protected readonly authorPictures$: Observable<GetPicturesResponse | null> = combineLatest([
    this.itemID$,
    this.page$,
  ]).pipe(
    switchMap(([itemID, page]) =>
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
          limit: 12,
          options: new PicturesOptions({
            pictureItem: new PictureItemOptions({
              itemId: itemID,
              typeId: PictureItemType.PICTURE_ITEM_AUTHOR,
            }),
            status: PictureStatus.PICTURE_STATUS_ACCEPTED,
          }),
          order: GetPicturesRequest.Order.LIKES,
          page,
          paginator: true,
        }),
      ),
    ),
    catchError((err: unknown) => {
      this.toastService.handleError(err);
      return of(null);
    }),
  );

  protected readonly contentPictures$: Observable<GetPicturesResponse | null> = combineLatest([
    this.itemID$,
    this.page$,
  ]).pipe(
    switchMap(([itemID, page]) =>
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
          limit: 12,
          options: new PicturesOptions({
            pictureItem: new PictureItemOptions({
              itemId: itemID,
              typeId: PictureItemType.PICTURE_ITEM_CONTENT,
            }),
            status: PictureStatus.PICTURE_STATUS_ACCEPTED,
          }),
          order: GetPicturesRequest.Order.LIKES,
          page,
          paginator: true,
        }),
      ),
    ),
    catchError((err: unknown) => {
      this.toastService.handleError(err);
      return of(null);
    }),
  );
}
