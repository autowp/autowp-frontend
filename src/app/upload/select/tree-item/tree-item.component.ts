import {Component, Input} from '@angular/core';
import {APIItemParent, ItemParentService} from '../../../services/item-parent';
import {ToastsService} from '../../../toasts/toasts.service';
import {BehaviorSubject, EMPTY, Observable} from 'rxjs';
import {catchError, map, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-upload-select-tree-item',
  templateUrl: './tree-item.component.html',
})
export class UploadSelectTreeItemComponent {
  @Input() set item(item: APIItemParent) {
    this.item$.next(item);
  }
  public item$ = new BehaviorSubject<APIItemParent>(null);

  public open = false;

  public childs$: Observable<APIItemParent[]> = this.item$.pipe(
    switchMap((item) =>
      this.itemParentService.getItems({
        limit: 500,
        fields: 'item.name_html,item.childs_count',
        parent_id: item.item_id,
        order: 'type_auto',
      })
    ),
    catchError((response) => {
      this.toastService.response(response);
      return EMPTY;
    }),
    map((response) => response.items)
  );

  constructor(private itemParentService: ItemParentService, private toastService: ToastsService) {}
}
