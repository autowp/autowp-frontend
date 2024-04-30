import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {APIService} from '@services/api.service';
import {AuthService} from '@services/auth.service';
import {PageEnvService} from '@services/page-env.service';
import {APIUser, UserService} from '@services/user';
import {getUnitTranslation} from '@utils/translations';
import {Observable, combineLatest} from 'rxjs';
import {debounceTime, distinctUntilChanged, map, shareReplay, switchMap} from 'rxjs/operators';

import {APIAttrConflict, APIAttrConflictValue, APIAttrsService} from '../../api/attrs/attrs.service';

interface APIAttrConflictValueInList extends APIAttrConflictValue {
  user$?: Observable<APIUser | null>;
}

interface APIAttrConflictInList extends APIAttrConflict {
  values: APIAttrConflictValueInList[];
}

@Component({
  selector: 'app-account-specs-conflicts',
  templateUrl: './specs-conflicts.component.html',
})
export class AccountSpecsConflictsComponent implements OnInit {
  protected readonly page$ = this.route.queryParamMap.pipe(
    map((params) => parseInt(params.get('page') || '', 10)),
    distinctUntilChanged(),
    debounceTime(10),
  );

  protected readonly filter$ = this.route.queryParamMap.pipe(
    map((params) => params.get('filter')),
    distinctUntilChanged(),
    debounceTime(10),
    map((filter) => filter || '0'),
  );

  protected readonly user$ = this.auth.getUser$().pipe(
    switchMap(() =>
      this.api.request<APIUser>('GET', 'user/me', {
        params: {fields: 'specs_weight'},
      }),
    ),
    shareReplay(1),
  );

  protected readonly data$ = combineLatest([this.page$, this.filter$]).pipe(
    switchMap(([page, filter]) =>
      combineLatest([
        this.attrService.getConflicts$({
          fields: 'values',
          filter,
          page,
        }),
        this.user$,
      ]),
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
    }),
  );

  constructor(
    private readonly api: APIService,
    private readonly userService: UserService,
    protected readonly auth: AuthService,
    private readonly route: ActivatedRoute,
    private readonly attrService: APIAttrsService,
    private readonly pageEnv: PageEnvService,
  ) {}

  ngOnInit(): void {
    setTimeout(() => this.pageEnv.set({pageId: 188}), 0);
  }

  protected getUnitTranslation(id: string, type: string): string {
    return getUnitTranslation(id, type);
  }
}
