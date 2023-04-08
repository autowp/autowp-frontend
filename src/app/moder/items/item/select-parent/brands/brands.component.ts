import {Component, EventEmitter, Output} from '@angular/core';
import {combineLatest, EMPTY, Observable} from 'rxjs';
import {APIItem, ItemService} from '@services/item';
import {catchError, debounceTime, distinctUntilChanged, map, shareReplay, switchMap, tap} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastsService} from '../../../../../toasts/toasts.service';
import {chunk} from '../../../../../chunk';
import {APIPaginator} from '@services/api.service';
import {ItemType} from '@grpc/spec.pb';

@Component({
  selector: 'app-moder-items-item-select-parent-brands',
  templateUrl: './brands.component.html',
})
export class ModerItemsItemSelectParentBrandsComponent {
  @Output() selected = new EventEmitter<APIItem>();

  public page$ = this.route.queryParamMap.pipe(
    map((params) => parseInt(params.get('page'), 10)),
    map((page) => (page ? page : 0)),
    distinctUntilChanged(),
    shareReplay(1)
  );

  public search$ = this.route.queryParamMap.pipe(
    map((params) => params.get('search')),
    distinctUntilChanged(),
    debounceTime(10)
  );

  public brands$: Observable<{items: APIItem[][]; paginator: APIPaginator}> = combineLatest([
    this.search$.pipe(tap((v) => console.log('search chnaged', v))),
    this.page$.pipe(tap((v) => console.log('page chnaged', v))),
  ]).pipe(
    switchMap(([search, page]) =>
      this.itemService.getItems$({
        type_id: ItemType.ITEM_TYPE_BRAND,
        limit: 500,
        fields: 'name_html',
        name: search ? '%' + search + '%' : null,
        page,
      })
    ),
    catchError((error: unknown) => {
      this.toastService.handleError(error);
      return EMPTY;
    }),
    map((response) => ({
      items: chunk<APIItem>(response.items, 6),
      paginator: response.paginator,
    }))
  );

  constructor(
    private itemService: ItemService,
    private route: ActivatedRoute,
    private toastService: ToastsService,
    private router: Router
  ) {}

  public doSearch(search: string) {
    this.router.navigate([], {
      queryParams: {search},
      queryParamsHandling: 'merge',
    });
  }

  public onSelect(item: APIItem) {
    this.selected.emit(item);
    return false;
  }
}
