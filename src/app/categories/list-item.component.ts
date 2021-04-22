import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import { APIItem } from '../services/item';
import {ACLService, Privilege, Resource} from '../services/acl.service';
import {APIPicture} from '../services/picture';
import {APIImage} from '../services/api.service';
import {Subscription} from 'rxjs';

interface PictureThumbRoute {
  picture: APIPicture|null;
  thumb: APIImage|null;
  route: string[]|null;
}

@Component({
  selector: 'app-categories-list-item',
  templateUrl: './list-item.component.html'
})
export class CategoriesListItemComponent implements OnChanges, OnInit, OnDestroy {
  @Input() item: APIItem;
  @Input() parentRouterLink: string[];

  public isModer = false;
  public havePhoto = false;
  public canHavePhoto = false;
  public pictures: PictureThumbRoute[] = [];
  private sub: Subscription;

  constructor(private acl: ACLService) { }

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

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.item) {
      this.havePhoto = this.item ? this.isHavePhoto(this.item) : false;
      this.canHavePhoto = [1, 2, 5, 6, 7].indexOf(this.item.item_type_id) !== -1;
    }

    if (changes.pictures || changes.parentRouterLink) {
      this.pictures = this.item.preview_pictures.pictures.map(pic => ({
        picture: pic ? pic.picture : null,
        thumb: pic ? pic.thumb : null,
        route: pic && pic.picture && this.parentRouterLink ? this.parentRouterLink.concat(['pictures', pic.picture.identity]) : null
      }));
    }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit(): void {
    this.sub = this.acl
      .isAllowed(Resource.GLOBAL, Privilege.MODERATE)
      .subscribe(isModer => (this.isModer = isModer));
  }
}
