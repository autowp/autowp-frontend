import {Component, inject, Input} from '@angular/core';
import {APIItem, ItemFields, ItemListOptions, ListItemsRequest} from '@grpc/spec.pb';
import {ItemsClient} from '@grpc/spec.pbsc';
import {LanguageService} from '@services/language';
import {BehaviorSubject, EMPTY, Observable} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-moder-items-item-vehicles',
  templateUrl: './vehicles.component.html',
})
export class ModerItemsItemVehiclesComponent {
  private readonly itemsClient = inject(ItemsClient);
  private readonly languageService = inject(LanguageService);

  @Input() set itemId(item: string) {
    this.itemId$.next(item);
  }
  private readonly itemId$ = new BehaviorSubject<null | string>(null);

  protected readonly engineVehicles$: Observable<APIItem[]> = this.itemId$.pipe(
    switchMap((itemId) =>
      itemId
        ? this.itemsClient.list(
            new ListItemsRequest({
              fields: new ItemFields({nameHtml: true}),
              language: this.languageService.language,
              limit: 100,
              options: new ItemListOptions({
                engineId: itemId,
              }),
            }),
          )
        : EMPTY,
    ),
    map((response) => (response.items ? response.items : [])),
  );
}
