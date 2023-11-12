import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ItemFields, ItemRequest} from '@grpc/spec.pb';
import {ItemsClient} from '@grpc/spec.pbsc';
import {APIItemParent} from '@services/item-parent';
import {LanguageService} from '@services/language';
import {BehaviorSubject} from 'rxjs';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-moder-items-item-select-parent-tree',
  templateUrl: './tree.component.html',
})
export class ModerItemsItemSelectParentTreeComponent {
  @Input() set itemParent(value: APIItemParent) {
    this.itemParent$.next(value);
  }
  protected readonly itemParent$ = new BehaviorSubject<APIItemParent>(null);

  @Input() order: string;
  @Input() disableItemID: string;
  @Output() selected = new EventEmitter<string>();

  protected readonly item$ = this.itemParent$.pipe(
    switchMap((item) =>
      this.itemsClient.item(
        new ItemRequest({
          fields: new ItemFields({childsCount: true, nameHtml: true}),
          id: '' + item.item_id,
          language: this.languageService.language,
        }),
      ),
    ),
  );

  constructor(
    private readonly itemsClient: ItemsClient,
    private readonly languageService: LanguageService,
  ) {}

  protected onSelect(itemID: string) {
    this.selected.emit(itemID);
    return false;
  }
}
