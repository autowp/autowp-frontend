import {Component, OnDestroy, OnInit} from '@angular/core';
import {APIUser, UserService} from '../../services/user';
import {ActivatedRoute, Router} from '@angular/router';
import {combineLatest, EMPTY, Observable, of, Subscription} from 'rxjs';
import {ACLService, Privilege, Resource} from '../../services/acl.service';
import {PageEnvService} from '../../services/page-env.service';
import {catchError, debounceTime, distinctUntilChanged, map, shareReplay, switchMap} from 'rxjs/operators';
import {NgbTypeaheadSelectItemEvent} from '@ng-bootstrap/ng-bootstrap';
import {APIAttrsService} from '../../api/attrs/attrs.service';
import {getAttrsTranslation, getUnitTranslation } from '../../utils/translations';

@Component({
  selector: 'app-cars-attrs-change-log',
  templateUrl: './attrs-change-log.component.html',
  styleUrls: ['./attrs-change-log.component.scss']
})
export class CarsAttrsChangeLogComponent implements OnInit, OnDestroy {
  private querySub: Subscription;

  public isModer$ = this.acl.isAllowed(Resource.GLOBAL, Privilege.MODERATE);

  public userID$: Observable<number> = this.route.queryParamMap.pipe(
    map(params => parseInt(params.get('user_id'), 10)),
    map(userID => userID ? userID : 0),
    distinctUntilChanged(),
    debounceTime(10)
  );

  public itemID$ = this.route.queryParamMap.pipe(
    map(params => parseInt(params.get('item_id'), 10)),
    distinctUntilChanged(),
    debounceTime(10)
  );

  public page$ = this.route.queryParamMap.pipe(
    map(params => parseInt(params.get('page'), 10)),
    distinctUntilChanged(),
    debounceTime(10)
  );

  public items$ = combineLatest([this.userID$, this.itemID$, this.page$]).pipe(
    switchMap(([userID, itemID, page]) => this.attrService.getUserValues({
      user_id: userID ? userID : null,
      item_id: itemID,
      page: page,
      fields: 'user,item.name_html,path,unit,value_text'
    })),
    shareReplay(1)
  );

  public userQuery = '';
  public usersDataSource: (text$: Observable<string>) => Observable<any[]>;

  constructor(
    private userService: UserService,
    private attrService: APIAttrsService,
    private route: ActivatedRoute,
    private router: Router,
    private acl: ACLService,
    private pageEnv: PageEnvService
  ) {
    this.usersDataSource = (text$: Observable<string>) =>
      text$.pipe(
        debounceTime(200),
        switchMap(query => {
          if (query === '') {
            return of([]);
          }

          const params = {
            limit: 10,
            id: [],
            search: ''
          };
          if (query.substring(0, 1) === '#') {
            params.id.push(parseInt(query.substring(1), 10));
          } else {
            params.search = query;
          }

          return this.userService.get(params).pipe(
            catchError((err, caught) => {
              console.log(err, caught);
              return EMPTY;
            }),
            map(response => response.items)
          );
        })
      );
  }

  ngOnInit(): void {
    setTimeout(
      () =>
        this.pageEnv.set({pageId: 103}),
      0
    );

    this.querySub = this.userID$.subscribe(userID => {
      if (userID && !this.userQuery) {
        this.userQuery = '#' + userID;
      }
    });
  }

  public userFormatter(x: APIUser) {
    return x.name;
  }

  public userOnSelect(e: NgbTypeaheadSelectItemEvent): void {
    this.router.navigate([], {
      queryParamsHandling: 'merge',
      queryParams: {
        user_id: e.item.id
      }
    });
  }

  public clearUser(): void {
    this.userQuery = '';
    this.router.navigate([], {
      queryParamsHandling: 'merge',
      queryParams: {
        user_id: null
      }
    });
  }

  ngOnDestroy(): void {
    this.querySub.unsubscribe();
  }

  public getUnitTranslation(id: number, type: string): string {
    return getUnitTranslation(id, type);
  }

  public getAttrsTranslation(id: string): string {
    return getAttrsTranslation(id);
  }
}
