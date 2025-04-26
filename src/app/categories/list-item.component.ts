import {AsyncPipe} from '@angular/common';
import {Component, inject, input} from '@angular/core';
import {toObservable} from '@angular/core/rxjs-interop';
import {RouterLink} from '@angular/router';
import {APIImage, APIItem, ItemType, Picture} from '@grpc/spec.pb';
import {AuthService, Role} from '@services/auth.service';
import {ItemHeaderComponent} from '@utils/item-header/item-header.component';
import {MarkdownComponent} from '@utils/markdown/markdown.component';
import {combineLatest, EMPTY, Observable, of} from 'rxjs';
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
  readonly #auth = inject(AuthService);

  readonly item = input.required<APIItem>();
  protected readonly item$ = toObservable(this.item);

  readonly parentRouterLink = input.required<string[]>();
  protected readonly parentRouterLink$ = toObservable(this.parentRouterLink);

  protected readonly isModer$ = this.#auth.hasRole$(Role.MODER);
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
