import {AsyncPipe} from '@angular/common';
import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {APIItem} from '@grpc/spec.pb';
import {ItemParentService} from '@services/item-parent';
import {BehaviorSubject, combineLatest, EMPTY} from 'rxjs';
import {catchError, distinctUntilChanged, map, switchMap} from 'rxjs/operators';

import {ToastsService} from '../../../../../toasts/toasts.service';
import {ModerItemsItemSelectParentTreeComponent} from '../tree/tree.component';

@Component({
  imports: [ModerItemsItemSelectParentTreeComponent, AsyncPipe],
  selector: 'app-moder-items-item-select-parent-tree-item',
  standalone: true,
  templateUrl: './tree-item.component.html',
})
export class ModerItemsItemSelectParentTreeItemComponent {
  private readonly itemParentService = inject(ItemParentService);
  private readonly toastService = inject(ToastsService);

  @Input() set item(value: APIItem) {
    this.item$.next(value);
  }
  protected readonly item$ = new BehaviorSubject<APIItem | null>(null);

  @Input() set order(value: string) {
    this.order$.next(value);
  }
  protected readonly order$ = new BehaviorSubject<string>('type_auto');

  @Input() disableItemID: string = '';
  @Input() typeID: number = 0;
  @Output() selected = new EventEmitter<string>();

  protected open = false;

  protected readonly childs$ = combineLatest([this.item$, this.order$.pipe(distinctUntilChanged())]).pipe(
    switchMap(([item, order]) =>
      item
        ? this.itemParentService.getItems$({
            fields: '',
            is_group: true,
            limit: 100,
            order,
            parent_id: +item.id,
          })
        : EMPTY,
    ),
    catchError((error: unknown) => {
      this.toastService.handleError(error);
      return EMPTY;
    }),
    map((response) => response.items),
  );

  protected isDisabled(item: APIItem): boolean {
    return item.id === this.disableItemID;
  }

  protected onSelect(itemID: string) {
    this.selected.emit(itemID);
    return false;
  }

  protected toggle(): boolean {
    this.open = !this.open;
    return false;
  }
}
