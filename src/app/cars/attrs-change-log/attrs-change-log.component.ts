import {Component, OnDestroy, OnInit} from '@angular/core';
import {APIUser, UserService} from '@services/user';
import {ActivatedRoute, Router} from '@angular/router';
import {combineLatest, EMPTY, Observable, of, Subscription} from 'rxjs';
import {ACLService, Privilege, Resource} from '@services/acl.service';
import {PageEnvService} from '@services/page-env.service';
import {catchError, debounceTime, distinctUntilChanged, map, shareReplay, switchMap} from 'rxjs/operators';
import {NgbTypeaheadSelectItemEvent} from '@ng-bootstrap/ng-bootstrap';
import {APIAttrsService} from '../../api/attrs/attrs.service';
import {getAttrsTranslation, getUnitTranslation} from '@utils/translations';
import {ToastsService} from '../../toasts/toasts.service';

@Component({
  selector: 'app-cars-attrs-change-log',
  templateUrl: './attrs-change-log.component.html',
  styleUrls: ['./attrs-change-log.component.scss'],
})
export class CarsAttrsChangeLogComponent implements OnInit, OnDestroy {
  private querySub: Subscription;

  protected readonly isModer$ = this.acl.isAllowed$(Resource.GLOBAL, Privilege.MODERATE);

  protected readonly userID$: Observable<number> = this.route.queryParamMap.pipe(
    map((params) => parseInt(params.get('user_id'), 10)),
    map((userID) => (userID ? userID : 0)),
    distinctUntilChanged(),
    debounceTime(10)
  );

  protected readonly itemID$ = this.route.queryParamMap.pipe(
    map((params) => parseInt(params.get('item_id'), 10)),
    distinctUntilChanged(),
    debounceTime(10)
  );

  protected readonly page$ = this.route.queryParamMap.pipe(
    map((params) => parseInt(params.get('page'), 10)),
    distinctUntilChanged(),
    debounceTime(10)
  );

  protected readonly items$ = combineLatest([this.userID$, this.itemID$, this.page$]).pipe(
    switchMap(([userID, itemID, page]) =>
      this.attrService.getUserValues$({
        user_id: userID ? userID : null,
        item_id: itemID,
        page: page,
        fields: 'user,item.name_html,path,unit,value_text',
      })
    ),
    shareReplay(1)
  );

  protected userQuery = '';
  protected usersDataSource: (text$: Observable<string>) => Observable<any[]>;

  constructor(
    private readonly userService: UserService,
    private readonly attrService: APIAttrsService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly acl: ACLService,
    private readonly pageEnv: PageEnvService,
    private readonly toastService: ToastsService
  ) {
    this.usersDataSource = (text$: Observable<string>) =>
      text$.pipe(
        debounceTime(200),
        switchMap((query) => {
          if (query === '') {
            return of([]);
          }

          const params = {
            limit: 10,
            id: [],
            search: '',
          };
          if (query.substring(0, 1) === '#') {
            params.id.push(parseInt(query.substring(1), 10));
          } else {
            params.search = query;
          }

          return this.userService.get$(params).pipe(
            catchError((err: unknown) => {
              this.toastService.handleError(err);
              return EMPTY;
            }),
            map((response) => response.items)
          );
        })
      );
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
      queryParamsHandling: 'merge',
      queryParams: {
        user_id: e.item.id,
      },
    });
  }

  protected clearUser(): void {
    this.userQuery = '';
    this.router.navigate([], {
      queryParamsHandling: 'merge',
      queryParams: {
        user_id: null,
      },
    });
  }

  ngOnDestroy(): void {
    this.querySub.unsubscribe();
  }

  protected getUnitTranslation(id: string, type: string): string {
    return getUnitTranslation(id, type);
  }

  protected getAttrsTranslation(id: string): string {
    return getAttrsTranslation(id);
  }
}
