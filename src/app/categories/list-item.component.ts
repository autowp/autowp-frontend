import {Component, Input} from '@angular/core';
import {ItemType} from '@grpc/spec.pb';
import {ACLService, Privilege, Resource} from '@services/acl.service';
import {APIImage} from '@services/api.service';
import {APIItem} from '@services/item';
import {APIPicture} from '@services/picture';
import {BehaviorSubject, Observable, combineLatest} from 'rxjs';
import {map} from 'rxjs/operators';

interface PictureThumbRoute {
  picture: APIPicture | null;
  route: null | string[];
  thumb: APIImage | null;
}

@Component({
  selector: 'app-categories-list-item',
  templateUrl: './list-item.component.html',
})
export class CategoriesListItemComponent {
  @Input() set item(item: APIItem) {
    this.item$.next(item);
  }
  protected readonly item$ = new BehaviorSubject<APIItem>(null);

  @Input() set parentRouterLink(parentRouterLink: string[]) {
    this.parentRouterLink$.next(parentRouterLink);
  }
  protected readonly parentRouterLink$ = new BehaviorSubject<string[]>(null);

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
        : false
    )
  );

  protected readonly pictures$: Observable<PictureThumbRoute[]> = combineLatest([
    this.item$,
    this.parentRouterLink$,
  ]).pipe(
    map(([item, parentRouterLink]) =>
      item.preview_pictures.pictures.map((pic) => ({
        picture: pic ? pic.picture : null,
        route:
          pic && pic.picture && parentRouterLink ? parentRouterLink.concat(['pictures', pic.picture.identity]) : null,
        thumb: pic ? pic.thumb : null,
      }))
    )
  );

  constructor(private readonly acl: ACLService) {}

  protected isHavePhoto(item: APIItem) {
    if (item.preview_pictures) {
      for (const picture of item.preview_pictures.pictures) {
        if (picture && picture.picture) {
          return true;
        }
      }
    }
    return false;
  }

  protected readonly ItemType = ItemType;
}
