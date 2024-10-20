import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {ItemFields, ItemRequest} from '@grpc/spec.pb';
import {ItemsClient} from '@grpc/spec.pbsc';
import {APIItemParent} from '@services/item-parent';
import {LanguageService} from '@services/language';
import {BehaviorSubject, EMPTY} from 'rxjs';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-moder-items-item-select-parent-tree',
  templateUrl: './tree.component.html',
})
export class ModerItemsItemSelectParentTreeComponent {
  private readonly itemsClient = inject(ItemsClient);
  private readonly languageService = inject(LanguageService);

  @Input() set itemParent(value: APIItemParent) {
    this.itemParent$.next(value);
  }
  protected readonly itemParent$ = new BehaviorSubject<APIItemParent | null>(null);

  @Input() order?: string;
  @Input() disableItemID?: string;
  @Output() selected = new EventEmitter<string>();

  protected readonly item$ = this.itemParent$.pipe(
    switchMap((item) =>
      item
        ? this.itemsClient.item(
            new ItemRequest({
              fields: new ItemFields({childsCount: true, nameHtml: true}),
              id: '' + item.item_id,
              language: this.languageService.language,
            }),
          )
        : EMPTY,
    ),
  );

  protected onSelect(itemID: string) {
    this.selected.emit(itemID);
    return false;
  }
}
