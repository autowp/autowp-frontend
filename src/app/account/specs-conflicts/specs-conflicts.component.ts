import {Component, OnInit} from '@angular/core';
import {APIService} from '../../services/api.service';
import {UserService, APIUser} from '../../services/user';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {combineLatest, Observable} from 'rxjs';
import {PageEnvService} from '../../services/page-env.service';
import {distinctUntilChanged, debounceTime, switchMap, map, shareReplay} from 'rxjs/operators';
import {APIAttrConflictValue, APIAttrConflict, APIAttrsService} from '../../api/attrs/attrs.service';
import {getUnitTranslation} from '../../utils/translations';

interface APIAttrConflictValueInList extends APIAttrConflictValue {
  user$?: Observable<APIUser>;
}

interface APIAttrConflictInList extends APIAttrConflict {
  values: APIAttrConflictValueInList[];
}

@Component({
  selector: 'app-account-specs-conflicts',
  templateUrl: './specs-conflicts.component.html',
})
export class AccountSpecsConflictsComponent implements OnInit {
  public page$ = this.route.queryParamMap.pipe(
    map((params) => parseInt(params.get('page'), 10)),
    distinctUntilChanged(),
    debounceTime(10)
  );

  public filter$ = this.route.queryParamMap.pipe(
    map((params) => params.get('filter')),
    distinctUntilChanged(),
    debounceTime(10),
    map((filter) => filter || '0')
  );

  public user$ = this.auth.getUser$().pipe(
    switchMap(() =>
      this.api.request<APIUser>('GET', 'user/me', {
        params: {fields: 'specs_weight'},
      })
    ),
    shareReplay(1)
  );

  public data$ = combineLatest([this.page$, this.filter$]).pipe(
    switchMap(([page, filter]) =>
      combineLatest([
        this.attrService.getConfilicts$({
          filter,
          page,
          fields: 'values',
        }),
        this.user$,
      ])
    ),
    map(([data, user]) => {
      const conflicts: APIAttrConflictInList[] = data.items;
      for (const conflict of conflicts) {
        for (const value of conflict.values) {
          if (user.id !== value.user_id) {
            value.user$ = this.userService.getUser$(value.user_id, {});
          }
        }
      }

      return {
        conflicts,
        paginator: data.paginator,
      };
    })
  );

  constructor(
    private api: APIService,
    private userService: UserService,
    public auth: AuthService,
    private route: ActivatedRoute,
    private attrService: APIAttrsService,
    private pageEnv: PageEnvService
  ) {}

  ngOnInit(): void {
    setTimeout(() => this.pageEnv.set({pageId: 188}), 0);
  }

  public getUnitTranslation(id: number, type: string): string {
    return getUnitTranslation(id, type);
  }
}
