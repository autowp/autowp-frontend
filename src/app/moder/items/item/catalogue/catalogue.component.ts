import {AsyncPipe} from '@angular/common';
import {ChangeDetectionStrategy, Component, inject, input} from '@angular/core';
import {toObservable} from '@angular/core/rxjs-interop';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterLink} from '@angular/router';
import {
  APIItem,
  DeleteItemParentRequest,
  ItemFields,
  ItemListOptions,
  ItemParent,
  ItemParentFields,
  ItemParentListOptions,
  ItemParentsRequest,
  ItemParentType,
  ItemsRequest,
  ItemType,
} from '@grpc/spec.pb';
import {ItemsClient} from '@grpc/spec.pbsc';
import {
  NgbDropdown,
  NgbDropdownMenu,
  NgbDropdownToggle,
  NgbTypeahead,
  NgbTypeaheadSelectItemEvent,
} from '@ng-bootstrap/ng-bootstrap';
import {AuthService, Role} from '@services/auth.service';
import {LanguageService} from '@services/language';
import {BehaviorSubject, combineLatest, EMPTY, Observable, of} from 'rxjs';
import {debounceTime, distinctUntilChanged, map, shareReplay, switchMap} from 'rxjs/operators';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    FormsModule,
    NgbTypeahead,
    NgbDropdown,
    NgbDropdownToggle,
    NgbDropdownMenu,
    AsyncPipe,
    ReactiveFormsModule,
  ],
  selector: 'app-moder-items-item-catalogue',
  templateUrl: './catalogue.component.html',
})
export class ModerItemsItemCatalogueComponent {
  readonly #auth = inject(AuthService);
  readonly #itemsClient = inject(ItemsClient);
  readonly #languageService = inject(LanguageService);

  readonly item = input.required<APIItem>();
  protected readonly item$ = toObservable(this.item);

  protected readonly ItemType: typeof ItemType = ItemType;

  protected readonly reloadChilds$ = new BehaviorSubject<void>(void 0);
  protected readonly reloadParents$ = new BehaviorSubject<void>(void 0);
  protected readonly reloadSuggestions$ = new BehaviorSubject<void>(void 0);

  protected readonly itemQuery = new FormControl<string>('', {nonNullable: true});

  protected readonly canMove$ = this.#auth
    .hasRole$(Role.CARS_MODER)
    .pipe(shareReplay({bufferSize: 1, refCount: false}));

  protected readonly organizeTypeId$ = this.item$.pipe(
    switchMap((item) => (item ? of(item) : EMPTY)),
    map((item) => (item.itemTypeId === ItemType.ITEM_TYPE_BRAND ? ItemType.ITEM_TYPE_VEHICLE : item.itemTypeId)),
  );

  protected readonly canHaveParentBrand$ = this.item$.pipe(
    switchMap((item) => (item ? of(item) : EMPTY)),
    map((item) => [ItemType.ITEM_TYPE_ENGINE, ItemType.ITEM_TYPE_VEHICLE].includes(item.itemTypeId)),
  );

  protected readonly canHaveParents$ = this.item$.pipe(
    switchMap((item) => (item ? of(item) : EMPTY)),
    map((item) => ![ItemType.ITEM_TYPE_FACTORY, ItemType.ITEM_TYPE_TWINS].includes(item.itemTypeId)),
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

            return this.#itemsClient
              .list(
                new ItemsRequest({
                  fields: new ItemFields({nameHtml: true, nameText: true}),
                  language: this.#languageService.language,
                  limit: 10,
                  options: new ItemListOptions({
                    autocomplete: query,
                    excludeSelfAndChilds: item.id,
                    isGroup: true,
                    parentTypesOf: item.itemTypeId,
                  }),
                }),
              )
              .pipe(map((response) => response.items || []));
          }),
        ),
      ),
    );

  protected readonly childs$: Observable<ItemParent[]> = combineLatest([
    this.item$.pipe(switchMap((item) => (item ? of(item) : EMPTY))),
    this.reloadChilds$,
  ]).pipe(
    switchMap(([item]) =>
      this.#itemsClient.getItemParents(
        new ItemParentsRequest({
          fields: new ItemParentFields({
            duplicateChild: new ItemFields({nameHtml: true}),
            item: new ItemFields({nameHtml: true, publicRoutes: true}),
          }),
          limit: 10,
          options: new ItemParentListOptions({
            parentId: '' + item.id,
          }),
          order: ItemParentsRequest.Order.AUTO,
        }),
      ),
    ),
    map((response) => response.items || []),
  );

  protected readonly parents$: Observable<ItemParent[]> = combineLatest([
    this.item$.pipe(switchMap((item) => (item ? of(item) : EMPTY))),
    this.reloadParents$,
  ]).pipe(
    switchMap(([item]) =>
      this.#itemsClient.getItemParents(
        new ItemParentsRequest({
          fields: new ItemParentFields({
            duplicateParent: new ItemFields({nameHtml: true}),
            parent: new ItemFields({nameHtml: true, publicRoutes: true}),
          }),
          limit: 10,
          options: new ItemParentListOptions({
            itemId: '' + item.id,
          }),
          order: ItemParentsRequest.Order.AUTO,
        }),
      ),
    ),
    map((response) => response.items || []),
  );

  protected readonly suggestions$: Observable<APIItem[]> = combineLatest([
    this.item$.pipe(switchMap((item) => (item ? of(item) : EMPTY))),
    this.reloadSuggestions$,
  ]).pipe(
    switchMap(([item]) =>
      this.#itemsClient.list(
        new ItemsRequest({
          fields: new ItemFields({nameText: true}),
          language: this.#languageService.language,
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
    return x.nameText;
  }

  protected itemOnSelect(item: APIItem, e: NgbTypeaheadSelectItemEvent): void {
    e.preventDefault();
    this.addParent(item, '' + e.item.id);
    this.itemQuery.setValue('');
  }

  protected addParent(item: APIItem, parentId: string) {
    this.#itemsClient
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

  private deleteItemParent(itemID: string, parentID: string) {
    this.#itemsClient
      .deleteItemParent(
        new DeleteItemParentRequest({
          itemId: itemID,
          parentId: parentID,
        }),
      )
      .subscribe(() => {
        this.reloadChilds$.next();
        this.reloadParents$.next();
        this.reloadSuggestions$.next();
      });
  }

  protected deleteChild(item: APIItem, itemId: string) {
    this.deleteItemParent(itemId, '' + item.id);
  }

  protected deleteParent(item: APIItem, parentId: string) {
    this.deleteItemParent('' + item.id, parentId);
  }

  protected readonly ItemParentType = ItemParentType;
}
