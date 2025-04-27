import {AsyncPipe} from '@angular/common';
import {ChangeDetectionStrategy, Component, inject, input} from '@angular/core';
import {toObservable} from '@angular/core/rxjs-interop';
import {RouterLink} from '@angular/router';
import {APIItem, ItemFields, ItemListOptions, ItemsRequest} from '@grpc/spec.pb';
import {ItemsClient} from '@grpc/spec.pbsc';
import {LanguageService} from '@services/language';
import {EMPTY, Observable} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, AsyncPipe],
  selector: 'app-moder-items-item-vehicles',
  templateUrl: './vehicles.component.html',
})
export class ModerItemsItemVehiclesComponent {
  readonly #itemsClient = inject(ItemsClient);
  readonly #languageService = inject(LanguageService);

  readonly itemId = input.required<string>();

  protected readonly engineVehicles$: Observable<APIItem[]> = toObservable(this.itemId).pipe(
    switchMap((itemId) =>
      itemId
        ? this.#itemsClient.list(
            new ItemsRequest({
              fields: new ItemFields({nameHtml: true}),
              language: this.#languageService.language,
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
