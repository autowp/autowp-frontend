import {AsyncPipe, formatDate} from '@angular/common';
import {Component, inject, LOCALE_ID, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {APIUser} from '@grpc/spec.pb';
import {AuthService} from '@services/auth.service';
import {APIItem, ItemOfDayItem, ItemService} from '@services/item';
import {PageEnvService} from '@services/page-env.service';
import {combineLatest, EMPTY, Observable, of} from 'rxjs';
import {distinctUntilChanged, map, shareReplay, switchMap} from 'rxjs/operators';

import {usdToRub} from '../../currencies';
import {ItemOfDayComponent} from '../../item-of-day/item-of-day/item-of-day.component';
import {MarkdownComponent} from '../../utils/markdown/markdown.component';
import {DonateService} from '../donate.service';

const VOD_TIMEZONE = 'UTC';

@Component({
  imports: [RouterLink, MarkdownComponent, ItemOfDayComponent, AsyncPipe],
  selector: 'app-donate-vod',
  standalone: true,
  templateUrl: './vod.component.html',
})
export class DonateVodComponent implements OnInit {
  private readonly itemService = inject(ItemService);
  private readonly route = inject(ActivatedRoute);
  protected readonly auth = inject(AuthService);
  private readonly donateService = inject(DonateService);
  private readonly pageEnv = inject(PageEnvService);
  protected readonly locale = inject(LOCALE_ID);

  private readonly user$ = this.auth.getUser$();

  protected readonly anonymous$ = combineLatest([
    this.route.queryParamMap.pipe(
      map((params) => params.get('anonymous')),
      distinctUntilChanged(),
    ),
    this.user$,
  ]).pipe(
    map(([anonymous, user]) => (user ? !!anonymous : true)),
    shareReplay({bufferSize: 1, refCount: false}),
  );

  protected readonly date$ = this.route.queryParamMap.pipe(
    map((params) => params.get('date')),
    map((date) => (date ? date : null)),
    distinctUntilChanged(),
  );

  private readonly itemID$ = this.route.queryParamMap.pipe(
    map((params) => parseInt(params.get('item_id') || '', 10)),
    distinctUntilChanged(),
  );

  protected readonly itemSelected$ = this.itemID$.pipe(map((itemID) => !!itemID));

  protected readonly item$: Observable<APIItem | null> = this.itemID$.pipe(
    switchMap((itemID) => {
      if (!itemID) {
        return of(null);
      }

      return this.itemService.getItem$(itemID, {
        fields: 'name_html,item_of_day_pictures',
      });
    }),
    shareReplay({bufferSize: 1, refCount: false}),
  );

  protected readonly itemOfDayItem$: Observable<ItemOfDayItem> = this.item$.pipe(
    switchMap((item) => (item ? of(item) : EMPTY)),
  );

  protected readonly itemOfDayUser$: Observable<APIUser | null> = this.anonymous$.pipe(
    switchMap((anonymous) => (anonymous ? of(null) : this.user$)),
  );

  protected readonly userID$ = this.user$.pipe(map((user) => (user ? user.id : null)));

  protected readonly vod$ = this.donateService.getVOD$().pipe(shareReplay({bufferSize: 1, refCount: false}));

  protected readonly dates$ = combineLatest([this.vod$, this.date$]).pipe(
    map(([vod, currentDate]) =>
      (vod.dates ? vod.dates : []).map((d) => {
        const date = d.date?.toDate();
        const value = date ? formatDate(date, 'yyyy-MM-dd', this.locale, VOD_TIMEZONE) : null;
        return {
          active: value === currentDate,
          free: d.free,
          name: date ? formatDate(date, 'longDate', this.locale, VOD_TIMEZONE) : null,
          value,
        };
      }),
    ),
  );

  protected readonly formParams$ = combineLatest([
    this.anonymous$,
    this.date$,
    this.vod$,
    this.item$,
    this.userID$,
  ]).pipe(
    map(([anonymous, date, vod, item, userID]) => {
      if (!item || !date) {
        return [];
      }

      const label = 'vod/' + date + '/' + item.id + '/' + (anonymous ? 0 : userID);

      return [
        {name: 'receiver', value: '41001161017513'},
        {name: 'sum', value: vod.sum.toString()},
        {name: 'need-email', value: 'false'},
        {name: 'need-fio', value: 'false'},
        {name: 'need-phone', value: 'false'},
        {name: 'need-address', value: 'false'},
        {name: 'formcomment', value: $localize`WheelsAge.org: vehicle of the day`},
        {name: 'short-dest', value: $localize`WheelsAge.org: vehicle of the day`},
        {name: 'label', value: label},
        {name: 'quickpay-form', value: 'donate'},
        {name: 'targets', value: $localize`Order ${label}`},
        {name: 'successURL', value: 'https://' + window.location.host + '/donate/vod/success'},
      ];
    }),
  );

  ngOnInit(): void {
    setTimeout(() => this.pageEnv.set({pageId: 196}), 0);
  }

  protected submit(e: Event) {
    if (e.defaultPrevented && e.target && e.target instanceof HTMLFormElement) {
      e.target.submit();
    }
  }

  protected readonly usdToRub = usdToRub;
}
