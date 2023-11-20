import {Injectable} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {APIItem, ItemFields, ItemType, ListItemsRequest} from '@grpc/spec.pb';
import {ItemsClient} from '@grpc/spec.pbsc';
import {APIPathTreeItemParent} from '@services/item';
import {APIItemParent, ItemParentService} from '@services/item-parent';
import {LanguageService} from '@services/language';
import {APIPicture} from '@services/picture';
import {EMPTY, Observable, OperatorFunction, of} from 'rxjs';
import {debounceTime, distinctUntilChanged, map, switchMap} from 'rxjs/operators';

interface Parent {
  id: number;
  items: APIItemParent[];
  path: string[];
}

export interface Breadcrumbs {
  html: string;
  routerLink: string[];
}

type ParentObservableFunc = () => OperatorFunction<Parent, Parent>;

@Injectable()
export class CatalogueService {
  constructor(
    private readonly itemParentService: ItemParentService,
    private readonly itemsClient: ItemsClient,
    private readonly languageService: LanguageService,
  ) {}

  public static pathToBreadcrumbs(brand: APIItem, path: APIItemParent[]): Breadcrumbs[] {
    const result: Breadcrumbs[] = [];
    const routerLink = ['/', brand.catname];
    for (const item of path) {
      routerLink.push(item.catname);
      result.push({
        html: item.item.name_html,
        routerLink: [...routerLink],
      });
    }
    return result;
  }

  private static getPath(route: ActivatedRoute) {
    return route.paramMap.pipe(
      map((params) => params.get('path')),
      distinctUntilChanged(),
      debounceTime(10),
    );
  }

  public resolveCatalogue$(
    route: ActivatedRoute,
    fields: string,
  ): Observable<{brand: APIItem; path: APIItemParent[]; type: string}> {
    const pathPipeRecursive: ParentObservableFunc = () =>
      switchMap((parent: Parent) => {
        if (!parent || !parent.id || parent.path.length <= 0) {
          return of(parent);
        }

        let totalFields = 'item.name_html,' + fields;
        const isLast = parent.path.length <= 1;
        if (isLast) {
          totalFields +=
            ',item.inbox_pictures_count,item.comments_attentions_count,item.other_names,item.design,' +
            'item.name_default,item.description,item.text,item.produced,item.specs_route,item.childs_counts,' +
            'item.name_text,item.accepted_pictures_count';
        }

        return this.itemParentService
          .getItems$({
            catname: parent.path[0],
            fields: totalFields,
            limit: 1,
            parent_id: parent.id,
          })
          .pipe(
            map((response) => {
              if (response.items.length <= 0) {
                return null;
              }
              const parentItem = response.items[0];

              const obj: Parent = {
                id: parentItem.item_id,
                items: parent.items.concat([parentItem]),
                path: parent.path.splice(1),
              };

              return obj;
            }),
            pathPipeRecursive(),
          );
      });

    return this.getBrand$(route).pipe(
      switchMap((brand) => {
        if (!brand) {
          return of(null);
        }

        return CatalogueService.getPath(route).pipe(
          map(
            (data) =>
              ({
                id: +brand.id,
                items: [],
                path: data ? data.split('/') : [],
              }) as Parent,
          ),
          pathPipeRecursive(),
          switchMap((parent) => {
            if (!parent) {
              return of(null);
            }
            return of({
              brand,
              path: parent.items,
            }).pipe(
              switchMap((params) => {
                return this.getType$(route).pipe(
                  map((type) => ({
                    brand: params.brand,
                    path: params.path,
                    type,
                  })),
                );
              }),
            );
          }),
        );
      }),
    );
  }

  private getType$(route: ActivatedRoute): Observable<string> {
    return route.paramMap.pipe(
      map((paramMap) => paramMap.get('type')),
      distinctUntilChanged(),
      debounceTime(10),
    );
  }

  private getBrand$(route: ActivatedRoute): Observable<APIItem> {
    return route.paramMap.pipe(
      map((params) => params.get('brand')),
      distinctUntilChanged(),
      debounceTime(10),
      switchMap((catname) => {
        if (!catname) {
          return EMPTY;
        }
        return this.itemsClient
          .list(
            new ListItemsRequest({
              catname,
              fields: new ItemFields({
                nameHtml: true,
                nameText: true,
              }),
              language: this.languageService.language,
              limit: 1,
            }),
          )
          .pipe(map((response) => (response && response.items.length ? response.items[0] : null)));
      }),
    );
  }

  private pictureRouterLinkItem(parent: APIPathTreeItemParent): string[] {
    switch (parent.item.item_type_id) {
      case ItemType.ITEM_TYPE_BRAND:
        return ['/', parent.item.catname, parent.catname];
      case ItemType.ITEM_TYPE_VEHICLE:
      case ItemType.ITEM_TYPE_ENGINE:
        for (const sparent of parent.item.parents) {
          const path = this.pictureRouterLinkItem(sparent);
          if (path) {
            return path.concat([parent.catname]);
          }
        }
        break;
    }
    return null;
  }

  public picturePathToRoute(picture: APIPicture): null | string[] {
    for (const pictureItem of picture.path) {
      if (pictureItem.type === 1) {
        switch (pictureItem.item.item_type_id) {
          case ItemType.ITEM_TYPE_BRAND:
            switch (pictureItem.perspective_id) {
              case 25: // mixed
                return ['/', pictureItem.item.catname, 'mixed', picture.identity];
              case 22: // logo
                return ['/', pictureItem.item.catname, 'logotypes', picture.identity];
              default:
                return ['/', pictureItem.item.catname, 'other', picture.identity];
            }
          case ItemType.ITEM_TYPE_VEHICLE:
          case ItemType.ITEM_TYPE_ENGINE:
            for (const parent of pictureItem.item.parents) {
              const path = this.pictureRouterLinkItem(parent);
              if (path) {
                return path.concat(['pictures', picture.identity]);
              }
            }
            break;
        }
      }
    }

    return null;
  }
}
