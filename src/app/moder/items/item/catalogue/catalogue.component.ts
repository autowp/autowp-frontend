import {AsyncPipe} from '@angular/common';
import {Component, inject, Input} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterLink} from '@angular/router';
import {ItemType} from '@grpc/spec.pb';
import {
  NgbDropdown,
  NgbDropdownMenu,
  NgbDropdownToggle,
  NgbTypeahead,
  NgbTypeaheadSelectItemEvent,
} from '@ng-bootstrap/ng-bootstrap';
import {ACLService, Privilege, Resource} from '@services/acl.service';
import {APIService} from '@services/api.service';
import {APIItem, ItemService} from '@services/item';
import {APIItemParent, ItemParentService} from '@services/item-parent';
import {BehaviorSubject, combineLatest, EMPTY, Observable, of} from 'rxjs';
import {debounceTime, distinctUntilChanged, map, shareReplay, switchMap} from 'rxjs/operators';

@Component({
  imports: [RouterLink, FormsModule, NgbTypeahead, NgbDropdown, NgbDropdownToggle, NgbDropdownMenu, AsyncPipe],
  selector: 'app-moder-items-item-catalogue',
  standalone: true,
  templateUrl: './catalogue.component.html',
})
export class ModerItemsItemCatalogueComponent {
  private readonly acl = inject(ACLService);
  private readonly api = inject(APIService);
  private readonly itemService = inject(ItemService);
  private readonly itemParentService = inject(ItemParentService);

  @Input() set item(item: APIItem) {
    this.item$.next(item);
  }
  protected readonly item$ = new BehaviorSubject<APIItem | null>(null);

  protected readonly ItemType: typeof ItemType = ItemType;

  protected readonly reloadChilds$ = new BehaviorSubject<void>(void 0);
  protected readonly reloadParents$ = new BehaviorSubject<void>(void 0);
  protected readonly reloadSuggestions$ = new BehaviorSubject<void>(void 0);

  protected itemQuery = '';

  protected readonly canMove$ = this.acl.isAllowed$(Resource.CAR, Privilege.MOVE).pipe(shareReplay(1));

  protected readonly organizeTypeId$ = this.item$.pipe(
    switchMap((item) => (item ? of(item) : EMPTY)),
    map((item) => (item.item_type_id === ItemType.ITEM_TYPE_BRAND ? ItemType.ITEM_TYPE_VEHICLE : item.item_type_id)),
  );

  protected readonly canHaveParentBrand$ = this.item$.pipe(
    switchMap((item) => (item ? of(item) : EMPTY)),
    map((item) => [ItemType.ITEM_TYPE_ENGINE, ItemType.ITEM_TYPE_VEHICLE].includes(item.item_type_id)),
  );

  protected readonly canHaveParents$ = this.item$.pipe(
    switchMap((item) => (item ? of(item) : EMPTY)),
    map((item) => ![ItemType.ITEM_TYPE_FACTORY, ItemType.ITEM_TYPE_TWINS].includes(item.item_type_id)),
  );

  protected readonly itemsDataSource: (text$: Observable<string>) => Observable<APIItem[]> = (
    text$: Observable<string>,
  ) =>
    this.item$.pipe(
      switchMap((item) => (item ? of(item) : EMPTY)),
      switchMap((item) =>
        text$.pipe(
          debounceTime(50),
          map((text) => text.trim()),
          distinctUntilChanged(),
          switchMap((query) => {
            if (query === '') {
              return of([]);
            }

            return this.itemService
              .getItems$({
                autocomplete: query,
                exclude_self_and_childs: item.id,
                fields: 'name_html,name_text,brandicon',
                is_group: true,
                limit: 10,
                parent_types_of: item.item_type_id,
              })
              .pipe(map((response) => response.items));
          }),
        ),
      ),
    );

  protected readonly childs$: Observable<APIItemParent[]> = combineLatest([
    this.item$.pipe(switchMap((item) => (item ? of(item) : EMPTY))),
    this.reloadChilds$,
  ]).pipe(
    switchMap(([item]) =>
      this.itemParentService.getItems$({
        fields: 'name,duplicate_child.name_html,item.name_html,item.name,item.public_routes',
        limit: 500,
        order: 'type_auto',
        parent_id: item.id,
      }),
    ),
    map((response) => response.items),
  );

  protected readonly parents$: Observable<APIItemParent[]> = combineLatest([
    this.item$.pipe(switchMap((item) => (item ? of(item) : EMPTY))),
    this.reloadParents$,
  ]).pipe(
    switchMap(([item]) =>
      this.itemParentService.getItems$({
        fields: 'name,duplicate_parent.name_html,parent.name_html,parent.name,parent.public_routes',
        item_id: item.id,
        limit: 500,
      }),
    ),
    map((response) => response.items),
  );

  protected readonly suggestions$: Observable<APIItem[]> = combineLatest([
    this.item$.pipe(switchMap((item) => (item ? of(item) : EMPTY))),
    this.reloadSuggestions$,
  ]).pipe(
    switchMap(([item]) =>
      this.itemService.getItems$({
        fields: 'name_text',
        limit: 3,
        suggestions_to: item.id,
      }),
    ),
    map((response) => response.items),
  );

  protected itemFormatter(x: APIItem) {
    return x.name_text;
  }

  protected itemOnSelect(item: APIItem, e: NgbTypeaheadSelectItemEvent): void {
    e.preventDefault();
    this.addParent(item, e.item.id);
    this.itemQuery = '';
  }

  protected addParent(item: APIItem, parentId: number) {
    this.api
      .request<void>('POST', 'item-parent', {
        body: {
          item_id: item.id,
          parent_id: parentId,
        },
      })
      .subscribe(() => {
        this.reloadParents$.next();
        this.reloadSuggestions$.next();
      });

    return false;
  }

  private deleteItemParent(itemID: number, parentID: number) {
    this.api.request<void>('DELETE', 'item-parent/' + itemID + '/' + parentID).subscribe(() => {
      this.reloadChilds$.next();
      this.reloadParents$.next();
      this.reloadSuggestions$.next();
    });
  }

  protected deleteChild(item: APIItem, itemId: number) {
    this.deleteItemParent(itemId, item.id);
  }

  protected deleteParent(item: APIItem, parentId: number) {
    this.deleteItemParent(item.id, parentId);
  }
}
