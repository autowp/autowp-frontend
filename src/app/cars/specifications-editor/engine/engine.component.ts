import {Component, EventEmitter, Input, Output} from '@angular/core';
import {APIItem, ItemService} from '@services/item';
import {ACLService, Privilege, Resource} from '@services/acl.service';
import {ToastsService} from '../../../toasts/toasts.service';
import {APIService} from '@services/api.service';
import {shareReplay, switchMap} from 'rxjs/operators';
import {BehaviorSubject, of} from 'rxjs';

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
  protected readonly engine$ = this.item$.pipe(
    switchMap((item) => {
      if (!item.engine_id) {
        return of(null as APIItem);
      }

      return this.itemService.getItem$(item.engine_id, {fields: 'name_html,name_text,engine_id'});
    }),
    shareReplay(1)
  );
  protected loading = 0;

  constructor(
    private readonly acl: ACLService,
    private readonly itemService: ItemService,
    private readonly api: APIService,
    private readonly toastService: ToastsService
  ) {}

  private setEngineID(item: APIItem, value: string) {
    this.api
      .request<void>('PUT', 'item/' + item.id, {
        body: {
          engine_id: value,
        },
      })
      .subscribe({
        next: () => this.changed.emit(),
        error: (response: unknown) => this.toastService.handleError(response),
      });
  }

  protected inheritEngine(item: APIItem) {
    this.setEngineID(item, 'inherited');
  }

  protected cancelInheritance(item: APIItem) {
    this.setEngineID(item, '');
  }
}
