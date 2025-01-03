import {AsyncPipe} from '@angular/common';
import {Component, inject} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {APIGetItemLinksRequest, APIItem, APIItemLink, ItemFields, ItemRequest, ItemType} from '@grpc/spec.pb';
import {ItemsClient} from '@grpc/spec.pbsc';
import {ACLService, Privilege, Resource} from '@services/acl.service';
import {LanguageService} from '@services/language';
import {PageEnvService} from '@services/page-env.service';
import {APIPictureGetResponse, PictureService} from '@services/picture';
import {MarkdownComponent} from '@utils/markdown/markdown.component';
import {combineLatest, EMPTY, Observable, of} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, map, shareReplay, switchMap, tap} from 'rxjs/operators';

import {PaginatorComponent} from '../../../paginator/paginator/paginator.component';
import {ThumbnailComponent} from '../../../thumbnail/thumbnail/thumbnail.component';
import {ToastsService} from '../../../toasts/toasts.service';

@Component({
  imports: [MarkdownComponent, ThumbnailComponent, PaginatorComponent, AsyncPipe],
  selector: 'app-persons-person-info',
  templateUrl: './info.component.html',
})
export class PersonsPersonInfoComponent {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly pictureService = inject(PictureService);
  private readonly itemsClient = inject(ItemsClient);
  private readonly acl = inject(ACLService);
  private readonly pageEnv = inject(PageEnvService);
  private readonly toastService = inject(ToastsService);
  private readonly languageService = inject(LanguageService);

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
          language: this.languageService.language,
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

  protected readonly authorPictures$: Observable<APIPictureGetResponse | null> = combineLatest([
    this.itemID$,
    this.page$,
  ]).pipe(
    switchMap(([itemID, page]) =>
      this.pictureService.getPictures$({
        exact_item_id: +itemID,
        exact_item_link_type: 2,
        fields: 'owner,thumb_medium,votes,views,comments_count,name_html,name_text',
        limit: 12,
        order: 12,
        page,
        status: 'accepted',
      }),
    ),
    catchError((err: unknown) => {
      this.toastService.handleError(err);
      return of(null);
    }),
  );

  protected readonly contentPictures$: Observable<APIPictureGetResponse | null> = combineLatest([
    this.itemID$,
    this.page$,
  ]).pipe(
    switchMap(([itemID, page]) =>
      this.pictureService
        .getPictures$({
          exact_item_id: +itemID,
          exact_item_link_type: 1,
          fields: 'owner,thumb_medium,votes,views,comments_count,name_html,name_text',
          limit: 12,
          order: 12,
          page,
          status: 'accepted',
        })
        .pipe(
          catchError((err: unknown) => {
            this.toastService.handleError(err);
            return of(null);
          }),
        ),
    ),
  );
}
