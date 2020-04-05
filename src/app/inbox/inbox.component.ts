import { Component, Injectable, OnInit, OnDestroy } from '@angular/core';
import { APIPaginator } from '../services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import {Subscription, of, combineLatest, EMPTY} from 'rxjs';
import { PictureService, APIPicture } from '../services/picture';
import { InboxService } from './inbox.service';
import { APIItem } from '../services/item';
import { PageEnvService } from '../services/page-env.service';
import {
  distinctUntilChanged,
  debounceTime,
  switchMap,
  catchError,
  map
} from 'rxjs/operators';
import {ToastsService} from '../toasts/toasts.service';

const ALL_BRANDS = 'all';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html'
})
@Injectable()
export class InboxComponent implements OnInit, OnDestroy {
  private routeSub: Subscription;
  public pictures: APIPicture[] = [];
  public paginator: APIPaginator;
  public brandID = 0;
  public current: {
    date: string;
    count: number;
  };
  public prev: {
    date: string;
    count: number;
  } | null;
  public next: {
    date: string;
    count: number;
  } | null;
  public brands: APIItem[];

  constructor(
    private router: Router,
    private auth: AuthService,
    private route: ActivatedRoute,
    private pictureService: PictureService,
    private inboxService: InboxService,
    private pageEnv: PageEnvService,
    private toastService: ToastsService
  ) {}

  ngOnInit(): void {
    setTimeout(
      () =>
        this.pageEnv.set({
          layout: {
            needRight: false
          },
          name: 'page/76/name',
          pageId: 76
        }),
      0
    );

    this.routeSub = this.auth.getUser()
      .pipe(
        switchMap(user => {
          if (!user) {
            this.router.navigate(['/login']);
            return EMPTY;
          }

          return this.route.params;
        }),
        distinctUntilChanged(),
        debounceTime(30),
        switchMap(params => {
          if (!params.brand) {
            this.router.navigate(['/inbox', ALL_BRANDS]);
            return EMPTY;
          }

          let brandID = 0;
          if (params.brand !== ALL_BRANDS) {
            brandID = params.brand ? parseInt(params.brand, 10) : 0;
          }

          return combineLatest([
            this.inboxService.get(brandID, params.date),
            of(brandID)
          ]).pipe(
            map(combined => ({
              params: params,
              inbox: combined[0],
              brandID: combined[1]
            }))
          );
        }),
        catchError(err => {
          this.toastService.response(err);
          return of(null);
        }),
        switchMap(data => this.route.queryParams.pipe(
          map(queryParams => ({
            params: data.params,
            inbox: data.inbox,
            brandID: data.brandID,
            queryParams: queryParams
          }))
        )),
        switchMap(data => {
          if (data.params.date !== data.inbox.current.date) {
            this.router.navigate([
              '/inbox',
              data.brandID ? data.brandID : 'all',
              data.inbox.current.date
            ]);
            return of({
              pictures: null,
              inbox: data.inbox,
              brandID: data.brandID
            });
          }

          return this.pictureService.getPictures({
            status: 'inbox',
            fields:
              'owner,thumb_medium,votes,views,comments_count,name_html,name_text',
            limit: 30,
            page: data.queryParams.page,
            item_id: data.brandID,
            add_date: data.inbox.current.date,
            order: 1
          }).pipe(
            map(pictures => ({
              pictures: pictures,
              inbox: data.inbox,
              brandID: data.brandID
            }))
          );
        })
      )
      .subscribe(data => {
        this.brandID = data.brandID;
        this.prev = data.inbox.prev;
        this.current = data.inbox.current;
        this.next = data.inbox.next;
        this.brands = data.inbox.brands;

        this.pictures = data.pictures ? data.pictures.pictures : [];
        this.paginator = data.pictures ? data.pictures.paginator : null;
      });
  }

  ngOnDestroy(): void {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
      this.routeSub = null;
    }
  }

  public changeBrand() {
    this.router.navigate(['/inbox', this.brandID ? this.brandID : 'all']);
  }
}
