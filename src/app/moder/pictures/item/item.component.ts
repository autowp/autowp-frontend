import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {APIIP, ItemFields, ItemRequest, ItemType} from '@grpc/spec.pb';
import {APIItem} from '@grpc/spec.pb';
import {ItemsClient} from '@grpc/spec.pbsc';
import {APIService} from '@services/api.service';
import {IpService} from '@services/ip';
import {LanguageService} from '@services/language';
import {PageEnvService} from '@services/page-env.service';
import {APIPicture, PictureService} from '@services/picture';
import {APIPictureItem, PictureItemService} from '@services/picture-item';
import {BehaviorSubject, of, Observable, throwError, EMPTY, combineLatest} from 'rxjs';
import {catchError, distinctUntilChanged, map, shareReplay, switchMap, tap} from 'rxjs/operators';
import {sprintf} from 'sprintf-js';
import {GrpcStatusEvent} from '@ngx-grpc/common';

interface LastItemInfo {
  item: APIItem;
  hasItem: boolean;
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

  private readonly change$ = new BehaviorSubject<null>(null);

  protected readonly id$ = this.route.paramMap
    .pipe(
      map((params) => parseInt(params.get('id'), 10)),
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

  protected readonly picture$ = combineLatest([this.id$, this.change$])
    .pipe(
      switchMap(([id]) =>
        this.pictureService.getPicture$(id, {
          fields: [
            'owner', 'thumb', 'add_date', 'exif', 'image', 'items.item.name_html', 'items.item.brands.name_html',
            'items.area', 'special_name', 'copyrights', 'change_status_user', 'rights', 'moder_votes', 'moder_voted',
            'is_last', 'views', 'accepted_count', 'similar.picture.thumb', 'replaceable', 'siblings.name_text', 'point',
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

  protected readonly ip$ = this.picture$.pipe(
    switchMap((picture) => {
      if (!picture.ip) {
        return of(null as APIIP);
      }
      return this.ipService.getIp$(picture.ip, ['blacklist', 'rights']).pipe(
        catchError(() => of(null as APIIP)),
      );
    })
  );

  protected readonly lastItem$: Observable<LastItemInfo> = this.picture$.pipe(
    switchMap((picture) => {
      if (!localStorage) {
        return of({item: null, hasItem: false});
      }

      const lastItemId = localStorage.getItem('last_item');
      if (!lastItemId) {
        return of({item: null, hasItem: false});
      }

      return this.itemsClient
        .item(
          new ItemRequest({
            fields: new ItemFields({nameHtml: true}),
            id: lastItemId,
            language: this.languageService.language
          }),
        ).pipe(
          catchError((error) => {
            if (error instanceof GrpcStatusEvent && error.statusCode == 5) {
              // NOT_FOUND
              return of(null);
            }
            console.error(error)
            throwError(() => error)
          }),
          map((item) => ({item, hasItem: this.hasItem(picture.items, item.id)}))
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
    value: number;
  }[];
  protected dayOptions: {
    name: string;
    value: number;
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
    this.change$.next(null);
  }

  private hasItem(items, itemId: string): boolean {
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
      next: () => {
        localStorage.setItem('last_item', item.id.toString());
        this.change$.next(null);
        this.pictureItemLoading = false;
      },
      error: () => {
        this.pictureItemLoading = false;
      },
    });
  }

  protected moveItem(id: number, type: number, srcItemId: number, dstItemId: string) {
    this.pictureItemLoading = true;
    this.pictureItemService.changeItem$(id, type, srcItemId, dstItemId).subscribe({
      next: () => {
        localStorage.setItem('last_item', dstItemId.toString());
        this.change$.next(null);
        this.pictureItemLoading = false;
      },
      error: () => {
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
        next: () => {
          this.specialNameLoading = false;
        },
        error: () => {
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
        next: () => {
          this.copyrightsLoading = false;
        },
        error: () => {
          this.copyrightsLoading = false;
        },
      });
  }

  private setPictureStatus(id: number, status: string) {
    this.statusLoading = true;
    this.pictureService.setPictureStatus$(id, status).subscribe({
      next: () => {
        this.change$.next(null);
        this.statusLoading = false;
      },
      error: () => {
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

  protected normalizePicture(id: number) {
    this.repairLoading = true;
    this.api.request<void>('PUT', 'picture/' + id + '/normalize', {}).subscribe({
      next: () => {
        this.change$.next(null);
        this.repairLoading = false;
      },
      error: () => {
        this.repairLoading = false;
      },
    });
  }

  protected flopPicture(id: number) {
    this.repairLoading = true;
    this.api.request<void>('PUT', 'picture/' + id + '/flop', {}).subscribe({
      next: () => {
        this.change$.next(null);
        this.repairLoading = false;
      },
      error: () => {
        this.repairLoading = false;
      },
    });
  }

  protected repairPicture(id: number) {
    this.repairLoading = true;
    this.api.request<void>('PUT', 'picture/' + id + '/repair', {}).subscribe({
      next: () => {
        this.change$.next(null);
        this.repairLoading = false;
      },
      error: () => {
        this.repairLoading = false;
      },
    });
  }

  protected correctFileNames(id: number) {
    this.repairLoading = true;
    this.api.request<void>('PUT', 'picture/' + id + '/correct-file-names', {}).subscribe({
      next: () => {
        this.change$.next(null);
        this.repairLoading = false;
      },
      error: () => {
        this.repairLoading = false;
      },
    });
  }

  protected cancelSimilar(picture: APIPicture) {
    this.similarLoading = true;
    this.api.request<void>('DELETE', 'picture/' + picture.id + '/similar/' + picture.similar.picture_id).subscribe({
      next: () => {
        this.change$.next(null);
        this.similarLoading = false;
      },
      error: () => {
        this.similarLoading = false;
      },
    });
  }

  protected deletePictureItem(item: APIPictureItem) {
    this.pictureItemLoading = true;
    this.pictureItemService.remove$(item.picture_id, item.item_id, item.type).subscribe({
      next: () => {
        this.change$.next(null);
        this.pictureItemLoading = false;
      },
      error: () => {
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
        next: () => {
          this.change$.next(null);
          this.replaceLoading = false;
        },
        error: () => {
          this.replaceLoading = false;
        },
      });
  }

  protected acceptReplace(id: number) {
    this.replaceLoading = true;
    this.api.request<void>('PUT', 'picture/' + id + '/accept-replace', {body: {}}).subscribe({
      next: () => {
        this.change$.next(null);
        this.replaceLoading = false;
      },
      error: () => {
        this.replaceLoading = false;
      },
    });
  }

  protected removeFromBlacklist(ip: string) {
    this.api.request<void>('DELETE', 'traffic/blacklist/' + ip).subscribe(() => {
      this.change$.next(null);
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
        this.change$.next(null);
      });
  }

  protected readonly ItemType = ItemType;
}
