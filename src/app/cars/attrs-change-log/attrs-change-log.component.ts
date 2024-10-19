import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {
  APIItem,
  APIUser,
  APIUsersRequest,
  AttrUserValue,
  AttrUserValuesFields,
  AttrUserValuesRequest,
  ItemFields,
  ItemRequest,
} from '@grpc/spec.pb';
import {AttrsClient, ItemsClient, UsersClient} from '@grpc/spec.pbsc';
import {NgbTypeaheadSelectItemEvent} from '@ng-bootstrap/ng-bootstrap';
import {ACLService, Privilege, Resource} from '@services/acl.service';
import {LanguageService} from '@services/language';
import {PageEnvService} from '@services/page-env.service';
import {UserService} from '@services/user';
import {getUnitAbbrTranslation} from '@utils/translations';
import {combineLatest, EMPTY, Observable, of, Subscription} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, map, shareReplay, switchMap} from 'rxjs/operators';

import {APIAttrsService} from '../../api/attrs/attrs.service';
import {ToastsService} from '../../toasts/toasts.service';

interface AttrUserValueListItem {
  item$: Observable<APIItem | null>;
  path$: Observable<string[]>;
  unitAbbr$: Observable<null | string | undefined>;
  user$: Observable<APIUser | null>;
  userValue: AttrUserValue;
}

@Component({
  selector: 'app-cars-attrs-change-log',
  styleUrls: ['./attrs-change-log.component.scss'],
  templateUrl: './attrs-change-log.component.html',
})
export class CarsAttrsChangeLogComponent implements OnInit, OnDestroy {
  private readonly attrsClient = inject(AttrsClient);
  private readonly languageService = inject(LanguageService);
  private readonly itemsClient = inject(ItemsClient);
  private readonly attrsService = inject(APIAttrsService);

  private readonly itemsCache = new Map<string, Observable<APIItem>>();

  private querySub?: Subscription;

  protected readonly isModer$ = this.acl.isAllowed$(Resource.GLOBAL, Privilege.MODERATE);

  protected readonly userID$: Observable<string> = this.route.queryParamMap.pipe(
    map((params) => params.get('user_id') || ''),
    distinctUntilChanged(),
    debounceTime(10),
  );

  protected readonly itemID$ = this.route.queryParamMap.pipe(
    map((params) => params.get('item_id') || ''),
    distinctUntilChanged(),
    debounceTime(10),
  );

  protected readonly items$: Observable<{
    items: AttrUserValueListItem[];
  }> = combineLatest([this.userID$, this.itemID$]).pipe(
    switchMap(([userID, itemID]) =>
      this.attrsClient.getUserValues(
        new AttrUserValuesRequest({
          fields: new AttrUserValuesFields({valueText: true}),
          itemId: itemID,
          language: this.languageService.language,
          userId: userID ? userID : undefined,
        }),
      ),
    ),
    map((response) => ({
      items: (response.items || []).map((userValue) => {
        const attr$ = this.attrsService.getAttribute$(userValue.attributeId);
        return {
          item$: this.getItem$(userValue.itemId),
          path$: this.attrsService.getPath$(userValue.attributeId),
          unitAbbr$: attr$.pipe(map((attr) => (attr?.unitId ? getUnitAbbrTranslation(attr.unitId) : null))),
          user$: this.userService.getUser$(userValue.userId),
          userValue,
        };
      }),
    })),
    shareReplay(1),
  );

  protected userQuery = '';
  protected readonly usersDataSource: (text$: Observable<string>) => Observable<(APIUser | null)[]> = (
    text$: Observable<string>,
  ) =>
    text$.pipe(
      debounceTime(200),
      switchMap((query) => {
        if (query === '') {
          return of([]);
        }

        if (query.substring(0, 1) === '#') {
          return this.userService.getUser$(query.substring(1) || '').pipe(
            catchError((err: unknown) => {
              this.toastService.handleError(err);
              return EMPTY;
            }),
            map((user) => [user]),
          );
        }

        return this.usersClient
          .getUsers(
            new APIUsersRequest({
              limit: '10',
              search: query,
            }),
          )
          .pipe(
            catchError((err: unknown) => {
              this.toastService.handleError(err);
              return EMPTY;
            }),
            map((response) => response.items || []),
          );
      }),
    );

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly acl: ACLService,
    private readonly pageEnv: PageEnvService,
    private readonly toastService: ToastsService,
    private readonly usersClient: UsersClient,
    private readonly userService: UserService,
  ) {}

  private getItem$(id: string): Observable<APIItem | null> {
    let o$ = this.itemsCache.get(id);
    if (!o$) {
      o$ = this.itemsClient
        .item(new ItemRequest({fields: new ItemFields({nameHtml: true}), id: id}))
        .pipe(shareReplay(1));
      this.itemsCache.set(id, o$);
    }
    return o$;
  }

  ngOnInit(): void {
    setTimeout(() => this.pageEnv.set({pageId: 103}), 0);

    this.querySub = this.userID$.subscribe((userID) => {
      if (userID && !this.userQuery) {
        this.userQuery = '#' + userID;
      }
    });
  }

  protected userFormatter(x: APIUser) {
    return x.name;
  }

  protected userOnSelect(e: NgbTypeaheadSelectItemEvent): void {
    this.router.navigate([], {
      queryParams: {
        user_id: e.item.id,
      },
      queryParamsHandling: 'merge',
    });
  }

  protected clearUser(): void {
    this.userQuery = '';
    this.router.navigate([], {
      queryParams: {
        user_id: null,
      },
      queryParamsHandling: 'merge',
    });
  }

  ngOnDestroy(): void {
    if (this.querySub) {
      this.querySub.unsubscribe();
    }
  }
}
