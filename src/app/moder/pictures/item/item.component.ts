import {Component, OnDestroy, OnInit} from '@angular/core';
import {PictureItemService, APIPictureItem} from '@services/picture-item';
import {ItemService, APIItem} from '@services/item';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription, BehaviorSubject, of} from 'rxjs';
import {PictureService, APIPicture} from '@services/picture';
import {PageEnvService} from '@services/page-env.service';
import {distinctUntilChanged, debounceTime, switchMap, tap, map, catchError} from 'rxjs/operators';
import {LanguageService} from '@services/language';
import {sprintf} from 'sprintf-js';
import {APIService} from '@services/api.service';
import {IpService} from '@services/ip';
import {APIIP} from '@grpc/spec.pb';

@Component({
  selector: 'app-moder-pictures-item',
  templateUrl: './item.component.html',
})
export class ModerPicturesItemComponent implements OnInit, OnDestroy {
  private id: number;
  private routeSub: Subscription;
  protected picture: APIPicture = null;
  protected replaceLoading = false;
  protected pictureItemLoading = false;
  protected similarLoading = false;
  protected repairLoading = false;
  protected statusLoading = false;
  protected copyrightsLoading = false;
  protected specialNameLoading = false;
  protected lastItem: APIItem = null;
  protected readonly banPeriods = [
    {value: 1, name: $localize`hour`},
    {value: 2, name: $localize`2 hours`},
    {value: 4, name: $localize`4 hours`},
    {value: 8, name: $localize`8 hours`},
    {value: 16, name: $localize`16 hours`},
    {value: 24, name: $localize`day`},
    {value: 48, name: $localize`2 days`},
  ];
  protected banPeriod = 1;
  protected banReason: string | null = null;
  private readonly change$ = new BehaviorSubject<null>(null);
  private lastItemSub: Subscription;
  protected monthOptions: any[];
  protected dayOptions: any[];
  protected ip: APIIP;

  constructor(
    private readonly api: APIService,
    private readonly pictureItemService: PictureItemService,
    private readonly itemService: ItemService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly pictureService: PictureService,
    private readonly pageEnv: PageEnvService,
    private readonly languageService: LanguageService,
    private readonly ipService: IpService
  ) {
    this.monthOptions = [
      {
        value: null,
        name: '--',
      },
    ];

    const date = new Date(Date.UTC(2000, 1, 1, 0, 0, 0, 0));
    for (let i = 0; i < 12; i++) {
      date.setMonth(i);
      const language = this.languageService.language;
      if (language) {
        const month = date.toLocaleString(language, {month: 'long'});
        this.monthOptions.push({
          value: i + 1,
          name: sprintf('%02d - %s', i + 1, month),
        });
      }
    }

    this.dayOptions = [
      {
        value: null,
        name: '--',
      },
    ];
    for (let i = 1; i <= 31; i++) {
      this.dayOptions.push({
        value: i,
        name: sprintf('%02d', i),
      });
    }
  }

  protected savePerspective(perspectiveID: number | null, item: APIPictureItem) {
    this.pictureItemService.setPerspective$(item.picture_id, item.item_id, item.type, perspectiveID).subscribe();
  }

  ngOnInit(): void {
    this.routeSub = this.route.paramMap
      .pipe(
        map((params) => parseInt(params.get('id'), 10)),
        distinctUntilChanged(),
        debounceTime(30)
      )
      .pipe(
        tap((id) =>
          this.pageEnv.set({
            layout: {isAdminPage: true},
            title: $localize`Picture №${id}`,
            pageId: 72,
          })
        ),
        switchMap((id) =>
          this.change$.pipe(
            switchMap(() =>
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
                  'change_status_user',
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
              })
            ),
            switchMap((picture) => {
              if (!picture.ip) {
                return of({picture, ip: null as APIIP});
              }
              return this.ipService.getIp$(picture.ip, ['blacklist', 'rights']).pipe(
                catchError(() => of(null as APIIP)),
                map((ip) => ({picture, ip}))
              );
            })
          )
        )
      )
      .subscribe(
        ({picture, ip}) => {
          this.picture = picture;
          this.ip = ip;
          this.id = this.picture.id;

          /*if (callback) {
            callback();
          }*/
        },
        () => {
          this.router.navigate(['/error-404'], {
            skipLocationChange: true,
          });
        }
      );

    if (localStorage) {
      const lastItemId = parseInt(localStorage.getItem('last_item'), 10);

      if (lastItemId) {
        this.lastItemSub = this.itemService
          .getItems$({
            id: lastItemId,
            fields: 'name_html',
            limit: 1,
          })
          .subscribe((response) => {
            this.lastItem = response.items.length ? response.items[0] : null;
          });
      }
    }
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
    if (this.lastItemSub) {
      this.lastItemSub.unsubscribe();
      this.lastItemSub = null;
    }
  }

  protected pictureVoted() {
    this.change$.next(null);
  }

  protected hasItem(itemId: number): boolean {
    let found = false;
    for (const item of this.picture.items) {
      if (item.item_id === itemId) {
        found = true;
      }
    }

    return found;
  }

  protected addItem(item: APIItem, type: number) {
    this.pictureItemLoading = true;
    this.pictureItemService.create$(this.id, item.id, type, {}).subscribe(
      () => {
        localStorage.setItem('last_item', item.id.toString());
        this.change$.next(null);
        this.pictureItemLoading = false;
      },
      () => {
        this.pictureItemLoading = false;
      }
    );
  }

  protected moveItem(type: number, srcItemId: number, dstItemId: number) {
    this.pictureItemLoading = true;
    this.pictureItemService.changeItem$(this.id, type, srcItemId, dstItemId).subscribe(
      () => {
        localStorage.setItem('last_item', dstItemId.toString());
        this.change$.next(null);
        this.pictureItemLoading = false;
      },
      () => {
        this.pictureItemLoading = false;
      }
    );
  }

  protected saveSpecialName() {
    this.specialNameLoading = true;
    this.api
      .request<void>('PUT', 'picture/' + this.id, {
        body: {
          special_name: this.picture.special_name,
          taken_year: this.picture.taken_year,
          taken_month: this.picture.taken_month,
          taken_day: this.picture.taken_day,
        },
      })
      .subscribe(
        () => {
          this.specialNameLoading = false;
        },
        () => {
          this.specialNameLoading = false;
        }
      );
  }

  protected saveCopyrights() {
    this.copyrightsLoading = true;

    this.api
      .request<void>('PUT', 'picture/' + this.id, {
        body: {
          copyrights: this.picture.copyrights,
        },
      })
      .subscribe(
        () => {
          this.copyrightsLoading = false;
        },
        () => {
          this.copyrightsLoading = false;
        }
      );
  }

  private setPictureStatus(status: string) {
    this.statusLoading = true;
    this.pictureService.setPictureStatus$(this.id, status).subscribe(
      () => {
        this.change$.next(null);
        this.statusLoading = false;
      },
      () => {
        this.statusLoading = false;
      }
    );
  }

  protected unacceptPicture() {
    this.setPictureStatus('inbox');
  }

  protected acceptPicture() {
    this.setPictureStatus('accepted');
  }

  protected deletePicture() {
    this.setPictureStatus('removing');
  }

  protected restorePicture() {
    this.setPictureStatus('inbox');
  }

  protected normalizePicture() {
    this.repairLoading = true;
    this.api.request<void>('PUT', 'picture/' + this.id + '/normalize', {}).subscribe(
      () => {
        this.change$.next(null);
        this.repairLoading = false;
      },
      () => {
        this.repairLoading = false;
      }
    );
  }

  protected flopPicture() {
    this.repairLoading = true;
    this.api.request<void>('PUT', 'picture/' + this.id + '/flop', {}).subscribe(
      () => {
        this.change$.next(null);
        this.repairLoading = false;
      },
      () => {
        this.repairLoading = false;
      }
    );
  }

  protected repairPicture() {
    this.repairLoading = true;
    this.api.request<void>('PUT', 'picture/' + this.id + '/repair', {}).subscribe(
      () => {
        this.change$.next(null);
        this.repairLoading = false;
      },
      () => {
        this.repairLoading = false;
      }
    );
  }

  protected correctFileNames() {
    this.repairLoading = true;
    this.api.request<void>('PUT', 'picture/' + this.id + '/correct-file-names', {}).subscribe(
      () => {
        this.change$.next(null);
        this.repairLoading = false;
      },
      () => {
        this.repairLoading = false;
      }
    );
  }

  protected cancelSimilar() {
    this.similarLoading = true;
    this.api.request<void>('DELETE', 'picture/' + this.id + '/similar/' + this.picture.similar.picture_id).subscribe(
      () => {
        this.change$.next(null);
        this.similarLoading = false;
      },
      () => {
        this.similarLoading = false;
      }
    );
  }

  protected deletePictureItem(item: APIPictureItem) {
    this.pictureItemLoading = true;
    this.pictureItemService.remove$(item.picture_id, item.item_id, item.type).subscribe(
      () => {
        this.change$.next(null);
        this.pictureItemLoading = false;
      },
      () => {
        this.pictureItemLoading = false;
      }
    );
  }

  protected cancelReplace() {
    this.replaceLoading = true;

    this.api
      .request<void>('PUT', 'picture/' + this.id, {
        body: {
          replace_picture_id: '',
        },
      })
      .subscribe(
        () => {
          this.change$.next(null);
          this.replaceLoading = false;
        },
        () => {
          this.replaceLoading = false;
        }
      );
  }

  protected acceptReplace() {
    this.replaceLoading = true;
    this.api.request<void>('PUT', 'picture/' + this.id + '/accept-replace', {body: {}}).subscribe(
      () => {
        this.change$.next(null);
        this.replaceLoading = false;
      },
      () => {
        this.replaceLoading = false;
      }
    );
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
}
