import { Component, OnInit, OnDestroy } from '@angular/core';
import { APIPaginator } from '../../../services/api.service';
import {
  APIItem,
  ItemService,
  APIItemsGetResponse
} from '../../../services/item';
import { chunk } from '../../../chunk';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription, combineLatest, of } from 'rxjs';
import {
  ItemParentService,
  APIItemParent,
  APIItemParentGetResponse
} from '../../../services/item-parent';
import { PageEnvService } from '../../../services/page-env.service';
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  finalize, map
} from 'rxjs/operators';

@Component({
  selector: 'app-donate-vod-select',
  templateUrl: './select.component.html'
})
export class DonateVodSelectComponent implements OnInit, OnDestroy {
  private querySub: Subscription;
  public page: number;
  public brands: APIItem[][];
  public paginator: APIPaginator;
  public brand: APIItem;
  public vehicles: APIItemParent[];
  public vehiclesPaginator: APIPaginator;
  public concepts: APIItemParent[];
  private date: string;
  private anonymous: boolean;
  public loading = 0;
  public conceptsExpanded = false;

  constructor(
    private itemService: ItemService,
    private router: Router,
    private route: ActivatedRoute,
    private itemParentService: ItemParentService,
    private pageEnv: PageEnvService
  ) {}

  public selectItem(itemID: number) {
    this.router.navigate(['/donate/vod'], {
      queryParams: {
        item_id: itemID,
        date: this.date,
        anonymous: this.anonymous ? 1 : null
      }
    });
  }

  ngOnInit(): void {
    setTimeout(
      () =>
        this.pageEnv.set({
          layout: {
            needRight: false
          },
          nameTranslated: $localize `Donate`,
          pageId: 196
        }),
      0
    );

    this.querySub = this.route.queryParamMap
      .pipe(
        map(params => ({
          page: parseInt(params.get('page'), 10),
          date: params.get('date'),
          brand_id: parseInt(params.get('brand_id'), 10),
          anonymous: !!params.get('anonymous')
        })),
        distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
        debounceTime(30),
        switchMap(params => {
          this.page = params.page || 1;
          this.date = params.date;
          this.anonymous = params.anonymous;
          const brandID = params.brand_id;

          this.loading++;
          this.loading++;
          return combineLatest([
            (brandID
              ? of(null as APIItemsGetResponse)
              : this.itemService.getItems({
                  type_id: 5,
                  limit: 500,
                  fields: 'name_only',
                  page: this.page
                })
            ).pipe(
              finalize(() => {
                this.loading--;
              })
            ),
            (brandID
              ? this.itemService.getItem(brandID).pipe(
                  switchMap(
                    brand =>
                      combineLatest(
                        [
                          this.itemParentService.getItems({
                            item_type_id: 1,
                            parent_id: brand.id,
                            fields:
                              'item.name_html,item.childs_count,item.is_compiles_item_of_day',
                            limit: 500,
                            page: 1
                          }),
                          this.itemParentService.getItems({
                            item_type_id: 1,
                            concept: true,
                            ancestor_id: brand.id,
                            fields:
                              'item.name_html,item.childs_count,item.is_compiles_item_of_day',
                            limit: 500,
                            page: 1
                          })
                        ]
                      ).pipe(
                        map(([vehicles, concepts]) => ({brand, vehicles, concepts}))
                      )
                  )
                )
              : of(null as {
                  brand: APIItem;
                  vehicles: APIItemParentGetResponse;
                  concepts: APIItemParentGetResponse;
                })
            ).pipe(
              finalize(() => {
                this.loading--;
              })
            )
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

  public toggleConcepts() {
    this.conceptsExpanded = !this.conceptsExpanded;
    return false;
  }

  ngOnDestroy(): void {
    this.querySub.unsubscribe();
  }
}
