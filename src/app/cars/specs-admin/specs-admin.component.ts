import {Component, OnInit} from '@angular/core';
import {APIService} from '@services/api.service';
import {ActivatedRoute} from '@angular/router';
import {combineLatest, BehaviorSubject, EMPTY} from 'rxjs';
import {PageEnvService} from '@services/page-env.service';
import {debounceTime, distinctUntilChanged, switchMap, catchError, map, shareReplay} from 'rxjs/operators';
import {APIAttrsService, APIAttrUserValue} from '../../api/attrs/attrs.service';
import {ToastsService} from '../../toasts/toasts.service';
import {getAttrsTranslation, getUnitTranslation} from '@utils/translations';

@Component({
  selector: 'app-cars-specs-admin',
  templateUrl: './specs-admin.component.html',
})
export class CarsSpecsAdminComponent implements OnInit {
  protected readonly move = {
    item_id: null,
  };
  private readonly move$ = new BehaviorSubject<boolean>(false);

  protected readonly itemID$ = this.route.queryParamMap.pipe(
    map((params) => parseInt(params.get('item_id'), 10)),
    distinctUntilChanged(),
    debounceTime(10),
    shareReplay(1)
  );

  private readonly page$ = this.route.queryParamMap.pipe(
    map((params) => parseInt(params.get('page'), 10)),
    distinctUntilChanged(),
    debounceTime(10)
  );

  protected readonly data$ = combineLatest([this.itemID$, this.page$, this.move$]).pipe(
    switchMap(([itemID, page]) =>
      this.attrService.getUserValues$({
        item_id: itemID,
        page: page,
        fields: 'user,path,unit',
      })
    ),
    catchError((err: unknown) => {
      this.toastService.handleError(err);
      return EMPTY;
    })
  );

  constructor(
    private readonly api: APIService,
    private readonly route: ActivatedRoute,
    private readonly attrService: APIAttrsService,
    private readonly pageEnv: PageEnvService,
    private readonly toastService: ToastsService
  ) {}

  ngOnInit(): void {
    setTimeout(() => this.pageEnv.set({pageId: 103}), 0);
  }

  protected deleteValue(values: APIAttrUserValue[], value: APIAttrUserValue) {
    this.api
      .request('DELETE', 'attr/user-value/' + value.attribute_id + '/' + value.item_id + '/' + value.user_id)
      .subscribe({
        next: () => {
          for (let i = 0; i < values.length; i++) {
            if (values[i] === value) {
              values.splice(i, 1);
              break;
            }
          }
        },
        error: (response: unknown) => this.toastService.handleError(response),
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
        next: () => {
          this.move$.next(true);
        },
        error: (response: unknown) => this.toastService.handleError(response),
      });
  }

  protected getUnitTranslation(id: string, type: string): string {
    return getUnitTranslation(id, type);
  }

  protected getAttrsTranslation(id: string): string {
    return getAttrsTranslation(id);
  }
}
