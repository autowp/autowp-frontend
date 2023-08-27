import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ItemType} from '@grpc/spec.pb';
import {APIPaginator} from '@services/api.service';
import {APIItem, APIItemsGetResponse, ItemService} from '@services/item';
import {APIItemParent, APIItemParentGetResponse, ItemParentService} from '@services/item-parent';
import {PageEnvService} from '@services/page-env.service';
import {Subscription, combineLatest, of} from 'rxjs';
import {debounceTime, distinctUntilChanged, finalize, map, switchMap} from 'rxjs/operators';

import {chunk} from '../../../chunk';

@Component({
  selector: 'app-donate-vod-select',
  templateUrl: './select.component.html',
})
export class DonateVodSelectComponent implements OnInit, OnDestroy {
  private querySub: Subscription;
  protected page: number;
  protected brands: APIItem[][];
  protected paginator: APIPaginator;
  protected brand: APIItem;
  protected vehicles: APIItemParent[];
  protected vehiclesPaginator: APIPaginator;
  protected concepts: APIItemParent[];
  protected loading = 0;
  protected conceptsExpanded = false;

  constructor(
    private readonly itemService: ItemService,
    private readonly route: ActivatedRoute,
    private readonly itemParentService: ItemParentService,
    private readonly pageEnv: PageEnvService
  ) {}

  ngOnInit(): void {
    setTimeout(() => this.pageEnv.set({pageId: 196}), 0);

    this.querySub = this.route.queryParamMap
      .pipe(
        map((params) => ({
          anonymous: !!params.get('anonymous'),
          brand_id: parseInt(params.get('brand_id'), 10),
          date: params.get('date'),
          page: parseInt(params.get('page'), 10),
        })),
        distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
        debounceTime(30),
        switchMap((params) => {
          this.page = params.page || 1;
          const brandID = params.brand_id;

          this.loading++;
          this.loading++;
          return combineLatest([
            (brandID
              ? of(null as APIItemsGetResponse)
              : this.itemService.getItems$({
                  fields: 'name_only',
                  limit: 500,
                  page: this.page,
                  type_id: ItemType.ITEM_TYPE_BRAND,
                })
            ).pipe(
              finalize(() => {
                this.loading--;
              })
            ),
            (brandID
              ? this.itemService.getItem$(brandID).pipe(
                  switchMap((brand) =>
                    combineLatest([
                      this.itemParentService.getItems$({
                        fields: 'item.name_html,item.childs_count,item.is_compiles_item_of_day',
                        item_type_id: ItemType.ITEM_TYPE_VEHICLE,
                        limit: 500,
                        page: 1,
                        parent_id: brand.id,
                      }),
                      this.itemParentService.getItems$({
                        ancestor_id: brand.id,
                        concept: true,
                        fields: 'item.name_html,item.childs_count,item.is_compiles_item_of_day',
                        item_type_id: ItemType.ITEM_TYPE_VEHICLE,
                        limit: 500,
                        page: 1,
                      }),
                    ]).pipe(map(([vehicles, concepts]) => ({brand, concepts, vehicles})))
                  )
                )
              : of(
                  null as {
                    brand: APIItem;
                    concepts: APIItemParentGetResponse;
                    vehicles: APIItemParentGetResponse;
                  }
                )
            ).pipe(
              finalize(() => {
                this.loading--;
              })
            ),
          ]);
        })
      )
      .subscribe(([items, brand]) => {
        if (brand) {
          this.brand = brand.brand;
          this.vehicles = brand.vehicles.items;
          this.vehiclesPaginator = brand.vehicles.paginator;
          this.concepts = brand.concepts.items;
          this.brands = [];
          this.paginator = null;
        } else {
          this.brand = null;
          this.vehicles = [];
          this.vehiclesPaginator = null;
          this.concepts = [];
          this.brands = chunk(items.items, 6);
          this.paginator = items.paginator;
        }
      });
  }

  protected toggleConcepts() {
    this.conceptsExpanded = !this.conceptsExpanded;
    return false;
  }

  ngOnDestroy(): void {
    this.querySub.unsubscribe();
  }
}
