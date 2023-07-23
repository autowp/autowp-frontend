import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ItemType} from '@grpc/spec.pb';
import {APIItem, ItemService} from '@services/item';
import {BehaviorSubject, EMPTY} from 'rxjs';
import {catchError, distinctUntilChanged, map, shareReplay, switchMap} from 'rxjs/operators';

import {ToastsService} from '../../../../../toasts/toasts.service';

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
        fields: 'name_html,childs_count',
        limit: 100,
        no_parent: true,
        page,
        type_id: ItemType.ITEM_TYPE_CATEGORY,
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
