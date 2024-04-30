import {Component, Input} from '@angular/core';
import {APIItem, ItemFields, ListItemsRequest} from '@grpc/spec.pb';
import {ItemsClient} from '@grpc/spec.pbsc';
import {LanguageService} from '@services/language';
import {BehaviorSubject, EMPTY, Observable} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-moder-items-item-vehicles',
  templateUrl: './vehicles.component.html',
})
export class ModerItemsItemVehiclesComponent {
  @Input() set itemId(item: string) {
    this.itemId$.next(item);
  }
  private readonly itemId$ = new BehaviorSubject<null | string>(null);

  protected readonly engineVehicles$: Observable<APIItem[]> = this.itemId$.pipe(
    switchMap((itemId) =>
      itemId
        ? this.itemsClient.list(
            new ListItemsRequest({
              engineId: itemId,
              fields: new ItemFields({nameHtml: true}),
              language: this.languageService.language,
              limit: 100,
            }),
          )
        : EMPTY,
    ),
    map((response) => (response.items ? response.items : [])),
  );

  constructor(
    private readonly itemsClient: ItemsClient,
    private readonly languageService: LanguageService,
  ) {}
}
