import type {APIItem} from '@services/item';

import {AsyncPipe} from '@angular/common';
import {Component, inject, Input} from '@angular/core';
import {RouterLink} from '@angular/router';
import {ItemType} from '@grpc/spec.pb';
import {ACLService, Privilege, Resource} from '@services/acl.service';
import {APIImage} from '@services/api.service';
import {APIPicture} from '@services/picture';
import {ItemHeaderComponent} from '@utils/item-header/item-header.component';
import {MarkdownComponent} from '@utils/markdown/markdown.component';
import {BehaviorSubject, combineLatest, EMPTY, Observable, of} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';

interface PictureThumbRoute {
  picture: APIPicture | null;
  route: null | string[];
  thumb: APIImage | null;
}

@Component({
  imports: [ItemHeaderComponent, RouterLink, MarkdownComponent, AsyncPipe],
  selector: 'app-categories-list-item',
  templateUrl: './list-item.component.html',
})
export class CategoriesListItemComponent {
  private readonly acl = inject(ACLService);

  @Input() set item(item: APIItem) {
    this.item$.next(item);
  }
  protected readonly item$ = new BehaviorSubject<APIItem | null>(null);

  @Input() set parentRouterLink(parentRouterLink: string[]) {
    this.parentRouterLink$.next(parentRouterLink);
  }
  protected readonly parentRouterLink$ = new BehaviorSubject<null | string[]>(null);

  protected readonly isModer$ = this.acl.isAllowed$(Resource.GLOBAL, Privilege.MODERATE);
  protected readonly havePhoto$ = this.item$.pipe(map((item) => (item ? this.isHavePhoto(item) : false)));
  protected readonly canHavePhoto$ = this.item$.pipe(
    map((item) =>
      item
        ? [
            ItemType.ITEM_TYPE_VEHICLE,
            ItemType.ITEM_TYPE_ENGINE,
            ItemType.ITEM_TYPE_BRAND,
            ItemType.ITEM_TYPE_FACTORY,
            ItemType.ITEM_TYPE_MUSEUM,
          ].indexOf(item.item_type_id) !== -1
        : false,
    ),
  );

  protected readonly pictures$: Observable<PictureThumbRoute[]> = combineLatest([
    this.item$.pipe(switchMap((item) => (item ? of(item) : EMPTY))),
    this.parentRouterLink$,
  ]).pipe(
    map(([item, parentRouterLink]) =>
      item.preview_pictures.pictures.map((pic) => ({
        picture: pic?.picture ? pic.picture : null,
        route: pic?.picture && parentRouterLink ? parentRouterLink.concat(['pictures', pic.picture.identity]) : null,
        thumb: pic?.thumb ? pic.thumb : null,
      })),
    ),
  );

  protected isHavePhoto(item: APIItem) {
    if (item.preview_pictures) {
      for (const picture of item.preview_pictures.pictures) {
        if (picture?.picture) {
          return true;
        }
      }
    }
    return false;
  }

  protected readonly ItemType = ItemType;
}
