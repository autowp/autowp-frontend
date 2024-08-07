import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {APIUser, APIUsersRequest} from '@grpc/spec.pb';
import {UsersClient} from '@grpc/spec.pbsc';
import {NgbTypeaheadSelectItemEvent} from '@ng-bootstrap/ng-bootstrap';
import {ACLService, Privilege, Resource} from '@services/acl.service';
import {APIPaginator} from '@services/api.service';
import {APIItem} from '@services/item';
import {PageEnvService} from '@services/page-env.service';
import {UserService} from '@services/user';
import {getAttrsTranslation, getUnitAbbrTranslation} from '@utils/translations';
import {EMPTY, Observable, Subscription, combineLatest, of} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, map, shareReplay, switchMap} from 'rxjs/operators';

import {APIAttrAttributeValue, APIAttrUnit, APIAttrsService} from '../../api/attrs/attrs.service';
import {ToastsService} from '../../toasts/toasts.service';

@Component({
  selector: 'app-cars-attrs-change-log',
  styleUrls: ['./attrs-change-log.component.scss'],
  templateUrl: './attrs-change-log.component.html',
})
export class CarsAttrsChangeLogComponent implements OnInit, OnDestroy {
  private querySub?: Subscription;

  protected readonly isModer$ = this.acl.isAllowed$(Resource.GLOBAL, Privilege.MODERATE);

  protected readonly userID$: Observable<number> = this.route.queryParamMap.pipe(
    map((params) => parseInt(params.get('user_id') || '', 10)),
    map((userID) => (userID ? userID : 0)),
    distinctUntilChanged(),
    debounceTime(10),
  );

  protected readonly itemID$ = this.route.queryParamMap.pipe(
    map((params) => parseInt(params.get('item_id') || '', 10)),
    distinctUntilChanged(),
    debounceTime(10),
  );

  protected readonly page$ = this.route.queryParamMap.pipe(
    map((params) => parseInt(params.get('page') || '', 10)),
    distinctUntilChanged(),
    debounceTime(10),
  );

  protected readonly items$: Observable<{
    items: {
      attribute_id: number;
      empty: boolean;
      item: APIItem | null;
      item_id: number;
      path: null | string[];
      unit: APIAttrUnit | null;
      update_date: null | string;
      user$: Observable<APIUser | null>;
      user_id: string;
      value: APIAttrAttributeValue | null;
      value_text: string;
    }[];
    paginator: APIPaginator;
  }> = combineLatest([this.userID$, this.itemID$, this.page$]).pipe(
    switchMap(([userID, itemID, page]) =>
      this.attrService.getUserValues$({
        fields: 'item.name_html,path,unit,value_text',
        item_id: itemID,
        page: page,
        user_id: userID ? userID : undefined,
      }),
    ),
    map((response) => ({
      items: response.items.map((item) => ({...item, user$: this.userService.getUser$(item.user_id)})),
      paginator: response.paginator,
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
    private readonly attrService: APIAttrsService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly acl: ACLService,
    private readonly pageEnv: PageEnvService,
    private readonly toastService: ToastsService,
    private readonly usersClient: UsersClient,
    private readonly userService: UserService,
  ) {}

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
    this.querySub && this.querySub.unsubscribe();
  }

  protected getAttrsTranslation(id: string): string {
    return getAttrsTranslation(id);
  }

  protected readonly getUnitAbbrTranslation = getUnitAbbrTranslation;
}
