import { Component, Injectable, OnInit, OnDestroy } from '@angular/core';
import { APIPaginator } from '../../services/api.service';
import { UserService, APIUser } from '../../services/user';
import { ActivatedRoute, Router } from '@angular/router';
import {Subscription, Observable, of, combineLatest, EMPTY} from 'rxjs';
import { ACLService } from '../../services/acl.service';
import { PageEnvService } from '../../services/page-env.service';
import {
  distinctUntilChanged,
  debounceTime,
  switchMap,
  catchError,
  map
} from 'rxjs/operators';
import { NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap';
import { APIAttrUserValue, APIAttrsService } from '../../api/attrs/attrs.service';

@Component({
  selector: 'app-cars-attrs-change-log',
  templateUrl: './attrs-change-log.component.html',
  styleUrls: ['./attrs-change-log.component.scss']
})
@Injectable()
export class CarsAttrsChangeLogComponent implements OnInit, OnDestroy {
  private querySub: Subscription;
  public items: APIAttrUserValue[] = [];
  public paginator: APIPaginator;
  public isModer = false;

  public userID: number;
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
        this.pageEnv.set({
          layout: {
            needRight: false
          },
          name: 'page/103/name',
          pageId: 103
        }),
      0
    );

    this.querySub = this.route.queryParamMap
      .pipe(
        map(params => ({
          user_id: parseInt(params.get('user_id'), 10),
          item_id: parseInt(params.get('item_id'), 10),
          page: parseInt(params.get('page'), 10),
        })),
        distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
        debounceTime(30),
        switchMap(params => combineLatest([
          of(params),
          this.attrService.getUserValues({
            user_id: params.user_id ? params.user_id : null,
            item_id: params.item_id,
            page: params.page,
            fields: 'user,item.name_html,path,unit,value_text'
          }),
          this.acl.inheritsRole('moder')
        ]))
      )
      .subscribe(([params, items, isModer]) => {
        this.isModer = isModer;
        this.userID = params.user_id ? params.user_id : 0;
        if (this.userID && !this.userQuery) {
          this.userQuery = '#' + this.userID;
        }
        this.items = items.items;
        this.paginator = items.paginator;
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
}
