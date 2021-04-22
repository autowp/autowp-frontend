import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {APIItem, ItemService} from '../../../services/item';
import {ACLService, Privilege, Resource} from '../../../services/acl.service';
import {Subscription} from 'rxjs';
import {ToastsService} from '../../../toasts/toasts.service';
import {APIService} from '../../../services/api.service';

@Component({
  selector: 'app-cars-specifications-editor-engine',
  templateUrl: './engine.component.html'
})
export class CarsSpecificationsEditorEngineComponent
  implements OnInit, OnChanges, OnDestroy {
  @Input() item: APIItem;
  @Output() changed = new EventEmitter<void>();
  public isAllowedEditEngine = false;
  public engine: APIItem;
  public loading = 0;
  private aclSub: Subscription;

  constructor(
    private acl: ACLService,
    private itemService: ItemService,
    private api: APIService,
    private toastService: ToastsService
  ) {}

  ngOnInit(): void {
    this.aclSub = this.acl
      .isAllowed(Resource.SPECIFICATIONS, Privilege.EDIT_ENGINE)
      .subscribe(allow => (this.isAllowedEditEngine = !!allow));
  }

  ngOnDestroy(): void {
    this.aclSub.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.item) {
      if (this.item.engine_id) {
        this.loading++;
        this.itemService
          .getItem(this.item.engine_id, {
            fields: 'name_html,name_text,engine_id'
          })
          .subscribe(
            engine => {
              this.engine = engine;
              this.loading--;
            },
            response => {
              this.toastService.response(response);
              this.loading--;
            }
          );
      } else {
        this.engine = null;
      }
    }
  }

  private setEngineID(value: string) {
    this.api
      .request<void>('PUT', 'item/' + this.item.id, {body: {
        engine_id: value
      }})
      .subscribe(
        () => this.changed.emit(),
        response => this.toastService.response(response)
      );
  }

  public inheritEngine() {
    this.setEngineID('inherited');
  }

  public cancelInheritance() {
    this.setEngineID('');
  }
}
