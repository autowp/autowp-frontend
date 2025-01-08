import {inject, Injectable} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ItemType} from '@grpc/spec.pb';
import {APIItem, APIPathItem, ItemService} from '@services/item';
import {Observable} from 'rxjs';
import {distinctUntilChanged, map, switchMap} from 'rxjs/operators';

export interface CategoryPipeResult {
  category: APIItem | null;
  current: APIItem;
  path: APIPathItem[];
  pathCatnames: string[];
  pathItems: PathItem[];
}

export interface PathItem {
  item: APIItem;
  loaded: boolean;
  parent_id: number;
  routerLink: string[];
}

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private readonly itemService = inject(ItemService);

  public categoryPipe$(route: ActivatedRoute): Observable<CategoryPipeResult> {
    const categoryPipe$ = route.paramMap.pipe(
      map((params) => params.get('category') ?? ''),
      distinctUntilChanged(),
    );

    const pathPipe$ = route.paramMap.pipe(
      map((params) => params.get('path') ?? ''),
      distinctUntilChanged(),
    );

    return categoryPipe$.pipe(
      switchMap((category) =>
        pathPipe$.pipe(
          map((path) => ({
            category,
            path,
          })),
        ),
      ),
      switchMap((params) =>
        this.itemService.getPath$({
          catname: params.category,
          path: params.path,
        }),
      ),
      map((response) => {
        let category: APIItem | null = null;
        for (const item of response.path) {
          if (item.item.item_type_id !== ItemType.ITEM_TYPE_CATEGORY) {
            break;
          }
          category = item.item;
        }

        let catname = '';
        const pathCatnames: string[] = [];
        const pathItems: PathItem[] = [];
        for (const item of response.path) {
          if (item.item.item_type_id === ItemType.ITEM_TYPE_CATEGORY) {
            catname = item.item.catname;
          }
          if (item.item.item_type_id !== ItemType.ITEM_TYPE_CATEGORY) {
            pathCatnames.push(item.catname);
          }
          pathItems.push({
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
      }),
    );
  }
}
