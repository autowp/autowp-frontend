import {AsyncPipe} from '@angular/common';
import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {RouterLink} from '@angular/router';
import {APIItem, UpdateItemRequest} from '@grpc/spec.pb';
import {ItemFields, ItemRequest} from '@grpc/spec.pb';
import {ItemsClient} from '@grpc/spec.pbsc';
import {FieldMask} from '@ngx-grpc/well-known-types';
import {ACLService, Privilege, Resource} from '@services/acl.service';
import {LanguageService} from '@services/language';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {shareReplay, switchMap} from 'rxjs/operators';

import {ToastsService} from '../../../toasts/toasts.service';

@Component({
  imports: [RouterLink, AsyncPipe],
  selector: 'app-cars-specifications-editor-engine',
  templateUrl: './engine.component.html',
})
export class CarsSpecificationsEditorEngineComponent {
  readonly #acl = inject(ACLService);
  readonly #itemsClient = inject(ItemsClient);
  readonly #toastService = inject(ToastsService);
  readonly #languageService = inject(LanguageService);

  @Input() set item(item: APIItem) {
    this.item$.next(item);
  }
  protected readonly item$ = new BehaviorSubject<APIItem | null>(null);

  @Output() changed = new EventEmitter<void>();
  protected readonly isAllowedEditEngine$ = this.#acl
    .isAllowed$(Resource.SPECIFICATIONS, Privilege.EDIT_ENGINE)
    .pipe(shareReplay({bufferSize: 1, refCount: false}));

  protected readonly engine$: Observable<APIItem | null> = this.item$.pipe(
    switchMap((item) => {
      if (!item?.engineItemId || item?.engineItemId === '0') {
        return of(null);
      }

      return this.#itemsClient.item(
        new ItemRequest({
          fields: new ItemFields({nameHtml: true}),
          id: item.engineItemId,
          language: this.#languageService.language,
        }),
      );
    }),
    shareReplay({bufferSize: 1, refCount: false}),
  );
  protected loading = 0;

  private setEngineID(item: APIItem, value: string, inherited: boolean) {
    this.#itemsClient
      .updateItem(
        new UpdateItemRequest({
          item: new APIItem({
            engineInherit: inherited,
            engineItemId: value,
            id: item.id,
          }),
          updateMask: new FieldMask({paths: ['engine_inherit', 'engine_item_id']}),
        }),
      )
      .subscribe({
        error: (response: unknown) => this.#toastService.handleError(response),
        next: () => this.changed.emit(),
      });
  }

  protected inheritEngine(item: APIItem) {
    this.setEngineID(item, '0', true);
  }

  protected cancelInheritance(item: APIItem) {
    this.setEngineID(item, '0', false);
  }
}
