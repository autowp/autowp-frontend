import {AsyncPipe, DatePipe} from '@angular/common';
import {Component, inject, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {AuthService} from '@services/auth.service';
import {LanguageService} from '@services/language';
import {PageEnvService} from '@services/page-env.service';
import {combineLatest, EMPTY, Observable, of} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, map, switchMap} from 'rxjs/operators';

import {PaginatorComponent} from '../paginator/paginator/paginator.component';
import {Thumbnail2Component} from '../thumbnail/thumbnail2/thumbnail2.component';
import {ToastsService} from '../toasts/toasts.service';
import {APIInbox, InboxService} from './inbox.service';
import Keycloak from 'keycloak-js';
import {
  GetPicturesRequest,
  GetPicturesResponse,
  ItemParentCacheListOptions,
  PictureFields,
  PictureItemOptions,
  PicturesOptions,
  PictureStatus,
} from '@grpc/spec.pb';
import {Date as GrpcDate} from '@grpc/google/type/date.pb';
import {PicturesClient} from '@grpc/spec.pbsc';

const ALL_BRANDS = 'all';

interface Inbox {
  brandCatname: string;
  inbox: APIInbox;
  pictures$: Observable<GetPicturesResponse>;
}

const parseDate = (date: string): GrpcDate => {
  const parts = date.split('-');
  const year = parts.length > 0 ? parseInt(parts[0], 10) : 0;
  const month = parts.length > 1 ? parseInt(parts[1], 10) : 0;
  const day = parts.length > 2 ? parseInt(parts[2], 10) : 0;

  return new GrpcDate({year, month, day});
};

@Component({
  imports: [RouterLink, FormsModule, Thumbnail2Component, PaginatorComponent, AsyncPipe, DatePipe],
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
})
export class InboxComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly auth = inject(AuthService);
  private readonly route = inject(ActivatedRoute);
  readonly #languageService = inject(LanguageService);
  private readonly keycloak = inject(Keycloak);
  private readonly inboxService = inject(InboxService);
  private readonly pageEnv = inject(PageEnvService);
  readonly #toastService = inject(ToastsService);
  readonly #picturesClient = inject(PicturesClient);

  protected readonly inbox$: Observable<Inbox> = this.auth.getUser$().pipe(
    switchMap((user) => {
      if (!user) {
        this.keycloak.login({
          locale: this.#languageService.language,
          redirectUri: window.location.href,
        });
        return EMPTY;
      }

      return this.route.paramMap;
    }),
    map((params) => ({
      brand: params.get('brand'),
      date: params.get('date') ?? '',
    })),
    distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
    debounceTime(30),
    switchMap((params) => {
      if (!params.brand) {
        this.router.navigate(['/inbox', ALL_BRANDS]);
        return EMPTY;
      }

      let brandID = 0;
      if (params.brand !== ALL_BRANDS) {
        brandID = params.brand ? parseInt(params.brand, 10) : 0;
      }

      this.brandID = brandID;

      return combineLatest([
        of(params.date),
        this.inboxService.get$(brandID, params.date).pipe(
          catchError((err: unknown) => {
            this.#toastService.handleError(err);
            return EMPTY;
          }),
        ),
        of(brandID),
      ]);
    }),
    switchMap(([date, inbox, brandID]) => {
      if (date !== inbox.current.date) {
        this.router.navigate(['/inbox', brandID ? brandID : 'all', inbox.current.date]);
        return EMPTY;
      }

      return of({
        brandCatname: brandID ? brandID.toString() : 'all',
        inbox: inbox,
        pictures$: this.route.queryParamMap.pipe(
          map((params) => parseInt(params.get('page') ?? '', 10)),
          distinctUntilChanged(),
          switchMap((page) =>
            this.#picturesClient.getPictures(
              new GetPicturesRequest({
                options: new PicturesOptions({
                  addDate: parseDate(inbox.current.date),
                  status: PictureStatus.PICTURE_STATUS_INBOX,
                  pictureItem: new PictureItemOptions({
                    itemParentCacheAncestor: brandID
                      ? new ItemParentCacheListOptions({parentId: '' + brandID})
                      : undefined,
                  }),
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
                limit: 24,
                language: this.#languageService.language,
                order: GetPicturesRequest.Order.ADD_DATE_DESC,
                page,
                paginator: true,
              }),
            ),
          ),
          catchError((err: unknown) => {
            this.#toastService.handleError(err);
            return EMPTY;
          }),
        ),
      });
    }),
  );

  protected brandID = 0;

  ngOnInit(): void {
    setTimeout(() => this.pageEnv.set({pageId: 76}), 0);
  }

  protected changeBrand() {
    this.router.navigate(['/inbox', this.brandID ? this.brandID : 'all']);
  }
}
