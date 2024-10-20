import {AsyncPipe} from '@angular/common';
import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {PictureItemType} from '@grpc/spec.pb';
import {APIItemParent, ItemParentService} from '@services/item-parent';
import {BehaviorSubject, EMPTY} from 'rxjs';
import {switchMap} from 'rxjs/operators';

import {PictureItemMoveSelection} from '../move.component';

@Component({
  imports: [AsyncPipe],
  selector: 'app-moder-picture-move-item',
  standalone: true,
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
  templateUrl: './item.component.html',
})
export class ModerPictureMoveItemComponent {
  private readonly itemParentService = inject(ItemParentService);

  @Input() set item(item: APIItemParent) {
    this.item$.next(item);
  }
  protected readonly item$ = new BehaviorSubject<APIItemParent | null>(null);

  @Output() readonly selected = new EventEmitter<PictureItemMoveSelection>();

  protected readonly childs$ = this.item$.pipe(
    switchMap((item) =>
      item
        ? this.itemParentService.getItems$({
            fields: 'item.name_html,item.childs_count',
            limit: 500,
            parent_id: item.item_id,
          })
        : EMPTY,
    ),
  );

  protected readonly PictureItemType = PictureItemType;

  protected toggleItem(item: APIItemParent) {
    item.expanded = !item.expanded;
    return false;
  }

  protected selectItem(selection: PictureItemMoveSelection) {
    this.selected.emit(selection);
    return false;
  }
}
