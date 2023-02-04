import {Component, OnInit} from '@angular/core';
import {APIService} from '../../../../services/api.service';
import {ItemService, APIItem} from '../../../../services/item';
import {Router, ActivatedRoute} from '@angular/router';
import {EMPTY} from 'rxjs';
import {PageEnvService} from '../../../../services/page-env.service';
import {ToastsService} from '../../../../toasts/toasts.service';
import {catchError, distinctUntilChanged, map, shareReplay, switchMap} from 'rxjs/operators';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-moder-items-item-select-parent',
  templateUrl: './select-parent.component.html',
})
export class ModerItemsItemSelectParentComponent implements OnInit {
  public tab$ = this.route.queryParamMap.pipe(
    map((params) => params.get('tab') || 'catalogue'),
    distinctUntilChanged(),
    shareReplay(1)
  );

  public itemID$ = this.route.paramMap.pipe(
    map((params) => parseInt(params.get('id'), 10)),
    map((itemID) => (itemID ? itemID : 0)),
    distinctUntilChanged(),
    shareReplay(1)
  );

  public item$ = this.itemID$.pipe(
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

  public showCatalogueTab$ = this.item$.pipe(map((item) => [1, 2, 5].includes(item.item_type_id)));
  public showBrandsTab$ = this.item$.pipe(map((item) => [1, 2, 5].includes(item.item_type_id)));
  public showTwinsTab$ = this.item$.pipe(map((item) => item.item_type_id === 1));
  public showFactoriesTab$ = this.item$.pipe(map((item) => [1, 2].includes(item.item_type_id)));

  constructor(
    private api: APIService,
    private itemService: ItemService,
    private router: Router,
    private route: ActivatedRoute,
    private pageEnv: PageEnvService,
    private toastService: ToastsService
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.pageEnv.set({
        layout: {isAdminPage: true},
        pageId: 144,
      });
    }, 0);
  }

  public select(itemID: number, parent: APIItem) {
    this.api
      .request<void>('POST', 'item-parent', {
        body: {
          item_id: itemID,
          parent_id: parent.id,
        },
      })
      .subscribe({
        next: () => {
          this.router.navigate(['/moder/items/item', itemID], {
            queryParams: {
              tab: 'catalogue',
            },
          });
        },
        error: (response: unknown) => this.toastService.handleError(response),
      });

    return false;
  }
}
