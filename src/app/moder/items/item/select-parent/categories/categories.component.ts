import {Component, EventEmitter, Input, Output} from '@angular/core';
import {BehaviorSubject, EMPTY} from 'rxjs';
import {APIItem, ItemService} from '@services/item';
import {catchError, distinctUntilChanged, map, shareReplay, switchMap} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';
import {ToastsService} from '../../../../../toasts/toasts.service';
import {ItemType} from '@grpc/spec.pb';

@Component({
  selector: 'app-moder-items-item-select-parent-categories',
  templateUrl: './categories.component.html',
})
export class ModerItemsItemSelectParentCategoriesComponent {
  @Output() selected = new EventEmitter<APIItem>();

  @Input() set itemID(value: number) {
    this.itemID$.next(value);
  }
  protected readonly itemID$ = new BehaviorSubject<number>(null);

  protected readonly page$ = this.route.queryParamMap.pipe(
    map((params) => parseInt(params.get('page'), 10)),
    map((page) => (page ? page : 0)),
    distinctUntilChanged(),
    shareReplay(1)
  );

  protected readonly categories$ = this.page$.pipe(
    switchMap((page) =>
      this.itemService.getItems$({
        type_id: ItemType.ITEM_TYPE_CATEGORY,
        limit: 100,
        fields: 'name_html,childs_count',
        page,
        no_parent: true,
      })
    ),
    catchError((error: unknown) => {
      this.toastService.handleError(error);
      return EMPTY;
    })
  );

  constructor(
    private readonly itemService: ItemService,
    private readonly route: ActivatedRoute,
    private readonly toastService: ToastsService
  ) {}

  protected onSelect(item: APIItem) {
    this.selected.emit(item);
    return false;
  }
}
