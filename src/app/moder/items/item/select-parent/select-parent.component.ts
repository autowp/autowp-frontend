import {HttpErrorResponse} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {APIService} from '@services/api.service';
import {APIItem, ItemService} from '@services/item';
import {PageEnvService} from '@services/page-env.service';
import {EMPTY} from 'rxjs';
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

  protected readonly itemID$ = this.route.paramMap.pipe(
    map((params) => parseInt(params.get('id'), 10)),
    map((itemID) => (itemID ? itemID : 0)),
    distinctUntilChanged(),
    shareReplay(1)
  );

  protected readonly item$ = this.itemID$.pipe(
    switchMap((itemID) =>
      this.itemService.getItem$(itemID, {
        fields: 'name_text,name_html',
      })
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

  protected readonly showCatalogueTab$ = this.item$.pipe(map((item) => [1, 2, 5].includes(item.item_type_id)));
  protected readonly showBrandsTab$ = this.item$.pipe(map((item) => [1, 2, 5].includes(item.item_type_id)));
  protected readonly showTwinsTab$ = this.item$.pipe(map((item) => item.item_type_id === 1));
  protected readonly showFactoriesTab$ = this.item$.pipe(map((item) => [1, 2].includes(item.item_type_id)));

  constructor(
    private readonly api: APIService,
    private readonly itemService: ItemService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly pageEnv: PageEnvService,
    private readonly toastService: ToastsService
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.pageEnv.set({
        layout: {isAdminPage: true},
        pageId: 144,
      });
    }, 0);
  }

  protected select(itemID: number, parent: APIItem) {
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
