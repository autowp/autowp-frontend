import { Component, OnInit} from '@angular/core';
import { APIService } from '../../services/api.service';
import { ActivatedRoute} from '@angular/router';
import {combineLatest, BehaviorSubject, EMPTY} from 'rxjs';
import { PageEnvService } from '../../services/page-env.service';
import {debounceTime, distinctUntilChanged, switchMap, catchError, map, shareReplay} from 'rxjs/operators';
import { APIAttrsService, APIAttrUserValue } from '../../api/attrs/attrs.service';
import {ToastsService} from '../../toasts/toasts.service';
import {getAttrsTranslation, getUnitTranslation } from '../../utils/translations';

@Component({
  selector: 'app-cars-specs-admin',
  templateUrl: './specs-admin.component.html'
})
export class CarsSpecsAdminComponent implements OnInit {

  public move = {
    item_id: null
  };
  private move$ = new BehaviorSubject<boolean>(false);

  public itemID$ = this.route.queryParamMap.pipe(
    map(params => parseInt(params.get('item_id'), 10)),
    distinctUntilChanged(),
    debounceTime(10),
    shareReplay(1)
  );

  private page$ = this.route.queryParamMap.pipe(
    map(params => parseInt(params.get('page'), 10)),
    distinctUntilChanged(),
    debounceTime(10)
  );

  public data$ = combineLatest(
    [
      this.itemID$,
      this.page$,
      this.move$
    ]).pipe(
    switchMap(([itemID, page]) => this.attrService.getUserValues({
      item_id: itemID,
      page: page,
      fields: 'user,path,unit'
    })),
    catchError(err => {
      if (err.status !== -1) {
        this.toastService.response(err);
      }
      return EMPTY;
    })
  );

  constructor(
    private api: APIService,
    private route: ActivatedRoute,
    private attrService: APIAttrsService,
    private pageEnv: PageEnvService,
    private toastService: ToastsService
  ) { }

  ngOnInit(): void {
    setTimeout(
      () =>
        this.pageEnv.set({
          layout: {
            needRight: false
          },
          pageId: 103
        }),
      0
    );
  }

  public deleteValue(values: APIAttrUserValue[], value: APIAttrUserValue) {
    this.api
      .request(
        'DELETE',
        'attr/user-value/' + value.attribute_id + '/' + value.item_id + '/' + value.user_id
      )
      .subscribe({
        next: () => {
          for (let i = 0; i < values.length; i++) {
            if (values[i] === value) {
              values.splice(i, 1);
              break;
            }
          }
        },
        error: response => this.toastService.response(response)
      });
  }

  public moveValues(itemID: number) {
    this.api
      .request<void>(
        'PATCH',
        'attr/user-value',
        {
          body: {
            item_id: this.move.item_id
          },
          params: {
            item_id: itemID.toString()
          }
        }
      )
      .subscribe({
        next: () => {
          this.move$.next(true);
        },
        error: response => this.toastService.response(response)
      });
  }

  public getUnitTranslation(id: number, type: string): string {
    return getUnitTranslation(id, type);
  }

  public getAttrsTranslation(id: string): string {
    return getAttrsTranslation(id);
  }
}
