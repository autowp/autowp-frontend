import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {
  APIItem,
  APIUser,
  AttrAttribute,
  AttrConflict,
  AttrConflictsRequest,
  AttrConflictValue,
  ItemFields,
  ItemRequest,
  Pages,
} from '@grpc/spec.pb';
import {AttrsClient, ItemsClient} from '@grpc/spec.pbsc';
import {AuthService} from '@services/auth.service';
import {LanguageService} from '@services/language';
import {PageEnvService} from '@services/page-env.service';
import {UserService} from '@services/user';
import {getUnitAbbrTranslation} from '@utils/translations';
import {combineLatest, Observable, of} from 'rxjs';
import {debounceTime, distinctUntilChanged, map, shareReplay, switchMap} from 'rxjs/operators';

import {APIAttrsService} from '../../api/attrs/attrs.service';

interface APIAttrConflictValueInList {
  user$: Observable<APIUser | null>;
  value: AttrConflictValue;
}

interface APIAttrConflictInList {
  attribute$: Observable<AttrAttribute | undefined>;
  conflict: AttrConflict;
  item$: Observable<APIItem | null>;
  unitName$: Observable<null | string>;
  values: APIAttrConflictValueInList[];
}

function mapFilter(filter: string): AttrConflictsRequest.Filter {
  switch (filter) {
    case '-1':
      return AttrConflictsRequest.Filter.I_DISAGREE;
    case '1':
      return AttrConflictsRequest.Filter.DO_NOT_AGREE_WITH_ME;
    case 'minus-weight':
      return AttrConflictsRequest.Filter.MINUS_WEIGHT;
  }

  return AttrConflictsRequest.Filter.ALL;
}

@Component({
  selector: 'app-account-specs-conflicts',
  templateUrl: './specs-conflicts.component.html',
})
export class AccountSpecsConflictsComponent implements OnInit {
  private readonly languageService = inject(LanguageService);
  private readonly userService = inject(UserService);
  protected readonly auth = inject(AuthService);
  private readonly route = inject(ActivatedRoute);
  private readonly pageEnv = inject(PageEnvService);
  private readonly attrsClient = inject(AttrsClient);
  private readonly itemsClient = inject(ItemsClient);
  private readonly attrsService = inject(APIAttrsService);

  protected readonly page$ = this.route.queryParamMap.pipe(
    map((params) => parseInt(params.get('page') || '', 10)),
    distinctUntilChanged(),
    debounceTime(10),
  );

  protected readonly filter$ = this.route.queryParamMap.pipe(
    map((params) => params.get('filter')),
    distinctUntilChanged(),
    debounceTime(10),
    map((filter) => mapFilter(filter || '')),
  );

  protected readonly user$: Observable<APIUser | null> = this.auth.getUser$();

  private readonly itemsCache = new Map<string, Observable<APIItem>>();

  private getItem$(id: string): Observable<APIItem | null> {
    let o$ = this.itemsCache.get(id);
    if (!o$) {
      o$ = this.itemsClient
        .item(new ItemRequest({fields: new ItemFields({nameHtml: true}), id, language: this.languageService.language}))
        .pipe(shareReplay(1));
      this.itemsCache.set(id, o$);
    }
    return o$;
  }

  protected readonly data$: Observable<{conflicts: APIAttrConflictInList[]; paginator: Pages | undefined}> =
    combineLatest([this.page$, this.filter$]).pipe(
      switchMap(([page, filter]) =>
        combineLatest([
          this.attrsClient.getConflicts(
            new AttrConflictsRequest({
              filter,
              language: this.languageService.language,
              page,
            }),
          ),
          this.user$,
        ]),
      ),
      map(([data, user]) => ({
        conflicts: (data.items || []).map((conflict) => {
          const attribute$ = this.attrsService.getAttribute$(conflict.attributeId);
          return {
            attribute$,
            conflict,
            item$: this.getItem$(conflict.itemId),
            unitName$: attribute$.pipe(
              map((attr) => (attr?.unitId && attr.unitId !== '0' ? getUnitAbbrTranslation(attr.unitId) : null)),
            ),
            values: (conflict.values || []).map((value) => ({
              user$: user?.id === value.userId ? of(null) : this.userService.getUser$(value.userId),
              value,
            })),
          };
        }),
        paginator: data.paginator,
      })),
    );

  protected readonly AttrConflictsRequest = AttrConflictsRequest;

  ngOnInit(): void {
    setTimeout(() => this.pageEnv.set({pageId: 188}), 0);
  }
}
