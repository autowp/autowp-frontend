import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {APIIP, APIUser, DeleteSimilarRequest, ItemFields, ItemRequest, ItemType, PictureIDRequest} from '@grpc/spec.pb';
import {APIItem} from '@grpc/spec.pb';
import {ItemsClient, PicturesClient} from '@grpc/spec.pbsc';
import {GrpcStatusEvent} from '@ngx-grpc/common';
import {APIService} from '@services/api.service';
import {IpService} from '@services/ip';
import {LanguageService} from '@services/language';
import {PageEnvService} from '@services/page-env.service';
import {APIPicture, PictureService} from '@services/picture';
import {APIPictureItem, PictureItemService} from '@services/picture-item';
import {UserService} from '@services/user';
import {BehaviorSubject, EMPTY, Observable, combineLatest, of, throwError} from 'rxjs';
import {catchError, distinctUntilChanged, map, shareReplay, switchMap, tap} from 'rxjs/operators';
import {sprintf} from 'sprintf-js';

interface LastItemInfo {
  hasItem: boolean;
  item: APIItem | null;
}

@Component({
  selector: 'app-moder-pictures-item',
  templateUrl: './item.component.html',
})
export class ModerPicturesItemComponent {
  protected replaceLoading = false;
  protected pictureItemLoading = false;
  protected similarLoading = false;
  protected repairLoading = false;
  protected statusLoading = false;
  protected copyrightsLoading = false;
  protected specialNameLoading = false;

  private readonly change$ = new BehaviorSubject<void>(void 0);

  protected readonly id$ = this.route.paramMap.pipe(
    map((params) => parseInt(params.get('id') || '', 10)),
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
    shareReplay(1),
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
    shareReplay(1),
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
    shareReplay(1),
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

  constructor(
    private readonly api: APIService,
    private readonly pictureItemService: PictureItemService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly pictureService: PictureService,
    private readonly pageEnv: PageEnvService,
    private readonly languageService: LanguageService,
    private readonly ipService: IpService,
    private readonly itemsClient: ItemsClient,
    private readonly userService: UserService,
    private readonly picturesClient: PicturesClient,
  ) {
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

  protected savePerspective(perspectiveID: null | number, item: APIPictureItem) {
    this.pictureItemService.setPerspective$(item.picture_id, item.item_id, item.type, perspectiveID).subscribe();
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

  protected addItem(id: number, item: APIItem, type: number) {
    this.pictureItemLoading = true;
    this.pictureItemService.create$(id, item.id, type, {}).subscribe({
      error: () => {
        this.pictureItemLoading = false;
      },
      next: () => {
        localStorage.setItem('last_item', item.id.toString());
        this.change$.next();
        this.pictureItemLoading = false;
      },
    });
  }

  protected moveItem(id: number, type: number, srcItemId: number, dstItemId: string) {
    this.pictureItemLoading = true;
    this.pictureItemService.changeItem$(id, type, srcItemId, dstItemId).subscribe({
      error: () => {
        this.pictureItemLoading = false;
      },
      next: () => {
        localStorage.setItem('last_item', dstItemId.toString());
        this.change$.next();
        this.pictureItemLoading = false;
      },
    });
  }

  protected saveSpecialName(picture: APIPicture) {
    this.specialNameLoading = true;
    this.api
      .request<void>('PUT', 'picture/' + picture.id, {
        body: {
          special_name: picture.special_name,
          taken_day: picture.taken_day,
          taken_month: picture.taken_month,
          taken_year: picture.taken_year,
        },
      })
      .subscribe({
        error: () => {
          this.specialNameLoading = false;
        },
        next: () => {
          this.specialNameLoading = false;
        },
      });
  }

  protected saveCopyrights(picture: APIPicture) {
    this.copyrightsLoading = true;

    this.api
      .request<void>('PUT', 'picture/' + picture.id, {
        body: {
          copyrights: picture.copyrights,
        },
      })
      .subscribe({
        error: () => {
          this.copyrightsLoading = false;
        },
        next: () => {
          this.copyrightsLoading = false;
        },
      });
  }

  private setPictureStatus(id: number, status: string) {
    this.statusLoading = true;
    this.pictureService.setPictureStatus$(id, status).subscribe({
      error: () => {
        this.statusLoading = false;
      },
      next: () => {
        this.change$.next();
        this.statusLoading = false;
      },
    });
  }

  protected unacceptPicture(id: number) {
    this.setPictureStatus(id, 'inbox');
  }

  protected acceptPicture(id: number) {
    this.setPictureStatus(id, 'accepted');
  }

  protected deletePicture(id: number) {
    this.setPictureStatus(id, 'removing');
  }

  protected restorePicture(id: number) {
    this.setPictureStatus(id, 'inbox');
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

  protected repairPicture(id: number) {
    this.repairLoading = true;
    this.api.request<void>('PUT', 'picture/' + id + '/repair', {}).subscribe({
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
    this.api.request<void>('PUT', 'picture/' + id + '/correct-file-names', {}).subscribe({
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
    this.pictureItemService.remove$(item.picture_id, item.item_id, item.type).subscribe({
      error: () => {
        this.pictureItemLoading = false;
      },
      next: () => {
        this.change$.next();
        this.pictureItemLoading = false;
      },
    });
  }

  protected cancelReplace(id: number) {
    this.replaceLoading = true;

    this.api
      .request<void>('PUT', 'picture/' + id, {
        body: {
          replace_picture_id: '',
        },
      })
      .subscribe({
        error: () => {
          this.replaceLoading = false;
        },
        next: () => {
          this.change$.next();
          this.replaceLoading = false;
        },
      });
  }

  protected acceptReplace(id: number) {
    this.replaceLoading = true;
    this.api.request<void>('PUT', 'picture/' + id + '/accept-replace', {body: {}}).subscribe({
      error: () => {
        this.replaceLoading = false;
      },
      next: () => {
        this.change$.next();
        this.replaceLoading = false;
      },
    });
  }

  protected removeFromBlacklist(ip: string) {
    this.api.request<void>('DELETE', 'traffic/blacklist/' + ip).subscribe(() => {
      this.change$.next();
    });
  }

  protected addToBlacklist(ip: string) {
    this.api
      .request<void>('POST', 'traffic/blacklist', {
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
