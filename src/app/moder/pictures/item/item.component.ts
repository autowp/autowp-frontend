import {AsyncPipe, DatePipe} from '@angular/common';
import {Component, inject} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {Date as grpcDate} from '@grpc/google/type/date.pb';
import {
  APIIP,
  APIItem,
  APIUser,
  CreatePictureItemRequest,
  DeletePictureItemRequest,
  DeleteSimilarRequest,
  ItemFields,
  ItemRequest,
  ItemType,
  PictureIDRequest,
  PictureStatus,
  SetPictureCopyrightsRequest,
  SetPictureItemItemIDRequest,
  SetPictureItemPerspectiveRequest,
  SetPictureStatusRequest,
  UpdatePictureRequest,
} from '@grpc/spec.pb';
import {ItemsClient, PicturesClient} from '@grpc/spec.pbsc';
import {NgbDropdown, NgbDropdownMenu, NgbDropdownToggle, NgbProgressbar, NgbTooltip} from '@ng-bootstrap/ng-bootstrap';
import {GrpcStatusEvent} from '@ngx-grpc/common';
import {APIService} from '@services/api.service';
import {IpService} from '@services/ip';
import {LanguageService} from '@services/language';
import {PageEnvService} from '@services/page-env.service';
import {APIPicture, PictureService} from '@services/picture';
import {APIPictureItem} from '@services/picture-item';
import {UserService} from '@services/user';
import {MarkdownComponent} from '@utils/markdown/markdown.component';
import {TimeAgoPipe} from '@utils/time-ago.pipe';
import {NgDatePipesModule, NgMathPipesModule} from 'ngx-pipes';
import {BehaviorSubject, combineLatest, EMPTY, Observable, of, throwError} from 'rxjs';
import {catchError, distinctUntilChanged, map, shareReplay, switchMap, tap} from 'rxjs/operators';
import {sprintf} from 'sprintf-js';

import {MarkdownEditComponent} from '../../../markdown-edit/markdown-edit/markdown-edit.component';
import {PictureModerVoteComponent} from '../../../picture-moder-vote/picture-moder-vote/picture-moder-vote.component';
import {ToastsService} from '../../../toasts/toasts.service';
import {UserComponent} from '../../../user/user/user.component';
import {ModerPicturesPerspectivePickerComponent} from '../perspective-picker/perspective-picker.component';

interface LastItemInfo {
  hasItem: boolean;
  item: APIItem | null;
}

@Component({
  imports: [
    RouterLink,
    NgbTooltip,
    ModerPicturesPerspectivePickerComponent,
    NgbDropdown,
    NgbDropdownToggle,
    NgbDropdownMenu,
    NgbProgressbar,
    FormsModule,
    MarkdownComponent,
    MarkdownEditComponent,
    UserComponent,
    PictureModerVoteComponent,
    AsyncPipe,
    DatePipe,
    NgMathPipesModule,
    NgDatePipesModule,
    TimeAgoPipe,
  ],
  selector: 'app-moder-pictures-item',
  templateUrl: './item.component.html',
})
export class ModerPicturesItemComponent {
  private readonly api = inject(APIService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly pictureService = inject(PictureService);
  private readonly pageEnv = inject(PageEnvService);
  private readonly languageService = inject(LanguageService);
  private readonly ipService = inject(IpService);
  private readonly itemsClient = inject(ItemsClient);
  private readonly userService = inject(UserService);
  private readonly picturesClient = inject(PicturesClient);
  private readonly toastService = inject(ToastsService);

  protected replaceLoading = false;
  protected pictureItemLoading = false;
  protected similarLoading = false;
  protected repairLoading = false;
  protected statusLoading = false;
  protected copyrightsLoading = false;
  protected specialNameLoading = false;

  private readonly change$ = new BehaviorSubject<void>(void 0);

  protected readonly id$ = this.route.paramMap.pipe(
    map((params) => parseInt(params.get('id') ?? '', 10)),
    distinctUntilChanged(),
    tap((id) => {
      setTimeout(() => {
        this.pageEnv.set({
          layout: {isAdminPage: true},
          pageId: 72,
          title: $localize`Picture №${id}`,
        });
      });
    }),
    shareReplay({bufferSize: 1, refCount: false}),
  );

  protected readonly picture$ = combineLatest([this.id$, this.change$]).pipe(
    switchMap(([id]) =>
      this.pictureService.getPicture$(id, {
        fields: [
          'owner',
          'thumb',
          'add_date',
          'exif',
          'image',
          'items.item.name_html',
          'items.item.brands.name_html',
          'items.area',
          'special_name',
          'copyrights',
          'rights',
          'moder_votes',
          'moder_voted',
          'is_last',
          'views',
          'accepted_count',
          'similar.picture.thumb',
          'replaceable',
          'siblings.name_text',
          'point',
          'taken',
        ].join(','),
      }),
    ),
    catchError(() => {
      this.router.navigate(['/error-404'], {
        skipLocationChange: true,
      });
      return EMPTY;
    }),
    shareReplay({bufferSize: 1, refCount: false}),
  );

  protected readonly changeStatusUser$: Observable<APIUser | null> = this.picture$.pipe(
    switchMap((picture) =>
      picture.change_status_user_id ? this.userService.getUser$(picture.change_status_user_id) : of(null),
    ),
  );

  protected readonly owner$: Observable<APIUser | null> = this.picture$.pipe(
    switchMap((picture) => (picture.owner_id ? this.userService.getUser$(picture.owner_id) : of(null))),
  );

  protected readonly ip$: Observable<APIIP | null> = this.picture$.pipe(
    switchMap((picture) => {
      if (!picture.ip) {
        return of(null);
      }
      return this.ipService.getIp$(picture.ip, ['blacklist', 'rights']).pipe(catchError(() => of(null)));
    }),
  );

  protected readonly lastItem$: Observable<LastItemInfo> = this.picture$.pipe(
    switchMap((picture) => {
      if (!localStorage) {
        return of({hasItem: false, item: null});
      }

      const lastItemId = localStorage.getItem('last_item');
      if (!lastItemId) {
        return of({hasItem: false, item: null});
      }

      return this.itemsClient
        .item(
          new ItemRequest({
            fields: new ItemFields({nameHtml: true}),
            id: lastItemId,
            language: this.languageService.language,
          }),
        )
        .pipe(
          catchError((error: unknown) => {
            if (error instanceof GrpcStatusEvent && error.statusCode == 5) {
              // NOT_FOUND
              return of(null);
            }
            console.error(error);
            return throwError(() => error);
          }),
          map((item) => ({hasItem: item ? this.hasItem(picture.items, item.id) : false, item})),
        );
    }),
    shareReplay({bufferSize: 1, refCount: false}),
  );

  protected readonly banPeriods = [
    {name: $localize`hour`, value: 1},
    {name: $localize`2 hours`, value: 2},
    {name: $localize`4 hours`, value: 4},
    {name: $localize`8 hours`, value: 8},
    {name: $localize`16 hours`, value: 16},
    {name: $localize`day`, value: 24},
    {name: $localize`2 days`, value: 48},
  ];
  protected banPeriod = 1;
  protected banReason: null | string = null;

  protected monthOptions: {
    name: string;
    value: null | number;
  }[];
  protected dayOptions: {
    name: string;
    value: null | number;
  }[];

  constructor() {
    this.monthOptions = [
      {
        name: '--',
        value: null,
      },
    ];

    const date = new Date(Date.UTC(2000, 1, 1, 0, 0, 0, 0));
    for (let i = 0; i < 12; i++) {
      date.setMonth(i);
      const language = this.languageService.language;
      if (language) {
        const month = date.toLocaleString(language, {month: 'long'});
        this.monthOptions.push({
          name: sprintf('%02d - %s', i + 1, month),
          value: i + 1,
        });
      }
    }

    this.dayOptions = [
      {
        name: '--',
        value: null,
      },
    ];
    for (let i = 1; i <= 31; i++) {
      this.dayOptions.push({
        name: sprintf('%02d', i),
        value: i,
      });
    }
  }

  protected savePerspective(perspectiveId: null | number, item: APIPictureItem) {
    this.picturesClient
      .setPictureItemPerspective(
        new SetPictureItemPerspectiveRequest({
          itemId: '' + item.item_id,
          perspectiveId: perspectiveId ?? undefined,
          pictureId: '' + item.picture_id,
          type: item.type,
        }),
      )
      .pipe(
        catchError((error: unknown) => {
          this.toastService.handleError(error);
          return EMPTY;
        }),
      )
      .subscribe();
  }

  protected pictureVoted() {
    this.change$.next();
  }

  private hasItem(items: APIPictureItem[], itemId: string): boolean {
    let found = false;
    for (const item of items) {
      if (item.item_id === +itemId) {
        found = true;
      }
    }

    return found;
  }

  protected addItem(id: string, item: APIItem, type: number) {
    this.pictureItemLoading = true;
    this.picturesClient
      .createPictureItem(
        new CreatePictureItemRequest({
          itemId: item.id,
          pictureId: id,
          type: type,
        }),
      )
      .pipe(
        catchError((error: unknown) => {
          this.pictureItemLoading = false;
          this.toastService.handleError(error);
          return EMPTY;
        }),
      )
      .subscribe({
        next: () => {
          localStorage.setItem('last_item', item.id.toString());
          this.change$.next();
          this.pictureItemLoading = false;
        },
      });
  }

  protected moveItem(id: string, type: number, srcItemId: string, dstItemId: string) {
    this.pictureItemLoading = true;
    this.picturesClient
      .setPictureItemItemID(
        new SetPictureItemItemIDRequest({
          itemId: '' + srcItemId,
          newItemId: dstItemId,
          pictureId: '' + id,
          type: type,
        }),
      )
      .pipe(
        catchError((error: unknown) => {
          this.pictureItemLoading = false;
          this.toastService.handleError(error);
          return EMPTY;
        }),
      )
      .subscribe({
        next: () => {
          localStorage.setItem('last_item', dstItemId);
          this.change$.next();
          this.pictureItemLoading = false;
        },
      });
  }

  protected saveSpecialName(picture: APIPicture) {
    this.specialNameLoading = true;
    this.picturesClient
      .updatePicture(
        new UpdatePictureRequest({
          id: picture.id + '',
          name: picture.special_name,
          takenDate: new grpcDate({
            day: picture.taken_day,
            month: picture.taken_month,
            year: picture.taken_year,
          }),
        }),
      )
      .pipe(
        catchError((error: unknown) => {
          this.specialNameLoading = false;
          this.toastService.handleError(error);
          return EMPTY;
        }),
      )
      .subscribe({
        next: () => {
          this.specialNameLoading = false;
        },
      });
  }

  protected saveCopyrights(picture: APIPicture) {
    this.copyrightsLoading = true;

    this.picturesClient
      .setPictureCopyrights(
        new SetPictureCopyrightsRequest({
          copyrights: picture.copyrights,
          id: picture.id + '',
        }),
      )
      .pipe(
        catchError((error: unknown) => {
          this.copyrightsLoading = false;
          this.toastService.handleError(error);
          return EMPTY;
        }),
      )
      .subscribe({
        next: () => {
          this.copyrightsLoading = false;
        },
      });
  }

  private setPictureStatus(id: string, status: PictureStatus) {
    this.statusLoading = true;
    this.picturesClient
      .setPictureStatus(new SetPictureStatusRequest({id, status}))
      .pipe(
        catchError((err: unknown) => {
          this.toastService.handleError(err);
          return EMPTY;
        }),
      )
      .subscribe({
        error: () => {
          this.statusLoading = false;
        },
        next: () => {
          this.change$.next();
          this.statusLoading = false;
        },
      });
  }

  protected unacceptPicture(id: string) {
    this.setPictureStatus(id, PictureStatus.PICTURE_STATUS_INBOX);
  }

  protected acceptPicture(id: string) {
    this.setPictureStatus(id, PictureStatus.PICTURE_STATUS_ACCEPTED);
  }

  protected deletePicture(id: string) {
    this.setPictureStatus(id, PictureStatus.PICTURE_STATUS_REMOVING);
  }

  protected restorePicture(id: string) {
    this.setPictureStatus(id, PictureStatus.PICTURE_STATUS_INBOX);
  }

  protected normalizePicture(id: string) {
    this.repairLoading = true;
    this.picturesClient.normalize(new PictureIDRequest({id})).subscribe({
      error: () => {
        this.repairLoading = false;
      },
      next: () => {
        this.change$.next();
        this.repairLoading = false;
      },
    });
  }

  protected flopPicture(id: string) {
    this.repairLoading = true;
    this.picturesClient.flop(new PictureIDRequest({id})).subscribe({
      error: () => {
        this.repairLoading = false;
      },
      next: () => {
        this.change$.next();
        this.repairLoading = false;
      },
    });
  }

  protected repairPicture(id: string) {
    this.repairLoading = true;
    this.picturesClient.repair(new PictureIDRequest({id})).subscribe({
      error: () => {
        this.repairLoading = false;
      },
      next: () => {
        this.change$.next();
        this.repairLoading = false;
      },
    });
  }

  protected correctFileNames(id: number) {
    this.repairLoading = true;
    this.api.request$<void>('PUT', 'picture/' + id + '/correct-file-names', {}).subscribe({
      error: () => {
        this.repairLoading = false;
      },
      next: () => {
        this.change$.next();
        this.repairLoading = false;
      },
    });
  }

  protected cancelSimilar(picture: APIPicture) {
    this.similarLoading = true;
    this.picturesClient
      .deleteSimilar(new DeleteSimilarRequest({id: '' + picture.id, similarPictureId: '' + picture.similar.picture_id}))
      .subscribe({
        error: () => {
          this.similarLoading = false;
        },
        next: () => {
          this.change$.next();
          this.similarLoading = false;
        },
      });
  }

  protected deletePictureItem(item: APIPictureItem) {
    this.pictureItemLoading = true;
    this.picturesClient
      .deletePictureItem(
        new DeletePictureItemRequest({
          itemId: '' + item.item_id,
          pictureId: '' + item.picture_id,
          type: item.type,
        }),
      )
      .pipe(
        catchError((error: unknown) => {
          this.pictureItemLoading = false;
          this.toastService.handleError(error);
          return EMPTY;
        }),
      )
      .subscribe({
        next: () => {
          this.change$.next();
          this.pictureItemLoading = false;
        },
      });
  }

  protected cancelReplace(id: string) {
    this.replaceLoading = true;

    this.picturesClient
      .clearReplacePicture(new PictureIDRequest({id}))
      .pipe(
        catchError((error: unknown) => {
          this.replaceLoading = false;
          this.toastService.handleError(error);
          return EMPTY;
        }),
      )
      .subscribe({
        next: () => {
          this.change$.next();
          this.replaceLoading = false;
        },
      });
  }

  protected acceptReplace(id: string) {
    this.replaceLoading = true;
    this.picturesClient
      .acceptReplacePicture(new PictureIDRequest({id}))
      .pipe(
        catchError((error: unknown) => {
          this.replaceLoading = false;
          this.toastService.handleError(error);
          return EMPTY;
        }),
      )
      .subscribe({
        next: () => {
          this.change$.next();
          this.replaceLoading = false;
        },
      });
  }

  protected removeFromBlacklist(ip: string) {
    this.api.request$<void>('DELETE', 'traffic/blacklist/' + ip).subscribe(() => {
      this.change$.next();
    });
  }

  protected addToBlacklist(ip: string) {
    this.api
      .request$<void>('POST', 'traffic/blacklist', {
        body: {
          ip,
          period: this.banPeriod,
          reason: this.banReason,
        },
      })
      .subscribe(() => {
        this.change$.next();
      });
  }

  protected readonly ItemType = ItemType;
}
