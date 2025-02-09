import {AsyncPipe} from '@angular/common';
import {Component, inject, Input} from '@angular/core';
import {RouterLink} from '@angular/router';
import {APIItem, ItemType, Picture} from '@grpc/spec.pb';
import {ACLService, Privilege, Resource} from '@services/acl.service';
import {APIImage} from '@services/api.service';
import {ItemHeaderComponent} from '@utils/item-header/item-header.component';
import {MarkdownComponent} from '@utils/markdown/markdown.component';
import {BehaviorSubject, combineLatest, EMPTY, Observable, of} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';

interface PictureThumbRoute {
  picture: null | Picture;
  route: null | string[];
  thumb: APIImage | undefined;
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
          ].indexOf(item.itemTypeId) !== -1
        : false,
    ),
  );

  protected readonly pictures$: Observable<PictureThumbRoute[]> = combineLatest([
    this.item$.pipe(switchMap((item) => (item ? of(item) : EMPTY))),
    this.parentRouterLink$,
  ]).pipe(
    map(([item, parentRouterLink]) => {
      const largeFormat = !!item.previewPictures?.largeFormat;
      return (item.previewPictures?.pictures || []).map((picture, idx) => {
        let thumb = undefined;
        if (picture) {
          thumb = largeFormat && idx == 0 ? picture.picture?.thumbLarge : picture.picture?.thumbMedium;
        }
        return {
          picture: picture?.picture ? picture.picture : null,
          route:
            picture?.picture && parentRouterLink
              ? parentRouterLink.concat(['pictures', picture.picture.identity])
              : null,
          thumb,
        };
      });
    }),
  );

  protected isHavePhoto(item: APIItem) {
    if (item.previewPictures) {
      for (const picture of item.previewPictures?.pictures || []) {
        if (picture?.picture) {
          return true;
        }
      }
    }
    return false;
  }

  protected readonly ItemType = ItemType;
}
