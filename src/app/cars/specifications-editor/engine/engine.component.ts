import {AsyncPipe} from '@angular/common';
import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {RouterLink} from '@angular/router';
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
  imports: [RouterLink, AsyncPipe],
  selector: 'app-cars-specifications-editor-engine',
  standalone: true,
  templateUrl: './engine.component.html',
})
export class CarsSpecificationsEditorEngineComponent {
  private readonly acl = inject(ACLService);
  private readonly itemsClient = inject(ItemsClient);
  private readonly api = inject(APIService);
  private readonly toastService = inject(ToastsService);
  private readonly languageService = inject(LanguageService);

  @Input() set item(item: APIItem) {
    this.item$.next(item);
  }
  protected readonly item$ = new BehaviorSubject<APIItem | null>(null);

  @Output() changed = new EventEmitter<void>();
  protected readonly isAllowedEditEngine$ = this.acl
    .isAllowed$(Resource.SPECIFICATIONS, Privilege.EDIT_ENGINE)
    .pipe(shareReplay(1));

  protected readonly engine$: Observable<GRPCAPIItem | null> = this.item$.pipe(
    switchMap((item) => {
      if (!item?.engine_id) {
        return of(null);
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
