import {Component, Inject, LOCALE_ID, OnInit} from '@angular/core';
import { APIItem, ItemService } from '../../services/item';
import { ActivatedRoute } from '@angular/router';
import {combineLatest, Observable, of} from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { PageEnvService } from '../../services/page-env.service';
import {debounceTime, distinctUntilChanged, switchMap, map, shareReplay} from 'rxjs/operators';
import { DonateService } from '../donate.service';
import {APIUser} from '../../../../generated/spec.pb';
import {formatDate} from '@angular/common';

const VOD_TIMEZONE = 'UTC';

@Component({
  selector: 'app-donate-vod',
  templateUrl: './vod.component.html'
})
export class DonateVodComponent implements OnInit {
  private user$ = this.auth.getUser();

  public anonymous$ = combineLatest([
    this.route.queryParamMap.pipe(
      map(params => params.get('anonymous')),
      distinctUntilChanged(),
      debounceTime(10)
    ),
    this.user$,
  ]).pipe(
    map(([anonymous, user]) => user ? !!anonymous : true),
    shareReplay(1)
  );

  public date$ = this.route.queryParamMap.pipe(
    map(params => params.get('date')),
    map(date => date ? date : null),
    distinctUntilChanged(),
    debounceTime(10)
  );

  private itemID$ = this.route.queryParamMap.pipe(
    map(params => parseInt(params.get('item_id'), 10)),
    distinctUntilChanged(),
    debounceTime(10)
  );

  public item$ = this.itemID$.pipe(
    switchMap(itemID => {
      if (!itemID) {
        return of(null as APIItem);
      }

      return this.itemService.getItem(itemID, {
        fields: 'name_html,item_of_day_pictures'
      });
    }),
    shareReplay(1)
  );

  public itemOfDayUser$: Observable<APIUser|null> = this.anonymous$.pipe(
    switchMap(anonymous => anonymous ? of(null) : this.user$)
  );

  public userID$ = this.user$.pipe(
    map(user => user ? user.id : null)
  );

  public vod$ = this.donateService.getVOD().pipe(
    shareReplay(1)
  );

  public dates$ = combineLatest([this.vod$, this.date$]).pipe(
    map(([vod, currentDate]) => vod.dates.map(d => {
      const date = d.date.toDate();
      const value = formatDate(date, 'yyyy-MM-dd', this.locale, VOD_TIMEZONE);
      return {
        name: formatDate(date, 'longDate', this.locale, VOD_TIMEZONE),
        free: d.free,
        value,
        active: value === currentDate
      };
    }))
  );

  public formParams$ = combineLatest([
    this.anonymous$,
    this.date$,
    this.vod$,
    this.item$,
    this.userID$
  ]).pipe(
    map(([anonymous, date, vod, item, userID]) => {
      if (!item || !date) {
        return [];
      }

      const label = 'vod/' + date + '/' + item.id + '/' + (anonymous ? 0 : userID);

      return [
        { name: 'receiver', value: '41001161017513' },
        { name: 'sum', value: vod.sum.toString() },
        { name: 'need-email', value: 'false' },
        { name: 'need-fio', value: 'false' },
        { name: 'need-phone', value: 'false' },
        { name: 'need-address', value: 'false' },
        { name: 'formcomment', value: $localize `WheelsAge.org: vehicle of the day` },
        { name: 'short-dest', value: $localize `WheelsAge.org: vehicle of the day` },
        { name: 'label', value: label },
        { name: 'quickpay-form', value: 'donate' },
        { name: 'targets', value: $localize `Order ${label}` },
        { name: 'successURL', value: 'https://' + window.location.host + '/donate/vod/success' }
      ];
    })
  );

  constructor(
    private itemService: ItemService,
    private route: ActivatedRoute,
    public auth: AuthService,
    private donateService: DonateService,
    private pageEnv: PageEnvService,
    @Inject(LOCALE_ID) public locale: string
  ) {
  }

  ngOnInit(): void {
    setTimeout(
      () =>
        this.pageEnv.set({pageId: 196}),
      0
    );
  }

  submit(e) {
    if (e.defaultPrevented) {
      e.target.submit();
    }
  }
}
