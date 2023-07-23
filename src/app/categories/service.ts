import {Injectable} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {APIItem, APIPathItem, ItemService} from '@services/item';
import {Observable} from 'rxjs';
import {distinctUntilChanged, map, switchMap} from 'rxjs/operators';

import {PathItem} from './definitions';

export interface CategoryPipeResult {
  category: APIItem;
  current: APIItem;
  path: APIPathItem[];
  pathCatnames: string[];
  pathItems: PathItem[];
}

@Injectable()
export class CategoriesService {
  constructor(private readonly itemService: ItemService) {}

  public categoryPipe$(route: ActivatedRoute): Observable<CategoryPipeResult> {
    const categoryPipe$ = route.paramMap.pipe(
      map((params) => params.get('category')),
      distinctUntilChanged()
    );

    const pathPipe$ = route.paramMap.pipe(
      map((params) => {
        const path = params.get('path');
        return path ? path : '';
      }),
      distinctUntilChanged()
    );

    return categoryPipe$.pipe(
      switchMap((category) =>
        pathPipe$.pipe(
          map((path) => ({
            category,
            path,
          }))
        )
      ),
      switchMap((params) =>
        this.itemService.getPath$({
          catname: params.category,
          path: params.path,
        })
      ),
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
            childs: [],
            item: item.item,
            loaded: false,
            parent_id: item.parent_id,
            routerLink: ['/category', catname].concat(pathCatnames),
          });
        }

        return {
          category,
          current: response.path[response.path.length - 1].item,
          path: response.path,
          pathCatnames,
          pathItems,
        };
      })
    );
  }
}
