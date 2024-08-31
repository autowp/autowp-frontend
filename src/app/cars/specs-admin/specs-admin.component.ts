import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {APIUser} from '@grpc/spec.pb';
import {APIPaginator, APIService} from '@services/api.service';
import {APIItem} from '@services/item';
import {PageEnvService} from '@services/page-env.service';
import {UserService} from '@services/user';
import {getAttrsTranslation, getUnitNameTranslation} from '@utils/translations';
import {BehaviorSubject, combineLatest, EMPTY, Observable} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, map, shareReplay, switchMap} from 'rxjs/operators';

import {APIAttrAttributeValue, APIAttrsService, APIAttrUnit, APIAttrUserValue} from '../../api/attrs/attrs.service';
import {ToastsService} from '../../toasts/toasts.service';

@Component({
  selector: 'app-cars-specs-admin',
  templateUrl: './specs-admin.component.html',
})
export class CarsSpecsAdminComponent implements OnInit {
  protected readonly move = {
    item_id: null,
  };
  private readonly move$ = new BehaviorSubject<void>(void 0);

  protected readonly itemID$ = this.route.queryParamMap.pipe(
    map((params) => parseInt(params.get('item_id') || '', 10)),
    distinctUntilChanged(),
    debounceTime(10),
    shareReplay(1),
  );

  private readonly page$ = this.route.queryParamMap.pipe(
    map((params) => parseInt(params.get('page') || '', 10)),
    distinctUntilChanged(),
    debounceTime(10),
  );

  protected readonly data$: Observable<{
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
  }> = combineLatest([this.itemID$, this.page$, this.move$]).pipe(
    switchMap(([itemID, page]) =>
      this.attrService.getUserValues$({
        fields: 'path,unit',
        item_id: itemID,
        page: page,
      }),
    ),
    catchError((err: unknown) => {
      this.toastService.handleError(err);
      return EMPTY;
    }),
    map((response) => ({
      items: response.items.map((item) => ({...item, user$: this.userService.getUser$(item.user_id)})),
      paginator: response.paginator,
    })),
  );

  constructor(
    private readonly api: APIService,
    private readonly route: ActivatedRoute,
    private readonly attrService: APIAttrsService,
    private readonly pageEnv: PageEnvService,
    private readonly toastService: ToastsService,
    private readonly userService: UserService,
  ) {}

  ngOnInit(): void {
    setTimeout(() => this.pageEnv.set({pageId: 103}), 0);
  }

  protected deleteValue(values: APIAttrUserValue[], value: APIAttrUserValue) {
    this.api
      .request('DELETE', 'attr/user-value/' + value.attribute_id + '/' + value.item_id + '/' + value.user_id)
      .subscribe({
        error: (response: unknown) => this.toastService.handleError(response),
        next: () => {
          for (let i = 0; i < values.length; i++) {
            if (values[i] === value) {
              values.splice(i, 1);
              break;
            }
          }
        },
      });
  }

  protected moveValues(itemID: number) {
    this.api
      .request<void>('PATCH', 'attr/user-value', {
        body: {
          item_id: this.move.item_id,
        },
        params: {
          item_id: itemID.toString(),
        },
      })
      .subscribe({
        error: (response: unknown) => this.toastService.handleError(response),
        next: () => {
          this.move$.next();
        },
      });
  }

  protected getUnitNameTranslation(id: string): string {
    return getUnitNameTranslation(id);
  }

  protected getAttrsTranslation(id: string): string {
    return getAttrsTranslation(id);
  }
}
