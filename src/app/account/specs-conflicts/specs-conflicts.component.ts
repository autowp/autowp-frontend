import { Component, Injectable, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APIPaginator } from '../../services/api.service';
import { UserService, APIUser } from '../../services/user';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Subscription, combineLatest } from 'rxjs';
import { PageEnvService } from '../../services/page-env.service';
import {
  distinctUntilChanged,
  debounceTime,
  tap,
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
    private http: HttpClient,
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
          name: 'page/188/name',
          pageId: 188
        }),
      0
    );

    this.querySub = combineLatest([
      this.route.queryParams.pipe(
        distinctUntilChanged(),
        debounceTime(30)
      ),
      this.auth.getUser().pipe(
        switchMapTo(
          this.http.get<APIUser>('/api/user/me', {
            params: { fields: 'specs_weight' }
          })
        )
      )
    ])
      .pipe(
        map(data => ({ params: data[0], user: data[1] })),
        tap(data => {
          this.filter = data.params.filter || '0';
          this.page = data.params.page;
          this.user = data.user;
        }),
        switchMap(
          data =>
            this.attrService.getConfilicts({
              filter: data.params.filter || '0',
              page: data.params.page,
              fields: 'values'
            }).pipe(
              map(conflicts => ({
                user: data.user,
                conflicts: conflicts
              }))
            )
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
