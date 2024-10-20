import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '@services/auth.service';
import {LanguageService} from '@services/language';
import {PageEnvService} from '@services/page-env.service';
import {APIPictureGetResponse, PictureService} from '@services/picture';
import {KeycloakService} from 'keycloak-angular';
import {combineLatest, EMPTY, Observable, of} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, map, switchMap} from 'rxjs/operators';

import {ToastsService} from '../toasts/toasts.service';
import {APIInbox, InboxService} from './inbox.service';

const ALL_BRANDS = 'all';

interface Inbox {
  brandCatname: string;
  inbox: APIInbox;
  pictures$: Observable<APIPictureGetResponse>;
}

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
})
export class InboxComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly auth = inject(AuthService);
  private readonly route = inject(ActivatedRoute);
  private readonly languageService = inject(LanguageService);
  private readonly keycloak = inject(KeycloakService);
  private readonly pictureService = inject(PictureService);
  private readonly inboxService = inject(InboxService);
  private readonly pageEnv = inject(PageEnvService);
  private readonly toastService = inject(ToastsService);

  protected readonly inbox$: Observable<Inbox> = this.auth.getUser$().pipe(
    switchMap((user) => {
      if (!user) {
        this.keycloak.login({
          locale: this.languageService.language,
          redirectUri: window.location.href,
        });
        return EMPTY;
      }

      return this.route.paramMap;
    }),
    map((params) => ({
      brand: params.get('brand'),
      date: params.get('date') || '',
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
          }),
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
        brandCatname: brandID ? brandID.toString() : 'all',
        inbox: inbox,
        pictures$: this.route.queryParamMap.pipe(
          map((params) => parseInt(params.get('page') || '', 10)),
          distinctUntilChanged(),
          switchMap((page) =>
            this.pictureService.getPictures$({
              add_date: inbox.current.date,
              fields: 'owner,thumb_medium,votes,views,comments_count,name_html,name_text',
              item_id: brandID,
              limit: 24,
              order: 1,
              page: page,
              status: 'inbox',
            }),
          ),
        ),
      });
    }),
  );

  protected brandID = 0;

  ngOnInit(): void {
    setTimeout(() => this.pageEnv.set({pageId: 76}), 0);
  }

  protected changeBrand() {
    this.router.navigate(['/inbox', this.brandID ? this.brandID : 'all']);
  }
}
