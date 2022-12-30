import {Component, Input} from '@angular/core';
import {APIItem, ItemService} from '../../../../services/item';
import {debounceTime, distinctUntilChanged, map, shareReplay, switchMap} from 'rxjs/operators';
import {BehaviorSubject, combineLatest, Observable, of} from 'rxjs';
import {NgbTypeaheadSelectItemEvent} from '@ng-bootstrap/ng-bootstrap';
import {ACLService, Privilege, Resource} from '../../../../services/acl.service';
import {APIItemParent, ItemParentService} from '../../../../services/item-parent';
import {APIService} from '../../../../services/api.service';
import {ItemType} from '../../../../../../generated/spec.pb';

@Component({
  selector: 'app-moder-items-item-catalogue',
  templateUrl: './catalogue.component.html',
})
export class ModerItemsItemCatalogueComponent {
  @Input() set item(item: APIItem) {
    this.item$.next(item);
  }
  public item$ = new BehaviorSubject<APIItem>(null);

  public reloadChilds$ = new BehaviorSubject<boolean>(false);
  public reloadParents$ = new BehaviorSubject<boolean>(false);
  public reloadSuggestions$ = new BehaviorSubject<boolean>(false);

  public itemQuery = '';

  public canMove$ = this.acl.isAllowed(Resource.CAR, Privilege.MOVE).pipe(shareReplay(1));

  public organizeTypeId$ = this.item$.pipe(
    map((item) => (item.item_type_id === ItemType.ITEM_TYPE_BRAND ? ItemType.ITEM_TYPE_VEHICLE : item.item_type_id))
  );

  public canHaveParentBrand$ = this.item$.pipe(
    map((item) => [ItemType.ITEM_TYPE_VEHICLE, ItemType.ITEM_TYPE_ENGINE].includes(item.item_type_id))
  );

  public canHaveParents$ = this.item$.pipe(
    map((item) => ![ItemType.ITEM_TYPE_TWINS, ItemType.ITEM_TYPE_FACTORY].includes(item.item_type_id))
  );

  public itemsDataSource: (text$: Observable<string>) => Observable<APIItem[]> = (text$: Observable<string>) =>
    this.item$.pipe(
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
              .getItems({
                autocomplete: query,
                exclude_self_and_childs: item.id,
                is_group: true,
                parent_types_of: item.item_type_id,
                fields: 'name_html,name_text,brandicon',
                limit: 15,
              })
              .pipe(map((response) => response.items));
          })
        )
      )
    );

  public childs$: Observable<APIItemParent[]> = combineLatest([this.item$, this.reloadChilds$]).pipe(
    switchMap(([item]) =>
      this.itemParentService.getItems({
        parent_id: item.id,
        limit: 500,
        fields: 'name,duplicate_child.name_html,item.name_html,item.name,item.public_routes',
        order: 'type_auto',
      })
    ),
    map((response) => response.items)
  );

  public parents$: Observable<APIItemParent[]> = combineLatest([this.item$, this.reloadParents$]).pipe(
    switchMap(([item]) =>
      this.itemParentService.getItems({
        item_id: item.id,
        limit: 500,
        fields: 'name,duplicate_parent.name_html,parent.name_html,parent.name,parent.public_routes',
      })
    ),
    map((response) => response.items)
  );

  public suggestions$: Observable<APIItem[]> = combineLatest([this.item$, this.reloadSuggestions$]).pipe(
    switchMap(([item]) =>
      this.itemService.getItems({
        suggestions_to: item.id,
        limit: 3,
        fields: 'name_text',
      })
    ),
    map((response) => response.items)
  );

  constructor(
    private acl: ACLService,
    private api: APIService,
    private itemService: ItemService,
    private itemParentService: ItemParentService
  ) {}

  public itemFormatter(x: APIItem) {
    return x.name_text;
  }

  public itemOnSelect(item: APIItem, e: NgbTypeaheadSelectItemEvent): void {
    e.preventDefault();
    this.addParent(item, e.item.id);
    this.itemQuery = '';
  }

  public addParent(item: APIItem, parentId: number) {
    this.api
      .request<void>('POST', 'item-parent', {
        body: {
          item_id: item.id,
          parent_id: parentId,
        },
      })
      .subscribe(() => {
        this.reloadParents$.next(true);
        this.reloadSuggestions$.next(true);
      });

    return false;
  }
  private deleteItemParent(itemID: number, parentID: number) {
    this.api.request<void>('DELETE', 'item-parent/' + itemID + '/' + parentID).subscribe(() => {
      this.reloadChilds$.next(true);
      this.reloadParents$.next(true);
      this.reloadSuggestions$.next(true);
    });
  }

  public deleteChild(item: APIItem, itemId: number) {
    this.deleteItemParent(itemId, item.id);
  }

  public deleteParent(item: APIItem, parentId: number) {
    this.deleteItemParent(item.id, parentId);
  }
}
