import { Component, Injectable, OnInit, OnDestroy } from '@angular/core';
import { APIItem, ItemService } from '../../services/item';
import { TranslateService } from '@ngx-translate/core';
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
import { sprintf } from 'sprintf-js';
import { APIUser } from '../../services/user';
import { APIDonateCarOfDayDate, DonateService } from '../donate.service';

@Component({
  selector: 'app-donate-vod',
  templateUrl: './vod.component.html'
})
@Injectable()
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
  public userID: number;
  public sum: number;
  public dates: APIDonateCarOfDayDate[];
  public paymentType = 'AC';

  constructor(
    private translate: TranslateService,
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
          name: 'page/196/name',
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
      this.auth.getUser(),
      this.translate.get([
        'donate/vod/order-message',
        'donate/vod/order-target'
      ])
    ]).subscribe(([params, vod, item, user, translations]) => {
      this.sum = vod.sum;
      this.dates = vod.dates;
      this.selectedDate = params.date;
      this.selectedItem = item;
      this.user = user;
      this.userID = user ? user.id : 0;
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
        { name: 'formcomment', value: translations['donate/vod/order-message'] },
        { name: 'short-dest', value: translations['donate/vod/order-message'] },
        { name: 'label', value: label },
        { name: 'quickpay-form', value: 'donate' },
        { name: 'targets', value: sprintf(translations['donate/vod/order-target'], label) },
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
