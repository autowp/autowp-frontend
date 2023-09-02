import {HttpErrorResponse} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {APIItem as GRPCAPIItem, ItemFields, ItemRequest, ItemType} from '@grpc/spec.pb';
import {ItemsClient} from '@grpc/spec.pbsc';
import {APIService} from '@services/api.service';
import {APIItem} from '@services/item';
import {LanguageService} from '@services/language';
import {PageEnvService} from '@services/page-env.service';
import {EMPTY, Observable} from 'rxjs';
import {catchError, distinctUntilChanged, map, shareReplay, switchMap} from 'rxjs/operators';

import {ToastsService} from '../../../../toasts/toasts.service';

@Component({
  selector: 'app-moder-items-item-select-parent',
  templateUrl: './select-parent.component.html',
})
export class ModerItemsItemSelectParentComponent implements OnInit {
  protected readonly tab$ = this.route.queryParamMap.pipe(
    map((params) => params.get('tab') || 'catalogue'),
    distinctUntilChanged(),
    shareReplay(1)
  );

  protected readonly itemID$: Observable<string> = this.route.paramMap.pipe(
    map((params) => params.get('id')),
    map((itemID) => (itemID ? itemID : '')),
    distinctUntilChanged(),
    shareReplay(1)
  );

  protected readonly item$: Observable<GRPCAPIItem> = this.itemID$.pipe(
    switchMap((itemID) =>
      this.itemsClient.item(
        new ItemRequest({
          fields: new ItemFields({
            nameHtml: true,
            nameText: true,
          }),
          id: '' + itemID,
          language: this.languageService.language,
        })
      )
    ),
    catchError((error: unknown) => {
      if (error instanceof HttpErrorResponse && error.status === 404) {
        this.router.navigate(['/error-404'], {
          skipLocationChange: true,
        });
        return EMPTY;
      }
      this.toastService.handleError(error);
      return EMPTY;
    }),
    shareReplay(1)
  );

  protected readonly showCatalogueTab$ = this.item$.pipe(
    map((item) =>
      [ItemType.ITEM_TYPE_BRAND, ItemType.ITEM_TYPE_ENGINE, ItemType.ITEM_TYPE_VEHICLE].includes(item.itemTypeId)
    )
  );
  protected readonly showBrandsTab$ = this.item$.pipe(
    map((item) =>
      [ItemType.ITEM_TYPE_BRAND, ItemType.ITEM_TYPE_ENGINE, ItemType.ITEM_TYPE_VEHICLE].includes(item.itemTypeId)
    )
  );
  protected readonly showTwinsTab$ = this.item$.pipe(map((item) => item.itemTypeId === ItemType.ITEM_TYPE_VEHICLE));
  protected readonly showFactoriesTab$ = this.item$.pipe(
    map((item) => [ItemType.ITEM_TYPE_ENGINE, ItemType.ITEM_TYPE_VEHICLE].includes(item.itemTypeId))
  );

  constructor(
    private readonly api: APIService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly pageEnv: PageEnvService,
    private readonly toastService: ToastsService,
    private readonly itemsClient: ItemsClient,
    private readonly languageService: LanguageService
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.pageEnv.set({
        layout: {isAdminPage: true},
        pageId: 144,
      });
    }, 0);
  }

  protected select(itemID: string, parent: APIItem) {
    this.api
      .request<void>('POST', 'item-parent', {
        body: {
          item_id: itemID,
          parent_id: parent.id,
        },
      })
      .subscribe({
        error: (response: unknown) => this.toastService.handleError(response),
        next: () => {
          this.router.navigate(['/moder/items/item', itemID], {
            queryParams: {
              tab: 'catalogue',
            },
          });
        },
      });

    return false;
  }
}
