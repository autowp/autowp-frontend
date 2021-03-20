import { Component, Injectable, OnInit, OnDestroy } from '@angular/core';
import { APIPaginator, APIService } from '../../services/api.service';
import { ActivatedRoute} from '@angular/router';
import { Subscription, of, combineLatest, BehaviorSubject } from 'rxjs';
import { PageEnvService } from '../../services/page-env.service';
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  catchError,
  tap, map
} from 'rxjs/operators';
import { APIAttrsService, APIAttrUserValue } from '../../api/attrs/attrs.service';
import {ToastsService} from '../../toasts/toasts.service';

@Component({
  selector: 'app-cars-specs-admin',
  templateUrl: './specs-admin.component.html'
})
@Injectable()
export class CarsSpecsAdminComponent implements OnInit, OnDestroy {
  private querySub: Subscription;
  public values: APIAttrUserValue[] = [];
  public paginator: APIPaginator;
  public move = {
    item_id: null
  };
  public move$ = new BehaviorSubject<boolean>(false);

  private itemID = 0;

  constructor(
    private api: APIService,
    private route: ActivatedRoute,
    private attrService: APIAttrsService,
    private pageEnv: PageEnvService,
    private toastService: ToastsService
  ) {
    setTimeout(
      () =>
        this.pageEnv.set({
          layout: {
            needRight: false
          },
          nameTranslated: $localize `History`,
          pageId: 103
        }),
      0
    );
  }

  ngOnInit(): void {
    this.querySub = combineLatest(
    [
      this.route.queryParamMap.pipe(
        map(params => ({
          item_id: parseInt(params.get('item_id'), 10),
          page: parseInt(params.get('page'), 10),
        })),
        distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
        debounceTime(10),
        tap(params => (this.itemID = params.item_id))
      ),
      this.move$
    ])
      .pipe(
        switchMap(([query]) => {
          return this.attrService.getUserValues({
            item_id: query.item_id,
            page: query.page,
            fields: 'user,path,unit'
          });
        }),
        catchError(err => {
          if (err.status !== -1) {
            this.toastService.response(err);
          }
          return of({
            items: [],
            paginator: null
          });
        })
      )
      .subscribe(data => {
        this.values = data.items;
        this.paginator = data.paginator;
      });
  }

  ngOnDestroy(): void {
    this.querySub.unsubscribe();
  }

  public deleteValue(value: APIAttrUserValue) {
    this.api
      .request(
        'DELETE',
        'attr/user-value/' + value.attribute_id + '/' + value.item_id + '/' + value.user_id
      )
      .subscribe(
        () => {
          for (let i = 0; i < this.values.length; i++) {
            if (this.values[i] === value) {
              this.values.splice(i, 1);
              break;
            }
          }
        },
        response => this.toastService.response(response)
      );
  }

  public moveValues() {
    this.api
      .request<void>(
        'PATCH',
        'attr/user-value',
        {
          body: {
            item_id: this.move.item_id
          },
          params: {
            item_id: this.itemID.toString()
          }
        }
      )
      .subscribe(
        () => {
          this.move$.next(true);
        },
        response => this.toastService.response(response)
      );
  }
}
