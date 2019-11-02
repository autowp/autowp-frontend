import {Injectable} from '@angular/core';
import {debounceTime, distinctUntilChanged, map, switchMap} from 'rxjs/operators';
import {EMPTY, of, OperatorFunction} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {APIItemParent, ItemParentService} from '../services/item-parent';
import {APIItem, ItemService} from '../services/item';

interface Parent {
  id: number;
  path: string[];
  items: APIItemParent[];
}

export interface Breadcrumbs {
  routerLink: string[];
  html: string;
}

type ParentObservableFunc = () => OperatorFunction<Parent, Parent>;

@Injectable()
export class CatalogueService {


  constructor(
    private itemService: ItemService,
    private itemParentService: ItemParentService
  ) { }

  public static pathToBreadcrumbs(brand: APIItem, path: APIItemParent[]): Breadcrumbs[] {
    const result: Breadcrumbs[] = [];
    const routerLink = ['/', brand.catname];
    for (const item of path) {
      routerLink.push(item.catname);
      result.push({
        html: item.item.name_html,
        routerLink: [...routerLink]
      });
    }
    return result;
  }

  private static getPath(route: ActivatedRoute) {
    return route.paramMap.pipe(
      map(params => params.get('path')),
      distinctUntilChanged(),
      debounceTime(10)
    );
  }

  public resolveCatalogue(route: ActivatedRoute, isModer: boolean, fields: string) {

    const pathPipeRecursive: ParentObservableFunc = () =>  switchMap((parent: Parent) => {

      if (! parent.id || parent.path.length <= 0) {
        return of(parent);
      }

      let totalFields = 'item.name_html,' + fields;
      const isLast = parent.path.length <= 1;
      if (isModer && isLast) {
        totalFields += ',item.inbox_pictures_count,item.comments_attentions_count,item.is_group,item.other_names,item.design,' +
          'item.name_default,item.description,item.produced,item.specs_url,item.childs_counts,item.accepted_pictures_count';
      }

      return this.itemParentService.getItems({
        parent_id: parent.id,
        catname: parent.path[0],
        limit: 1,
        fields: totalFields
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
      )),
      switchMap(params => {
        return this.getType(route).pipe(
          map(type => ({
            brand: params.brand,
            path: params.path,
            type: type
          }))
        );
      })
    );
  }

  private getType(route: ActivatedRoute) {
    return route.paramMap.pipe(
      map(paramMap => paramMap.get('type')),
      distinctUntilChanged(),
      debounceTime(10)
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
