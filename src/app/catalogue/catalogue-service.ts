import {Injectable} from '@angular/core';
import {debounceTime, distinctUntilChanged, map, switchMap, tap} from 'rxjs/operators';
import {EMPTY, of, OperatorFunction} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {APIItemParent, ItemParentService} from '../services/item-parent';
import {ItemService} from '../services/item';

interface Parent {
  id: number;
  path: string[];
  items: APIItemParent[];
}

type ParentObservableFunc = () => OperatorFunction<Parent, Parent>;

@Injectable()
export class CatalogueService {


  constructor(
    private itemService: ItemService,
    private itemParentService: ItemParentService
  ) { }

  private static getPath(route: ActivatedRoute) {
    return route.paramMap.pipe(
      map(params => params.get('path')),
      distinctUntilChanged(),
      debounceTime(10),
      tap(path => console.log('path', path))
    );
  }

  public resolveCatalogue(route: ActivatedRoute, isModer: boolean) {

    const pathPipeRecursive: ParentObservableFunc = () =>  switchMap((parent: Parent) => {

      console.log('parent', parent);

      if (! parent.id || parent.path.length <= 0) {
        return of(parent);
      }

      let fields = 'item.name_html';
      const isLast = parent.path.length <= 1;
      if (isModer && isLast) {
        fields += ',item.inbox_pictures_count,item.comments_attentions_count,item.is_group,item.other_names,' +
          'item.name_default,item.description,item.produced,item.specs_url';
      }

      return this.itemParentService.getItems({
        parent_id: parent.id,
        catname: parent.path[0],
        limit: 1,
        fields: fields
      }).pipe(
        map(response => {
          if (response.items.length <= 0) {
            return EMPTY;
          }
          const parentItem = response.items[0];

          const obj: Parent = {
            id: parentItem.item_id,
            path: parent.path.splice(1),
            items: parent.items.concat([parentItem])
          };

          return obj;
        }),
        pathPipeRecursive()
      );
    });

    return this.getBrand(route).pipe(
      switchMap(brand => CatalogueService.getPath(route).pipe(
        map(data => (<Parent>{
          id: brand.id,
          path: data ? data.split('/') : [],
          items: []
        })),
        pathPipeRecursive(),
        map(parent => ({
          brand: brand,
          path: parent.items
        }))
      ))
    );
  }

  private getBrand(route: ActivatedRoute) {
    return route.paramMap.pipe(
      map(params => params.get('brand')),
      distinctUntilChanged(),
      debounceTime(10),
      switchMap(catname => {
        if (!catname) {
          return EMPTY;
        }
        return this.itemService.getItems({
          catname: '' + catname,
          fields: 'catname,name_text,name_html',
          limit: 1
        }).pipe(
          map(response => response && response.items.length ? response.items[0] : null)
        );
      })
    );
  }
}
