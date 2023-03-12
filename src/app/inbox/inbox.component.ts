import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {AuthService} from '@services/auth.service';
import {of, combineLatest, EMPTY, Observable} from 'rxjs';
import {APIPictureGetResponse, PictureService} from '@services/picture';
import {APIInbox, InboxService} from './inbox.service';
import {PageEnvService} from '@services/page-env.service';
import {distinctUntilChanged, debounceTime, switchMap, catchError, map} from 'rxjs/operators';
import {ToastsService} from '../toasts/toasts.service';
import {LanguageService} from '@services/language';
import {KeycloakService} from 'keycloak-angular';

const ALL_BRANDS = 'all';

interface Inbox {
  pictures$: Observable<APIPictureGetResponse>;
  brandCatname: string;
  inbox: APIInbox;
}

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
})
export class InboxComponent implements OnInit {
  public inbox$: Observable<Inbox> = this.auth.getUser$().pipe(
    switchMap((user) => {
      if (!user) {
        this.keycloak.login({
          redirectUri: window.location.href,
          locale: this.languageService.language,
        });
        return EMPTY;
      }

      return this.route.paramMap;
    }),
    map((params) => ({
      brand: params.get('brand'),
      date: params.get('date'),
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
            this.toastService.handleError(err);
            return EMPTY;
          })
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
        pictures$: this.route.queryParamMap.pipe(
          map((params) => parseInt(params.get('page'), 10)),
          distinctUntilChanged(),
          switchMap((page) =>
            this.pictureService.getPictures$({
              status: 'inbox',
              fields: 'owner,thumb_medium,votes,views,comments_count,name_html,name_text',
              limit: 24,
              page: page,
              item_id: brandID,
              add_date: inbox.current.date,
              order: 1,
            })
          )
        ),
        inbox: inbox,
        brandCatname: brandID ? brandID.toString() : 'all',
      });
    })
  );

  public brandID = 0;

  constructor(
    private router: Router,
    private auth: AuthService,
    private route: ActivatedRoute,
    private languageService: LanguageService,
    private keycloak: KeycloakService,
    private pictureService: PictureService,
    private inboxService: InboxService,
    private pageEnv: PageEnvService,
    private toastService: ToastsService
  ) {}

  ngOnInit(): void {
    setTimeout(() => this.pageEnv.set({pageId: 76}), 0);
  }

  public changeBrand() {
    this.router.navigate(['/inbox', this.brandID ? this.brandID : 'all']);
  }
}
