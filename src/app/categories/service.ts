import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, map, distinctUntilChanged, switchMapTo } from 'rxjs/operators';
import { APIItem, ItemService } from '../services/item';
import { PathItem } from './definitions';

@Injectable()
export class CatagoriesService {
  constructor(
    private itemService: ItemService
  ) {}

  public categoryPipe(route: ActivatedRoute) {

    const categoryPipe = route.paramMap.pipe(
      map(params => params.get('category')),
      distinctUntilChanged()
    );

    const pathPipe = route.paramMap.pipe(
      map(params => {
        const path = params.get('path');
        return path ? path : '';
      }),
      distinctUntilChanged()
    );

    return categoryPipe.pipe(
      switchMapTo(pathPipe, (category, path) => ({
        category: category,
        path: path
      })),
      switchMap((params) => {
        return this.itemService.getPath({
          catname: params.category,
          path: params.path
        });
      }),
      map((response) => {
        let category: APIItem = null;
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
            parent_id: item.parent_id
          });
        }

        return {
          current: response.path[response.path.length - 1].item,
          category: category,
          path: response.path,
          pathItems: pathItems,
          pathCatnames: pathCatnames
        };
      })
    );
  }
}
