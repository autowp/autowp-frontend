import {Component, EventEmitter, Input, Output} from '@angular/core';
import {BehaviorSubject, EMPTY, Observable} from 'rxjs';
import {APIItem, ItemService} from '../../../../../services/item';
import {catchError, distinctUntilChanged, map, shareReplay, switchMap} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';
import {ToastsService} from '../../../../../toasts/toasts.service';
import {APIPaginator} from '../../../../../services/api.service';

@Component({
  selector: 'app-moder-items-item-select-parent-factories',
  templateUrl: './factories.component.html',
})
export class ModerItemsItemSelectParentFactoriesComponent {
  @Output() selected = new EventEmitter<APIItem>();

  @Input() set itemID(value: number) {
    this.itemID$.next(value);
  }
  public itemID$ = new BehaviorSubject<number>(null);

  public page$ = this.route.queryParamMap.pipe(
    map((params) => parseInt(params.get('page'), 10)),
    map((page) => (page ? page : 0)),
    distinctUntilChanged(),
    shareReplay(1)
  );

  public factories$: Observable<{paginator: APIPaginator; items: APIItem[]}> = this.page$.pipe(
    switchMap((page) =>
      this.itemService.getItems$({
        type_id: 6,
        limit: 100,
        fields: 'name_html',
        page,
      })
    ),
    catchError((error: unknown) => {
      this.toastService.handleError(error);
      return EMPTY;
    })
  );

  constructor(private itemService: ItemService, private route: ActivatedRoute, private toastService: ToastsService) {}

  public onSelect(item: APIItem) {
    this.selected.emit(item);
    return false;
  }
}
