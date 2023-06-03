import {Component, EventEmitter, Input, Output} from '@angular/core';
import {BehaviorSubject, EMPTY, Observable} from 'rxjs';
import {APIItem, ItemService} from '@services/item';
import {catchError, distinctUntilChanged, map, shareReplay, switchMap} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';
import {ToastsService} from '../../../../../toasts/toasts.service';
import {APIPaginator} from '@services/api.service';
import {ItemType} from '@grpc/spec.pb';

@Component({
  selector: 'app-moder-items-item-select-parent-factories',
  templateUrl: './factories.component.html',
})
export class ModerItemsItemSelectParentFactoriesComponent {
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

  protected readonly factories$: Observable<{paginator: APIPaginator; items: APIItem[]}> = this.page$.pipe(
    switchMap((page) =>
      this.itemService.getItems$({
        type_id: ItemType.ITEM_TYPE_FACTORY,
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
