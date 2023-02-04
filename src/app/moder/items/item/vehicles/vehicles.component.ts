import {Component, Input} from '@angular/core';
import {APIItem, ItemService} from '../../../../services/item';
import {BehaviorSubject, Observable} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-moder-items-item-vehicles',
  templateUrl: './vehicles.component.html',
})
export class ModerItemsItemVehiclesComponent {
  @Input() set item(item: APIItem) {
    this.item$.next(item);
  }
  private item$ = new BehaviorSubject<APIItem>(null);

  public engineVehicles$: Observable<APIItem[]> = this.item$.pipe(
    switchMap((item) =>
      this.itemService.getItems$({
        engine_id: item.id,
        limit: 100,
        fields: 'name_html',
      })
    ),
    map((response) => response.items)
  );

  constructor(private itemService: ItemService) {}
}
