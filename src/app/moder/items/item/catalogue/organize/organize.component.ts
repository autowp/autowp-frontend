import { Component, Injectable, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  Subscription,
  Observable,
  forkJoin,
  combineLatest,
  of, EMPTY
} from 'rxjs';
import {
  APIItemParent,
  ItemParentService
} from '../../../../../services/item-parent';
import { APIItem, ItemService } from '../../../../../services/item';
import { PageEnvService } from '../../../../../services/page-env.service';
import { APIItemVehicleTypeGetResponse, APIService } from '../../../../../services/api.service';
import {
  switchMap,
  catchError,
  distinctUntilChanged,
  debounceTime,
  tap, map
} from 'rxjs/operators';

interface APIItemParentInOrganize extends APIItemParent {
  selected?: boolean;
}

@Component({
  selector: 'app-moder-items-item-organize',
  templateUrl: './organize.component.html'
})
@Injectable()
export class ModerItemsItemOrganizeComponent implements OnInit, OnDestroy {
  private itemTypeID: number;
  private sub: Subscription;
  public item: APIItem;
  public newItem: any = null;
  public hasSelectedChild = false;
  public loading = 0;
  public childs: APIItemParentInOrganize[];
  public invalidParams: any;
  public vehicleTypeIDs: number[] = [];

  constructor(
    private api: APIService,
    private itemService: ItemService,
    private router: Router,
    private route: ActivatedRoute,
    private itemParentService: ItemParentService,
    private pageEnv: PageEnvService
  ) {}

  ngOnInit(): void {
    this.sub = combineLatest([
      this.route.queryParamMap.pipe(
        tap(params => {
          this.itemTypeID = parseInt(params.get('item_type_id'), 10);
        })
      ),
      this.route.paramMap.pipe(
        map(params => parseInt(params.get('id'), 10)),
        distinctUntilChanged(),
        debounceTime(30),
        switchMap(id =>
          combineLatest([
            this.itemService
              .getItem(id, {
                fields: [
                  'name_text',
                  'name',
                  'is_concept',
                  'name_default',
                  'subscription',
                  'begin_year',
                  'begin_month',
                  'end_year',
                  'end_month',
                  'today',
                  'begin_model_year',
                  'end_model_year',
                  'produced',
                  'spec_id',
                  'full_name',
                  'lat',
                  'lng'
                ].join(',')
              })
              .pipe(
                tap(item => {
                  this.item = item;
                  this.newItem = Object.assign({}, item);

                  this.pageEnv.set({
                    layout: {
                      isAdminPage: true,
                      needRight: false
                    },
                    nameTranslated: 'Organize',
                    pageId: 215
                  });
                }),
                switchMap(item =>
                  item.item_type_id === 1 || item.item_type_id === 4
                    ? this.api
                        .request<APIItemVehicleTypeGetResponse>(
                          'GET',
                          'item-vehicle-type',
                          {
                            params: {
                              item_id: item.id.toString()
                            }
                          }
                        )
                        .pipe(
                          tap(response => {
                            this.vehicleTypeIDs = response.items.map(row => row.vehicle_type_id);
                          })
                        )
                    : of(null)
                )
              ),
            this.itemParentService
              .getItems({
                parent_id: id,
                limit: 500,
                fields: 'item.name_html',
                order: 'type_auto'
              })
              .pipe(tap(data => (this.childs = data.items)))
          ])
        )
      )
    ]).subscribe();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  public childSelected() {
    let result = false;
    for (const child of this.childs) {
      if (child.selected) {
        result = true;
      }
    }

    this.hasSelectedChild = result;
  }

  public submit() {
    this.loading++;

    const data = {
      item_type_id: this.itemTypeID,
      name: this.newItem.name,
      full_name: this.newItem.full_name,
      catname: this.newItem.catname,
      body: this.newItem.body,
      spec_id: this.newItem.spec_id,
      begin_model_year: this.newItem.begin_model_year,
      end_model_year: this.newItem.end_model_year,
      begin_model_year_fraction: this.newItem.begin_model_year_fraction,
      end_model_year_fraction: this.newItem.end_model_year_fraction,
      begin_year: this.newItem.begin_year,
      begin_month: this.newItem.begin_month,
      end_year: this.newItem.end_year,
      end_month: this.newItem.end_month,
      today: this.newItem.today,
      produced: this.newItem.produced,
      produced_exactly: this.newItem.produced_exactly,
      is_concept: this.newItem.is_concept,
      is_group: this.newItem.is_group,
      lat: this.newItem.lat,
      lng: this.newItem.lng
    };

    this.api
      .request<void>('POST', 'item', {
        body: data,
        observe: 'response'
      })
      .pipe(
        catchError(response => {
          this.invalidParams = response.error.invalid_params;
          this.loading--;

          return EMPTY;
        }),
        switchMap(response =>
          this.itemService.getItemByLocation(
            response.headers.get('Location'),
            {}
          )
        ),
        switchMap(item => {
          const promises: Observable<any>[] = [
            this.itemService.setItemVehicleTypes(item.id, this.vehicleTypeIDs),
            this.api.request<void>('POST', 'item-parent', {body: {
              parent_id: this.item.id,
              item_id: item.id
            }})
          ];

          for (const child of this.childs) {
            if (child.selected) {
              promises.push(
                this.api.request<void>(
                  'PUT',
                  'item-parent/' + child.item_id + '/' + child.parent_id,
                  {body: {
                    parent_id: item.id
                  }}
                )
              );
            }
          }

          return forkJoin(promises);
        })
      )
      .subscribe(
        () => {
          this.loading--;
          if (localStorage) {
            localStorage.setItem('last_item', this.item.id.toString());
          }
          this.router.navigate(['/moder/items/item', this.item.id], {
            queryParams: {
              tab: 'catalogue'
            }
          });
        },
        response => {
          this.invalidParams = response.error.invalid_params;
          this.loading--;
        }
      );
  }
}
