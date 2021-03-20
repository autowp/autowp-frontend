import { Component, Injectable, OnInit, OnDestroy } from '@angular/core';
import { APIPaginator, APIService } from '../../services/api.service';
import { UserService, APIUser } from '../../services/user';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Subscription, combineLatest } from 'rxjs';
import { PageEnvService } from '../../services/page-env.service';
import {
  distinctUntilChanged,
  debounceTime,
  switchMap,
  switchMapTo, map
} from 'rxjs/operators';
import { APIAttrConflictValue, APIAttrConflict, APIAttrsService } from '../../api/attrs/attrs.service';

interface APIAttrConflictValueInList extends APIAttrConflictValue {
  user?: APIUser;
}

interface APIAttrConflictInList extends APIAttrConflict {
  values: APIAttrConflictValueInList[];
}

@Component({
  selector: 'app-account-specs-conflicts',
  templateUrl: './specs-conflicts.component.html'
})
@Injectable()
export class AccountSpecsConflictsComponent implements OnInit, OnDestroy {
  private querySub: Subscription;
  public filter: string;
  public conflicts: APIAttrConflictInList[] = [];
  public paginator: APIPaginator;
  public page: number;
  public user: APIUser;

  constructor(
    private api: APIService,
    private userService: UserService,
    public auth: AuthService,
    private route: ActivatedRoute,
    private attrService: APIAttrsService,
    private pageEnv: PageEnvService
  ) {}

  ngOnInit(): void {
    setTimeout(
      () =>
        this.pageEnv.set({
          layout: {
            needRight: false
          },
          nameTranslated: $localize `Conflicts`,
          pageId: 188
        }),
      0
    );

    this.querySub = combineLatest([
      this.route.queryParamMap.pipe(
        map(params => ({
          filter: params.get('filter'),
          page: parseInt(params.get('page'), 10),
        })),
        distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
        debounceTime(30)
      ),
      this.auth.getUser().pipe(
        switchMapTo(
          this.api.request<APIUser>('GET', 'user/me', {
            params: { fields: 'specs_weight' }
          })
        )
      )
    ])
      .pipe(
        switchMap(
          ([params, user]) => {
            this.filter = params.filter || '0';
            this.page = params.page;
            this.user = user;

            return this.attrService.getConfilicts({
              filter: params.filter || '0',
              page: params.page,
              fields: 'values'
            }).pipe(
              map(conflicts => ({
                user,
                conflicts
              }))
            );
          }
        )
      )
      .subscribe(data => {
        this.conflicts = data.conflicts.items;
        for (const conflict of this.conflicts) {
          for (const value of conflict.values) {
            if (data.user.id !== value.user_id) {
              this.userService.getUser(value.user_id, {}).subscribe(user => {
                value.user = user;
              });
            }
          }
        }
        this.paginator = data.conflicts.paginator;
      });
  }

  ngOnDestroy(): void {
    this.querySub.unsubscribe();
  }
}
