import { Component, Injectable, OnDestroy, OnInit } from '@angular/core';
import { Subscription, combineLatest, BehaviorSubject } from 'rxjs';
import { APIItem, ItemService } from '../../services/item';
import { ACLService } from '../../services/acl.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PageEnvService } from '../../services/page-env.service';
import { APIUser } from '../../services/user';
import {
  switchMap,
  distinctUntilChanged,
  debounceTime,
  switchMapTo, map
} from 'rxjs/operators';
import {ToastsService} from '../../toasts/toasts.service';
import { APIService } from '../../services/api.service';

@Component({
  selector: 'app-cars-specifications-editor',
  templateUrl: './specifications-editor.component.html'
})
@Injectable()
export class CarsSpecificationsEditorComponent implements OnInit, OnDestroy {
  public enginesCount = 0;
  private querySub: Subscription;
  public item: APIItem;
  public isSpecsAdmin = false;
  public isModer = false;
  public engine: APIItem;
  public tab = 'info';
  public loading = 0;
  public specsWeight: number;
  private change$ = new BehaviorSubject<null>(null);

  constructor(
    private api: APIService,
    private itemService: ItemService,
    private acl: ACLService,
    private router: Router,
    private route: ActivatedRoute,
    private pageEnv: PageEnvService,
    private toastService: ToastsService
  ) {}

  ngOnInit(): void {
    this.loading++;
    this.api
      .request<APIUser>('GET', 'user/me', {
        params: {
          fields: 'specs_weight'
        }
      })
      .subscribe(
        response => {
          this.specsWeight = response.specs_weight;
          this.loading--;
        },
        response => {
          this.toastService.response(response);
          this.loading--;
        }
      );

    this.querySub = this.route.queryParamMap
      .pipe(
        map(params => ({
          tab: params.get('tab'),
          item_id: parseInt(params.get('item_id'), 10)
        })),
        distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
        debounceTime(30),
        switchMap(params => {
          this.tab = params.tab || 'info';

          return combineLatest([
            this.change$.pipe(
              switchMapTo(
                this.itemService.getItem(params.item_id, {
                  fields: 'name_html,name_text,engine_id,attr_zone_id'
                })
              )
            ),
            this.acl.isAllowed('specifications', 'admin'),
            this.acl.inheritsRole('moder')
          ]);
        })
      )
      .subscribe(
        ([item, isSpecsAdmin, isModer]) => {
          this.isSpecsAdmin = isSpecsAdmin;
          this.isModer = isModer;

          if (! item) {
            this.router.navigate(['/error-404'], {
              skipLocationChange: true
            });
            return;
          }

          this.item = item;

          this.pageEnv.set({
            layout: {
              needRight: false
            },
            name: 'page/102/ng-name',
            pageId: 102,
            args: {
              item_name: item.name_text
            }
          });

          this.enginesCount = this.item.engine_id ? 1 : 0;
        },
        () => {
          this.router.navigate(['/error-404'], {
            skipLocationChange: true
          });
        }
      );
  }

  ngOnDestroy(): void {
    this.querySub.unsubscribe();
  }

  public onEngineChanged() {
    this.change$.next(null);
  }

  public refreshInheritance() {
    this.api
      .request<void>('POST', 'item/' + this.item.id + '/refresh-inheritance', {body: {}})
      .subscribe(
        () => {
          this.router.navigate(['/cars/specifications-editor'], {
            queryParams: {
              item_id: this.item.id,
              tab: 'admin'
            }
          });
        },
        response => this.toastService.response(response)
      );
  }
}
