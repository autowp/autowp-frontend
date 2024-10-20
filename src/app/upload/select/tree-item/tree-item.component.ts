import {AsyncPipe} from '@angular/common';
import {Component, inject, Input} from '@angular/core';
import {RouterLink} from '@angular/router';
import {APIItemParent, ItemParentService} from '@services/item-parent';
import {BehaviorSubject, EMPTY, Observable} from 'rxjs';
import {catchError, map, switchMap} from 'rxjs/operators';

import {ToastsService} from '../../../toasts/toasts.service';

@Component({
  imports: [RouterLink, AsyncPipe],
  selector: 'app-upload-select-tree-item',
  standalone: true,
  templateUrl: './tree-item.component.html',
})
export class UploadSelectTreeItemComponent {
  private readonly itemParentService = inject(ItemParentService);
  private readonly toastService = inject(ToastsService);

  @Input() set item(item: APIItemParent) {
    this.item$.next(item);
  }
  protected readonly item$ = new BehaviorSubject<APIItemParent | null>(null);

  protected open = false;

  protected readonly childs$: Observable<APIItemParent[]> = this.item$.pipe(
    switchMap((item) =>
      item
        ? this.itemParentService.getItems$({
            fields: 'item.name_html,item.childs_count',
            limit: 500,
            order: 'type_auto',
            parent_id: item.item_id,
          })
        : EMPTY,
    ),
    catchError((response: unknown) => {
      this.toastService.handleError(response);
      return EMPTY;
    }),
    map((response) => response.items),
  );
}
