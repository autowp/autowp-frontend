import {AsyncPipe} from '@angular/common';
import {Component, inject, Input} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterLink} from '@angular/router';
import {
  DeleteItemParentRequest,
  ItemFields,
  ItemListOptions,
  ItemParent,
  ItemType,
  ListItemsRequest,
  APIItem as GRPCAPIItem,
} from '@grpc/spec.pb';
import {
  NgbDropdown,
  NgbDropdownMenu,
  NgbDropdownToggle,
  NgbTypeahead,
  NgbTypeaheadSelectItemEvent,
} from '@ng-bootstrap/ng-bootstrap';
import {ACLService, Privilege, Resource} from '@services/acl.service';
import type {APIItem} from '@services/item';
import {APIItemParent, ItemParentService} from '@services/item-parent';
import {BehaviorSubject, combineLatest, EMPTY, Observable, of} from 'rxjs';
import {debounceTime, distinctUntilChanged, map, shareReplay, switchMap} from 'rxjs/operators';
import {ItemsClient} from '@grpc/spec.pbsc';
import {LanguageService} from '@services/language';

@Component({
  imports: [RouterLink, FormsModule, NgbTypeahead, NgbDropdown, NgbDropdownToggle, NgbDropdownMenu, AsyncPipe],
  selector: 'app-moder-items-item-catalogue',
  templateUrl: './catalogue.component.html',
})
export class ModerItemsItemCatalogueComponent {
  private readonly acl = inject(ACLService);
  private readonly itemParentService = inject(ItemParentService);
  private readonly itemsClient = inject(ItemsClient);
  private readonly languageService = inject(LanguageService);

  @Input() set item(item: APIItem) {
    this.item$.next(item);
  }
  protected readonly item$ = new BehaviorSubject<APIItem | null>(null);

  protected readonly ItemType: typeof ItemType = ItemType;

  protected readonly reloadChilds$ = new BehaviorSubject<void>(void 0);
  protected readonly reloadParents$ = new BehaviorSubject<void>(void 0);
  protected readonly reloadSuggestions$ = new BehaviorSubject<void>(void 0);

  protected itemQuery = '';

  protected readonly canMove$ = this.acl
    .isAllowed$(Resource.CAR, Privilege.MOVE)
    .pipe(shareReplay({bufferSize: 1, refCount: false}));

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

  protected readonly itemsDataSource: (text$: Observable<string>) => Observable<GRPCAPIItem[]> = (
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

            return this.itemsClient
              .list(
                new ListItemsRequest({
                  language: this.languageService.language,
                  fields: new ItemFields({nameText: true, nameHtml: true}),
                  options: new ItemListOptions({
                    parentTypesOf: item.item_type_id,
                    isGroup: true,
                    excludeSelfAndChilds: '' + item.id,
                    autocomplete: query,
                  }),
                  limit: 10,
                }),
              )
              .pipe(map((response) => response.items || []));
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

  protected readonly suggestions$: Observable<GRPCAPIItem[]> = combineLatest([
    this.item$.pipe(switchMap((item) => (item ? of(item) : EMPTY))),
    this.reloadSuggestions$,
  ]).pipe(
    switchMap(([item]) =>
      this.itemsClient.list(
        new ListItemsRequest({
          fields: new ItemFields({nameText: true}),
          language: this.languageService.language,
          limit: 3,
          options: new ItemListOptions({
            suggestionsTo: '' + item.id,
          }),
        }),
      ),
    ),
    map((response) => response.items || []),
  );

  protected itemFormatter(x: APIItem) {
    return x.name_text;
  }

  protected itemOnSelect(item: APIItem, e: NgbTypeaheadSelectItemEvent): void {
    e.preventDefault();
    this.addParent(item, '' + e.item.id);
    this.itemQuery = '';
  }

  protected addParent(item: APIItem, parentId: string) {
    this.itemsClient
      .createItemParent(
        new ItemParent({
          itemId: '' + item.id,
          parentId: parentId,
        }),
      )
      .subscribe(() => {
        this.reloadParents$.next();
        this.reloadSuggestions$.next();
      });

    return false;
  }

  private deleteItemParent(itemID: number, parentID: number) {
    this.itemsClient
      .deleteItemParent(
        new DeleteItemParentRequest({
          itemId: '' + itemID,
          parentId: '' + parentID,
        }),
      )
      .subscribe(() => {
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
