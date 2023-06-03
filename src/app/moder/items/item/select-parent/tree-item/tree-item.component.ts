import {Component, Input, EventEmitter, Output} from '@angular/core';
import {catchError, distinctUntilChanged, map, switchMap} from 'rxjs/operators';
import {BehaviorSubject, combineLatest, EMPTY} from 'rxjs';
import {ItemParentService} from '@services/item-parent';
import {ToastsService} from '../../../../../toasts/toasts.service';
import {APIItem} from '@services/item';

@Component({
  selector: 'app-moder-items-item-select-parent-tree-item',
  templateUrl: './tree-item.component.html',
})
export class ModerItemsItemSelectParentTreeItemComponent {
  @Input() set item(value: APIItem) {
    this.item$.next(value);
  }
  protected readonly item$ = new BehaviorSubject<APIItem>(null);

  @Input() set order(value: string) {
    this.order$.next(value);
  }
  protected readonly order$ = new BehaviorSubject<string>('type_auto');

  @Input() disableItemID: number;
  @Input() typeID: number;
  @Output() selected = new EventEmitter<APIItem>();

  protected open = false;

  protected readonly childs$ = combineLatest([this.item$, this.order$.pipe(distinctUntilChanged())]).pipe(
    switchMap(([item, order]) =>
      this.itemParentService.getItems$({
        limit: 100,
        fields: 'item.name_html,item.childs_count',
        parent_id: item.id,
        is_group: true,
        order,
      })
    ),
    catchError((error: unknown) => {
      this.toastService.handleError(error);
      return EMPTY;
    }),
    map((response) => response.items)
  );

  constructor(private readonly itemParentService: ItemParentService, private readonly toastService: ToastsService) {}

  protected isDisabled(item: APIItem): boolean {
    return item.id === this.disableItemID;
  }

  protected onSelect(item: APIItem) {
    this.selected.emit(item);
    return false;
  }

  protected toggle(): boolean {
    this.open = !this.open;
    return false;
  }
}
