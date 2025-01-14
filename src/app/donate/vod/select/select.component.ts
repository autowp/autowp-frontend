import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {
  APIItem,
  APIItemList,
  GetItemParentsRequest,
  GetItemParentsResponse,
  ItemFields,
  ItemListOptions,
  ItemParent,
  ItemParentCacheListOptions,
  ItemParentListOptions,
  ItemsRequest,
  Pages,
} from '@grpc/spec.pb';
import {ItemRequest, ItemType} from '@grpc/spec.pb';
import {ItemsClient} from '@grpc/spec.pbsc';
import {LanguageService} from '@services/language';
import {PageEnvService} from '@services/page-env.service';
import {combineLatest, Observable, of, Subscription} from 'rxjs';
import {debounceTime, distinctUntilChanged, map, switchMap} from 'rxjs/operators';

import {chunk} from '../../../chunk';
import {PaginatorComponent} from '../../../paginator/paginator/paginator.component';
import {DonateVodSelectItemComponent} from './item/item.component';

@Component({
  imports: [RouterLink, DonateVodSelectItemComponent, PaginatorComponent],
  selector: 'app-donate-vod-select',
  templateUrl: './select.component.html',
})
export class DonateVodSelectComponent implements OnDestroy, OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly pageEnv = inject(PageEnvService);
  private readonly itemsClient = inject(ItemsClient);
  private readonly languageService = inject(LanguageService);

  private querySub?: Subscription;
  protected page: number = 0;
  protected brands: APIItem[][] = [];
  protected paginator: null | Pages = null;
  protected brand: APIItem | null = null;
  protected vehicles: ItemParent[] = [];
  protected concepts: ItemParent[] = [];
  protected loading = 0;
  protected conceptsExpanded = false;

  private readonly select$: Observable<null | {
    brand: null | {
      brand: APIItem;
      concepts: GetItemParentsResponse;
      vehicles: GetItemParentsResponse;
    };
    items: APIItemList | null;
  }> = this.route.queryParamMap.pipe(
    map((params) => ({
      anonymous: !!params.get('anonymous'),
      brand_id: parseInt(params.get('brand_id') ?? '', 10),
      date: params.get('date'),
      page: parseInt(params.get('page') ?? '', 10),
    })),
    distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
    debounceTime(30),
    switchMap((params) => {
      this.page = params.page || 1;
      const brandID = params.brand_id;

      return combineLatest([
        brandID
          ? of(null)
          : this.itemsClient.list(
              new ItemsRequest({
                fields: new ItemFields({nameOnly: true}),
                language: this.languageService.language,
                limit: 500,
                options: new ItemListOptions({
                  typeId: ItemType.ITEM_TYPE_BRAND,
                }),
                page: this.page,
              }),
            ),
        brandID
          ? this.itemsClient.item(new ItemRequest({id: '' + brandID, language: this.languageService.language})).pipe(
              switchMap((brand) =>
                combineLatest([
                  this.itemsClient.getItemParents(
                    new GetItemParentsRequest({
                      language: this.languageService.language,
                      options: new ItemParentListOptions({
                        item: new ItemListOptions({
                          typeId: ItemType.ITEM_TYPE_VEHICLE,
                        }),
                        parentId: brand.id,
                      }),
                      order: GetItemParentsRequest.Order.AUTO,
                    }),
                  ),
                  this.itemsClient.getItemParents(
                    new GetItemParentsRequest({
                      language: this.languageService.language,
                      options: new ItemParentListOptions({
                        item: new ItemListOptions({
                          isConcept: true,
                          typeId: ItemType.ITEM_TYPE_VEHICLE,
                        }),
                        itemParentCacheItemByChild: new ItemParentCacheListOptions({
                          parentId: brand.id,
                        }),
                        parentId: brand.id,
                      }),
                      order: GetItemParentsRequest.Order.AUTO,
                    }),
                  ),
                ]).pipe(map(([vehicles, concepts]) => ({brand, concepts, vehicles}))),
              ),
            )
          : of(null),
      ]);
    }),
    map(([items, brand]) => ({brand, items})),
  );

  ngOnInit(): void {
    setTimeout(() => this.pageEnv.set({pageId: 196}), 0);

    this.querySub = this.select$.subscribe((r) => {
      const brand = r?.brand;
      const items = r?.items;
      if (brand) {
        this.brand = brand.brand;
        this.vehicles = brand.vehicles.items || [];
        this.concepts = brand.concepts.items || [];
        this.brands = [];
        this.paginator = null;
      } else {
        this.brand = null;
        this.vehicles = [];
        this.concepts = [];
        this.brands = chunk(items?.items || [], 6);
        this.paginator = items?.paginator ? items?.paginator : null;
      }
    });
  }

  protected toggleConcepts() {
    this.conceptsExpanded = !this.conceptsExpanded;
    return false;
  }

  ngOnDestroy(): void {
    if (this.querySub) {
      this.querySub.unsubscribe();
    }
  }
}
