import {Component, inject, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {
  APIItem,
  APIItemList,
  APIItem as GRPCAPIItem,
  ItemFields,
  ItemListOptions,
  ItemRequest,
  ItemType,
  ListItemsRequest,
  Pages,
  ItemParent,
  GetItemParentsRequest,
  ItemParentListOptions,
  ItemParentFields,
} from '@grpc/spec.pb';
import {ItemsClient} from '@grpc/spec.pbsc';
import {LanguageService} from '@services/language';
import {PageEnvService} from '@services/page-env.service';
import {BehaviorSubject, combineLatest, EMPTY, forkJoin, Observable, of} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, map, switchMap, tap} from 'rxjs/operators';

import {chunk} from '../../chunk';
import {PaginatorComponent} from '../../paginator/paginator/paginator.component';
import {ToastsService} from '../../toasts/toasts.service';
import {UploadSelectTreeItemComponent} from './tree-item/tree-item.component';

import Order = ListItemsRequest.Order;

@Component({
  imports: [FormsModule, RouterLink, PaginatorComponent, UploadSelectTreeItemComponent],
  selector: 'app-upload-select',
  templateUrl: './select.component.html',
})
export class UploadSelectComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly pageEnv = inject(PageEnvService);
  private readonly toastService = inject(ToastsService);
  private readonly itemsClient = inject(ItemsClient);
  private readonly languageService = inject(LanguageService);

  protected brand: {
    concepts: ItemParent[];
    engines: ItemParent[];
    item: GRPCAPIItem;
    vehicles: ItemParent[];
  } | null = null;
  protected brands: APIItem[][] = [];
  protected paginator: Pages | undefined;
  protected search = '';
  protected readonly search$ = new BehaviorSubject<string>('');
  protected loading = 0;
  protected conceptsOpen = false;

  protected onSearchInput() {
    this.search$.next(this.search);
  }

  ngOnInit(): void {
    setTimeout(() => this.pageEnv.set({pageId: 30}), 0);

    combineLatest([
      this.search$.pipe(
        map((value) => value.trim()),
        distinctUntilChanged(),
        debounceTime(50),
      ),
      this.route.queryParamMap.pipe(
        map((params) => ({
          brandId: params.get('brand_id'),
          page: parseInt(params.get('page') ?? '', 10),
        })),
      ),
    ])
      .pipe(
        map(([search, query]) => ({brandId: query.brandId, page: query.page, search})),
        distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
        tap(() => {
          this.loading = 1;
          this.brand = null;
        }),
        switchMap((params) => {
          const brandId = params.brandId;
          const page = params.page;

          return forkJoin([
            brandId ? this.brandObservable$(brandId) : of(null),
            brandId ? of(null) : this.brandsObservable$(page, params.search),
          ]);
        }),
        tap(() => (this.loading = 0)),
      )
      .subscribe(([brand, brands]) => {
        if (brands) {
          this.brands = chunk(brands.items ? brands.items : [], 6);
          this.paginator = brands.paginator;
        }
        if (brand) {
          this.brand = brand;
        }
      });
  }

  private brandsObservable$(page: number, search: string): Observable<APIItemList> {
    return this.itemsClient
      .list(
        new ListItemsRequest({
          fields: new ItemFields({
            nameOnly: true,
          }),
          language: this.languageService.language,
          limit: 500,
          options: new ItemListOptions({
            name: search ? '%' + search + '%' : undefined,
            typeId: ItemType.ITEM_TYPE_BRAND,
          }),
          order: Order.NAME,
          page,
        }),
      )
      .pipe(
        catchError((err: unknown) => {
          this.toastService.handleError(err);
          return EMPTY;
        }),
      );
  }

  private brandObservable$(brandId: string): Observable<{
    concepts: ItemParent[];
    engines: ItemParent[];
    item: GRPCAPIItem;
    vehicles: ItemParent[];
  }> {
    return this.itemsClient.item(new ItemRequest({id: brandId, language: this.languageService.language})).pipe(
      catchError(() => {
        this.router.navigate(['/error-404'], {
          skipLocationChange: true,
        });
        return EMPTY;
      }),
      switchMap((item) => this.brandItemsObservable(item)),
      map(([item, vehicles, engines, concepts]) => ({concepts, engines, item, vehicles})),
    );
  }

  private brandItemsObservable(item: GRPCAPIItem) {
    return forkJoin([
      of(item),
      this.itemsClient
        .getItemParents(
          new GetItemParentsRequest({
            language: this.languageService.language,
            options: new ItemParentListOptions({
              parentId: item.id,
              item: new ItemListOptions({
                typeId: ItemType.ITEM_TYPE_VEHICLE,
                isNotConcept: true,
              }),
            }),
            limit: 500,
            order: GetItemParentsRequest.Order.AUTO,
            fields: new ItemParentFields({
              item: new ItemFields({
                nameHtml: true,
                childsCount: true,
              }),
            }),
          }),
        )
        .pipe(
          map((response) => response.items || []),
          catchError((err: unknown) => {
            this.toastService.handleError(err);
            return EMPTY;
          }),
        ),
      this.itemsClient
        .getItemParents(
          new GetItemParentsRequest({
            language: this.languageService.language,
            options: new ItemParentListOptions({
              parentId: item.id,
              item: new ItemListOptions({
                typeId: ItemType.ITEM_TYPE_ENGINE,
                isNotConcept: true,
              }),
            }),
            limit: 500,
            order: GetItemParentsRequest.Order.AUTO,
            fields: new ItemParentFields({
              item: new ItemFields({
                nameHtml: true,
                childsCount: true,
              }),
            }),
          }),
        )
        .pipe(
          map((response) => response.items || []),
          catchError((err: unknown) => {
            this.toastService.handleError(err);
            return EMPTY;
          }),
        ),
      this.itemsClient
        .getItemParents(
          new GetItemParentsRequest({
            language: this.languageService.language,
            options: new ItemParentListOptions({
              parentId: item.id,
              item: new ItemListOptions({
                isConcept: true,
              }),
            }),
            limit: 500,
            order: GetItemParentsRequest.Order.AUTO,
            fields: new ItemParentFields({
              item: new ItemFields({
                nameHtml: true,
                childsCount: true,
              }),
            }),
          }),
        )
        .pipe(
          map((response) => response.items || []),
          catchError((err: unknown) => {
            this.toastService.handleError(err);
            return EMPTY;
          }),
        ),
    ]);
  }
}
