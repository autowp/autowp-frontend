import {Injectable} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {switchMap, map, distinctUntilChanged} from 'rxjs/operators';
import {APIItem, APIPathItem, ItemService} from '../services/item';
import {PathItem} from './definitions';
import {Observable} from 'rxjs';

export interface CategoryPipeResult {
  current: APIItem;
  category: APIItem;
  path: APIPathItem[];
  pathItems: PathItem[];
  pathCatnames: string[];
}

@Injectable()
export class CatagoriesService {
  constructor(private itemService: ItemService) {}

  public categoryPipe(route: ActivatedRoute): Observable<CategoryPipeResult> {
    const categoryPipe = route.paramMap.pipe(
      map((params) => params.get('category')),
      distinctUntilChanged()
    );

    const pathPipe = route.paramMap.pipe(
      map((params) => {
        const path = params.get('path');
        return path ? path : '';
      }),
      distinctUntilChanged()
    );

    return categoryPipe.pipe(
      switchMap((category) =>
        pathPipe.pipe(
          map((path) => ({
            category,
            path,
          }))
        )
      ),
      switchMap((params) => {
        return this.itemService.getPath({
          catname: params.category,
          path: params.path,
        });
      }),
      map((response) => {
        let category: APIItem;
        for (const item of response.path) {
          if (item.item.item_type_id !== 3) {
            break;
          }
          category = item.item;
        }

        let catname = '';
        const pathCatnames: string[] = [];
        const pathItems: PathItem[] = [];
        for (const item of response.path) {
          if (item.item.item_type_id === 3) {
            catname = item.item.catname;
          }
          if (item.item.item_type_id !== 3) {
            pathCatnames.push(item.catname);
          }
          pathItems.push({
            routerLink: ['/category', catname].concat(pathCatnames),
            item: item.item,
            loaded: false,
            childs: [],
            parent_id: item.parent_id,
          });
        }

        return {
          current: response.path[response.path.length - 1].item,
          category,
          path: response.path,
          pathItems,
          pathCatnames,
        };
      })
    );
  }
}
