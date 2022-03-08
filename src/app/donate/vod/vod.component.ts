import { Component, OnInit, OnDestroy } from '@angular/core';
import { APIItem, ItemService } from '../../services/item';
import { ActivatedRoute } from '@angular/router';
import { Subscription, combineLatest, of } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { PageEnvService } from '../../services/page-env.service';
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  map
} from 'rxjs/operators';
import { APIDonateCarOfDayDate, DonateService } from '../donate.service';
import {APIUser} from '../../../../generated/spec.pb';

@Component({
  selector: 'app-donate-vod',
  templateUrl: './vod.component.html'
})
export class DonateVodComponent implements OnInit, OnDestroy {
  private querySub: Subscription;
  public formParams: {
    name: string;
    value: string;
  }[];
  public selectedDate: string;
  public selectedItem: APIItem;
  public anonymous: boolean;
  public user: APIUser;
  public userID: string;
  public sum: number;
  public dates: APIDonateCarOfDayDate[];
  public paymentType = 'AC';

  constructor(
    private itemService: ItemService,
    private route: ActivatedRoute,
    public auth: AuthService,
    private donateService: DonateService,
    private pageEnv: PageEnvService
  ) {
    setTimeout(
      () =>
        this.pageEnv.set({
          layout: {
            needRight: true
          },
          nameTranslated: $localize `Donate`,
          pageId: 196
        }),
      0
    );
  }

  ngOnInit(): void {
    this.querySub = combineLatest([
      this.route.queryParamMap.pipe(
        map(params => ({ anonymous: params.get('anonymous'), date: params.get('date') })),
        distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
        debounceTime(30)
      ),
      this.donateService.getVOD(),
      this.route.queryParamMap.pipe(
        map(params => parseInt(params.get('item_id'), 10) ),
        distinctUntilChanged(),
        debounceTime(30),
        switchMap(itemID => {
          if (!itemID) {
            return of(null);
          }

          return this.itemService.getItem(itemID, {
            fields: 'name_html,item_of_day_pictures'
          });
        })
      ),
      this.auth.getUser()
    ]).subscribe(([params, vod, item, user]) => {
      this.sum = vod.sum;
      this.dates = vod.dates;
      this.selectedDate = params.date;
      this.selectedItem = item;
      this.user = user;
      this.userID = user ? user.id : '';
      this.anonymous = this.userID ? !!params.anonymous : true;

      if (!this.selectedItem || !this.selectedDate) {
        this.formParams = null;
        return;
      }

      const label =
        'vod/' +
        this.selectedDate +
        '/' +
        this.selectedItem.id +
        '/' +
        (this.anonymous ? 0 : this.userID);

      this.formParams = [
        { name: 'receiver', value: '41001161017513' },
        { name: 'sum', value: this.sum.toString() },
        { name: 'need-email', value: 'false' },
        { name: 'need-fio', value: 'false' },
        { name: 'need-phone', value: 'false' },
        { name: 'need-address', value: 'false' },
        { name: 'formcomment', value: $localize `WheelsAge.org: vehicle of the day` },
        { name: 'short-dest', value: $localize `WheelsAge.org: vehicle of the day` },
        { name: 'label', value: label },
        { name: 'quickpay-form', value: 'donate' },
        { name: 'targets', value: $localize `Order ${label}` },
        {
          name: 'successURL',
          value: 'https://' + window.location.host + '/donate/vod/success'
        }
      ];
    });
  }

  submit(e) {
    if (e.defaultPrevented) {
      e.target.submit();
    }
  }

  ngOnDestroy(): void {
    this.querySub.unsubscribe();
  }
}
