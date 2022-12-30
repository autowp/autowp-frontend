import {Component, Input} from '@angular/core';
import {APIItem} from '../services/item';
import {ACLService, Privilege, Resource} from '../services/acl.service';
import {APIPicture} from '../services/picture';
import {APIImage} from '../services/api.service';
import {BehaviorSubject, combineLatest, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ItemType} from '../../../generated/spec.pb';

interface PictureThumbRoute {
  picture: APIPicture | null;
  thumb: APIImage | null;
  route: string[] | null;
}

@Component({
  selector: 'app-categories-list-item',
  templateUrl: './list-item.component.html',
})
export class CategoriesListItemComponent {
  @Input() set item(item: APIItem) {
    this.item$.next(item);
  }
  public item$ = new BehaviorSubject<APIItem>(null);

  @Input() set parentRouterLink(parentRouterLink: string[]) {
    this.parentRouterLink$.next(parentRouterLink);
  }
  public parentRouterLink$ = new BehaviorSubject<string[]>(null);

  public isModer$ = this.acl.isAllowed(Resource.GLOBAL, Privilege.MODERATE);
  public havePhoto$ = this.item$.pipe(map((item) => (item ? this.isHavePhoto(item) : false)));
  public canHavePhoto$ = this.item$.pipe(
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

  public pictures$: Observable<PictureThumbRoute[]> = combineLatest([this.item$, this.parentRouterLink$]).pipe(
    map(([item, parentRouterLink]) =>
      item.preview_pictures.pictures.map((pic) => ({
        picture: pic ? pic.picture : null,
        thumb: pic ? pic.thumb : null,
        route:
          pic && pic.picture && parentRouterLink ? parentRouterLink.concat(['pictures', pic.picture.identity]) : null,
      }))
    )
  );

  constructor(private acl: ACLService) {}

  public isHavePhoto(item: APIItem) {
    if (item.preview_pictures) {
      for (const picture of item.preview_pictures.pictures) {
        if (picture && picture.picture) {
          return true;
        }
      }
    }
    return false;
  }
}
