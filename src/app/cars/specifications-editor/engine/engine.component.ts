import {Component, EventEmitter, Input, Output} from '@angular/core';
import {APIItem as GRPCAPIItem} from '@grpc/spec.pb';
import {ItemFields, ItemRequest} from '@grpc/spec.pb';
import {ItemsClient} from '@grpc/spec.pbsc';
import {ACLService, Privilege, Resource} from '@services/acl.service';
import {APIService} from '@services/api.service';
import {APIItem} from '@services/item';
import {LanguageService} from '@services/language';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {shareReplay, switchMap} from 'rxjs/operators';

import {ToastsService} from '../../../toasts/toasts.service';

@Component({
  selector: 'app-cars-specifications-editor-engine',
  templateUrl: './engine.component.html',
})
export class CarsSpecificationsEditorEngineComponent {
  @Input() set item(item: APIItem) {
    this.item$.next(item);
  }
  protected readonly item$ = new BehaviorSubject<APIItem>(null);

  @Output() changed = new EventEmitter<void>();
  protected readonly isAllowedEditEngine$ = this.acl
    .isAllowed$(Resource.SPECIFICATIONS, Privilege.EDIT_ENGINE)
    .pipe(shareReplay(1));

  protected readonly engine$: Observable<GRPCAPIItem> = this.item$.pipe(
    switchMap((item) => {
      if (!item.engine_id) {
        return of(null as GRPCAPIItem);
      }

      return this.itemsClient.item(
        new ItemRequest({
          fields: new ItemFields({nameHtml: true}),
          id: item.engine_id.toString(),
          language: this.languageService.language,
        }),
      );
    }),
    shareReplay(1),
  );
  protected loading = 0;

  constructor(
    private readonly acl: ACLService,
    private readonly itemsClient: ItemsClient,
    private readonly api: APIService,
    private readonly toastService: ToastsService,
    private readonly languageService: LanguageService,
  ) {}

  private setEngineID(item: APIItem, value: string) {
    this.api
      .request<void>('PUT', 'item/' + item.id, {
        body: {
          engine_id: value,
        },
      })
      .subscribe({
        error: (response: unknown) => this.toastService.handleError(response),
        next: () => this.changed.emit(),
      });
  }

  protected inheritEngine(item: APIItem) {
    this.setEngineID(item, 'inherited');
  }

  protected cancelInheritance(item: APIItem) {
    this.setEngineID(item, '');
  }
}
