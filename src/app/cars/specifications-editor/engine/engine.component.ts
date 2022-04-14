import {Component, EventEmitter, Input, Output} from '@angular/core';
import {APIItem, ItemService} from '../../../services/item';
import {ACLService, Privilege, Resource} from '../../../services/acl.service';
import {ToastsService} from '../../../toasts/toasts.service';
import {APIService} from '../../../services/api.service';
import {shareReplay, switchMap} from 'rxjs/operators';
import {BehaviorSubject, of} from 'rxjs';

@Component({
  selector: 'app-cars-specifications-editor-engine',
  templateUrl: './engine.component.html'
})
export class CarsSpecificationsEditorEngineComponent {
  @Input() set item(item: APIItem) { this.item$.next(item); };
  public item$ = new BehaviorSubject<APIItem>(null);

  @Output() changed = new EventEmitter<void>();
  public isAllowedEditEngine$ = this.acl
    .isAllowed(Resource.SPECIFICATIONS, Privilege.EDIT_ENGINE)
    .pipe(shareReplay(1));
  public engine$ = this.item$.pipe(
    switchMap(item => {
      if (! item.engine_id) {
        return of(null as APIItem);
      }

      return this.itemService.getItem(item.engine_id, {fields: 'name_html,name_text,engine_id'});
    })
  )
  public loading = 0;

  constructor(
    private acl: ACLService,
    private itemService: ItemService,
    private api: APIService,
    private toastService: ToastsService
  ) {}

  private setEngineID(item:APIItem, value: string) {
    this.api
      .request<void>('PUT', 'item/' + item.id, {body: {
        engine_id: value
      }})
      .subscribe(
        () => this.changed.emit(),
        response => this.toastService.response(response)
      );
  }

  public inheritEngine(item:APIItem) {
    this.setEngineID(item, 'inherited');
  }

  public cancelInheritance(item:APIItem) {
    this.setEngineID(item, '');
  }
}
