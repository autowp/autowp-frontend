import {inject, Injectable} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {
  APIItem,
  ChildsCount,
  GetItemParentsRequest,
  ItemFields,
  ItemListOptions,
  ItemParent,
  ItemParentFields,
  ItemParentListOptions,
  ItemParentType,
  ItemType,
  ListItemsRequest,
} from '@grpc/spec.pb';
import {ItemsClient} from '@grpc/spec.pbsc';
import {type APIItemChildsCounts, APIPathTreeItemParent} from '@services/item';
import {LanguageService} from '@services/language';
import {APIPicture} from '@services/picture';
import {EMPTY, Observable, of, OperatorFunction} from 'rxjs';
import {debounceTime, distinctUntilChanged, map, switchMap} from 'rxjs/operators';

interface Parent {
  id: string;
  items: ItemParent[];
  path: string[];
}

export interface Breadcrumbs {
  html: string;
  routerLink: string[];
}

type ParentObservableFunc = () => OperatorFunction<null | Parent, null | Parent>;

@Injectable({
  providedIn: 'root',
})
export class CatalogueService {
  private readonly itemsClient = inject(ItemsClient);
  private readonly languageService = inject(LanguageService);

  public static pathToBreadcrumbs(brand: APIItem, path: ItemParent[]): Breadcrumbs[] {
    const result: Breadcrumbs[] = [];
    const routerLink = ['/', brand.catname];
    for (const item of path) {
      routerLink.push(item.catname);
      result.push({
        html: item.item?.nameHtml || '',
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
    itemFields?: ItemFields,
  ): Observable<{brand: APIItem; path: ItemParent[]; type: string} | null> {
    const pathPipeRecursive: ParentObservableFunc = () =>
      switchMap((parent: null | Parent) => {
        if (!parent?.id || parent.path.length <= 0) {
          return of(parent);
        }

        if (!itemFields) {
          itemFields = new ItemFields();
        }
        itemFields.nameHtml = true;
        const isLast = parent.path.length <= 1;
        if (isLast) {
          itemFields.inboxPicturesCount = true;
          itemFields.commentsAttentionsCount = true;
          itemFields.otherNames = true;
          itemFields.design = true;
          itemFields.nameDefault = true;
          itemFields.description = true;
          itemFields.fullText = true;
          itemFields.specsRoute = true;
          itemFields.childsCounts = true;
          itemFields.nameText = true;
          itemFields.acceptedPicturesCount = true;
        }

        const totalFields = new ItemParentFields({
          item: itemFields,
        });

        return this.itemsClient
          .getItemParents(
            new GetItemParentsRequest({
              language: this.languageService.language,
              options: new ItemParentListOptions({
                catname: parent.path[0],
                parentId: parent.id,
              }),
              limit: 1,
              fields: totalFields,
            }),
          )
          .pipe(
            map((response): null | Parent => {
              const items = response.items || [];
              if (items.length <= 0) {
                return null;
              }
              const parentItem = items[0];

              return {
                id: parentItem.itemId,
                items: parent.items.concat([parentItem]),
                path: parent.path.splice(1),
              };
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
                id: brand.id,
                items: [],
                path: data ? data.split('/') : [],
              }) as Parent,
          ),
          pathPipeRecursive(),
          switchMap((parent) => {
            if (!parent) {
              return of(null);
            }

            return this.getType$(route).pipe(
              map((type) => ({
                brand,
                path: parent.items,
                type,
              })),
            );
          }),
        );
      }),
    );
  }

  private getType$(route: ActivatedRoute): Observable<string> {
    return route.paramMap.pipe(
      map((paramMap) => paramMap.get('type') ?? 'default'),
      distinctUntilChanged(),
      debounceTime(10),
    );
  }

  private getBrand$(route: ActivatedRoute): Observable<APIItem | null> {
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
              fields: new ItemFields({
                nameHtml: true,
                nameText: true,
              }),
              language: this.languageService.language,
              limit: 1,
              options: new ItemListOptions({
                catname,
              }),
            }),
          )
          .pipe(map((response) => (response.items?.length ? response.items[0] : null)));
      }),
    );
  }

  private pictureRouterLinkItem(parent: APIPathTreeItemParent): null | string[] {
    switch (parent.item.item_type_id) {
      case ItemType.ITEM_TYPE_BRAND:
        return ['/', parent.item.catname, parent.catname];
      case ItemType.ITEM_TYPE_ENGINE:
      case ItemType.ITEM_TYPE_VEHICLE:
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

  // eslint-disable-next-line sonarjs/cognitive-complexity
  public picturePathToRoute(picture: APIPicture): null | string[] {
    for (const pictureItem of picture.path) {
      if (pictureItem.type === 1) {
        switch (pictureItem.item.item_type_id) {
          case ItemType.ITEM_TYPE_BRAND:
            switch (pictureItem.perspective_id) {
              case 22: // logo
                return ['/', pictureItem.item.catname, 'logotypes', picture.identity];
              case 25: // mixed
                return ['/', pictureItem.item.catname, 'mixed', picture.identity];
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

export const convertChildsCounts = (value: ChildsCount[]): APIItemChildsCounts => {
  const result = {
    sport: 0,
    stock: 0,
    tuning: 0,
  };
  value.forEach((v) => {
    switch (v.type) {
      case ItemParentType.ITEM_TYPE_TUNING:
        result.tuning = v.count;
        break;
      case ItemParentType.ITEM_TYPE_SPORT:
        result.sport = v.count;
        break;
      case ItemParentType.ITEM_TYPE_DEFAULT:
        result.stock = v.count;
        break;
    }
  });

  return result;
};
